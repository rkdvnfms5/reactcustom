var express = require('express');
var router = express.Router();
var multer = require("multer");
var con = require("../mysqlConnect");
var fs = require('fs');

const uploadDir = "/upload/shop/";
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const uploadDirReview = "/upload/review/";
if(!fs.existsSync(uploadDirReview)){
    fs.mkdirSync(uploadDirReview);
}

//multer : multipart form 데이터를 받기위한 미들웨어, 안쓰면 request body가 비어서 온다
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const storage_review = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req);
        console.log(file);
      cb(null, uploadDirReview)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
const upload_review = multer({ storage: storage_review })

//Shop API
router.get('/api/shop', (req, res) => {
    let memberseq = req.query.memberseq;

    let sql = "SELECT *, (SELECT name FROM ShopCategory WHERE seq = categoryseq) as categoryName, "; 
        sql += "(SELECT COUNT(*) FROM ShopThankLog WHERE shopseq = sh.seq) as thanks, ";
        sql += "(SELECT COUNT(*) FROM ShopReview WHERE viewyn='Y' AND shopseq = sh.seq) as reviews ";
    if(memberseq > 0){
        sql += ", getThankYN(seq, " + memberseq + ") as thankyn ";
    }
        sql += "FROM Shop sh WHERE viewyn = 'Y'";

    let state = req.query.state;
    let city = req.query.city;
    let categoryseq = req.query.categoryseq;
    let search = req.query.search;
    let order = req.query.order;
    let limit = req.query.limit;
    let offset = req.query.offset;
    let myyn = req.query.myyn;
    let mythankyn = req.query.mythankyn;

    if(state != null && state != undefined && state != ''){
        sql += " AND address LIKE '%" + state + "%'";
    }
    if(city != null && city != undefined && city != ''){
        sql += " AND address LIKE '%" + state + "%'";
    }
    if(categoryseq != null && categoryseq != undefined && categoryseq != 0){
        sql += " AND categoryseq = " + categoryseq;
    }
    if(search != null && search != undefined && search != ''){
        sql += " AND (title LIKE '%" + search + "%' "
             + "OR content LIKE '%" + search + "%' "
             + "OR tag LIKE '%" + search + "%' "
             + "OR address LIKE '%" + search + "%' "
             + "OR categoryseq IN (SELECT seq FROM ShopCategory WHERE name LIKE '%" + search + "%'))";
    }
    if(myyn == 'Y'){
        sql += " AND memberseq = " + memberseq;
    }
    if(mythankyn == 'Y'){
        sql += " AND seq IN ( SELECT shopseq FROM ShopThankLog WHERE memberseq = " + memberseq + ") ";
    }
    if(order != null && order != undefined && order != ''){
        sql += " ORDER BY " + order + " DESC";
    }
    sql += " LIMIT " + limit + " OFFSET " + offset;
    
    console.log("sql : " + sql)
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

router.get('/api/shop/:seq', (req, res) => {
    let sql = "SELECT *," 
            + "(SELECT name FROM ShopCategory WHERE seq = categoryseq) as categoryName, "
            + "(SELECT COUNT(*) FROM ShopThankLog WHERE shopseq = sh.seq) as thanks, "
            + "(SELECT COUNT(*) FROM ShopReview WHERE viewyn='Y' AND shopseq = sh.seq) as reviews, "
            + "(SELECT ROUND(AVG(rating), 1) FROM ShopReview WHERE viewyn='Y' AND shopseq = sh.seq) as avgRating "
            + "FROM Shop sh WHERE seq=" + req.params.seq;
    console.log("get shop query : " + sql)
    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//insert
router.post('/api/shop', upload.array("imageList", 10), (req, res) => {
    let shop = req.body;
    let thumbnail = "";
    if(req.files.length > 0){
        thumbnail = uploadDir + req.files[0].originalname; //맨 처음이미지를 썸네일로
    }
    let sql = "INSERT INTO Shop (memberseq, title, categoryseq, price, zipcode, address, addressdetail, menu, content, tag, viewyn, views, rating, thumbnail, register, regdate) "
            + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Y', 0, ?, ?, ?, NOW())";
    con.query(sql, [shop.memberseq, shop.title, shop.categoryseq, shop.price, shop.zipcode, shop.address, shop.addressdetail, shop.menu, shop.content, shop.tag, shop.rating, thumbnail , shop.register] 
        ,(err, result) => {
        if(err){
            console.log(err);
            con.rollback();
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        //result.insertId >> insert한 auto_increment 값
        let shopseq = result.insertId;
        let imageQuery = "INSERT INTO ShopImage (shopseq, image, path) VALUES (?, ?, ?)";

        for(var i=0; i<req.files.length; i++){
            con.query(imageQuery, [shopseq, req.files[i].originalname, uploadDir] 
                ,(err, result) => {
                if(err){
                    con.rollback();
                    return res.status(500).send({error : 'database failure'});
                }
                
                console.log('result : ' + result);
            });
        }
        res.json(result);
    });
});

//update
router.put('/api/shop/:seq', (req, res) => {
    let shop = req.body;   //req.params 는 {seq : ?}  req.body는 {seq : ?, title : ? , ~~~}
    let sql = "UPDATE Shop "
            + "SET ";
            if(shop.title != null && shop.title != undefined && shop.title != ''){
                sql += "title = " + shop.title + ",";
            }
            if(shop.category != null && shop.category != undefined && shop.category != ''){
                sql += "category = " + shop.category + ",";
            }
            if(shop.phone != null && shop.phone != undefined && shop.phone != ''){
                sql += "phone = " + shop.phone + ",";
            }
            if(shop.zipcode != null && shop.zipcode != undefined && shop.zipcode != ''){
                sql += "zipcode = " + shop.zipcode + ",";
            }
            if(shop.address != null && shop.address != undefined && shop.address != ''){
                sql += "address = " + shop.address + ",";
            }
            if(shop.addressdetail != null && shop.addressdetail != undefined && shop.addressdetail != ''){
                sql += "addressdetail = " + shop.addressdetail + ",";
            }
            if(shop.url != null && shop.url != undefined && shop.url != ''){
                sql += "url = " + shop.url + ",";
            }
            if(shop.content != null && shop.content != undefined && shop.content != ''){
                sql += "content = " + shop.content + ",";
            }
            if(shop.viewyn != null && shop.viewyn != undefined && shop.viewyn != ''){
                sql += "viewyn = " + shop.viewyn + ",";
            }
            if(shop.rating != null && shop.rating != undefined && shop.rating != ''){
                sql += "rating = " + shop.rating + ",";
            }
            if(shop.thumbnail != null && shop.thumbnail != undefined && shop.thumbnail != ''){
                sql += "thumbnail = " + shop.thumbnail + ",";
            }
            sql += "moddate = NOW(),";
            sql += "modifier = " + shop.modifier + " ";
            sql += "WHERE seq = " + shop.seq;
    con.query(sql ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//delete
router.delete('/api/shop/:seq', (req, res) => {
    let sql = "DELETE FROM Shop WHERE seq=" + req.params.seq;

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//조회수, 좋아요수
router.put('/api/shop/action/:seq', (req, res) => {
    let property = req.body.property;
    let action = req.body.action;
    let sql = "UPDATE Shop "
            + "SET ";
            if(property != null && property != undefined && property != ''){
                sql += property + " = " + property + (action == "plus" ? " + 1":" - 1");
            }
            sql += " WHERE seq = " + req.params.seq;
    console.log("query : " + sql);
    con.query(sql ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//ShopImage API
router.get('/api/shopimage/:seq', (req, res) => {
    let sql = "SELECT * FROM ShopImage WHERE shopseq = " + req.params.seq;

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        console.log('result : ' + result);
        res.json(result);
    });
});

router.post('/api/shopimage', (req, res) => {
    let image = req.body;
    let sql = "INSERT INTO ShopImage (shopseq, image, path) "
            + "VALUES (?, ?, ?)";
    con.query(sql, [image.shopseq, image.image, image.path] 
        ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//ShopCategory API
router.get('/api/shopcategory', (req, res) => {
    let sql = "SELECT * FROM ShopCategory WHERE viewyn = 'Y' ORDER BY sort ASC, regdate DESC";

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

router.post('/api/shopcategory', (req, res) => {
    let category = req.body;
    let sql = "INSERT INTO ShopCategory (name, sort, viewyn, regdate, register) "
            + "VALUES (?, 999, 'Y', NOW(), ?)";
    con.query(sql, [category.name, category.register] 
        ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//ShopThanksLog API
router.get('/api/shopThankLog', (req, res) => {
    let memberseq = req.query.memberseq;
    let shopseq = req.query.shopseq;

    let sql = "SELECT * FROM ShopThankLog WHERE memberseq = " + memberseq + " AND shopseq = " + shopseq;

    console.log("sql : " + sql)
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

router.post('/api/shopThankLog', (req, res) => {
    let log = req.body;
    let sql = "INSERT INTO ShopThankLog (memberseq, shopseq, regdate) "
            + "VALUES (?, ?, NOW())";
    con.query(sql, [log.memberseq, log.shopseq] 
        ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

router.delete('/api/shopThankLog', (req, res) => {
    let memberseq = req.query.memberseq;
    let shopseq = req.query.shopseq;
    let sql = "DELETE FROM ShopThankLog WHERE memberseq = " + memberseq + " AND shopseq = " + shopseq;

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//shopReview API
router.get('/api/review/list/:seq', async (req, res) => {
    let sql = "SELECT seq, shopseq, memberseq, membername, comment, rating, DATE_FORMAT(regdate, '%Y-%m-%d') as regdate, DATE_FORMAT(moddate, '%Y-%m-%d') as moddate, "
            + "(SELECT profile FROM Member WHERE seq = sr.memberseq) as profile "
            + "FROM ShopReview sr WHERE viewyn = 'Y' AND shopseq = " + req.params.seq + " "
            + "ORDER BY moddate DESC, regdate DESC"

    const [reviews, fields] = await con.promise().query(sql);
    
    for(var i=0; i<reviews.length; i++){
        let imageSql = "SELECT * FROM ShopReviewImage WHERE reviewseq = " + reviews[i].seq;
        let [images, fields2] = await con.promise().query(imageSql);
        reviews[i].imageList = images;
    }

    res.json(reviews);
    
});

router.get('/api/review/count', (req, res) => {
    let memberseq = req.query.memberseq;
    let shopseq = req.query.shopseq;
    let sql = "SELECT COUNT(*) as count FROM ShopReview sr WHERE viewyn = 'Y' AND shopseq = " + shopseq + " AND memberseq = " + memberseq;
    console.log("count sql : " + sql);
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send({error : 'database failure'});
        }
        console.log('result : ' + result);
        res.json(result);
    });
});

router.post('/api/review', upload_review.array("imageList", 10) ,(req, res) => {
    let review = req.body;
    let sql = "INSERT INTO ShopReview (shopseq, memberseq, membername, comment, rating, viewyn, regdate) "
            + "VALUES (?, ?, ?, ?, ?, 'Y', NOW())";
    console.log("review insert query : " + sql);
    console.log(review);
    con.query(sql, [review.shopseq, review.memberseq, review.membername, review.comment, review.rating] 
        ,(err, result) => {
        if(err){
            console.log(err);
            con.rollback();
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);

        let reviewseq = result.insertId;
        let imageQuery = "INSERT INTO ShopReviewImage (shopseq, reviewseq, image, path) VALUES (?, ?, ?, ?)";

        for(var i=0; i<req.files.length; i++){
            con.query(imageQuery, [review.shopseq, reviewseq, req.files[i].originalname, uploadDirReview] 
                ,(err, result) => {
                if(err){
                    console.log(err);
                    con.rollback();
                    return res.status(500).send({error : 'database failure'});
                }
                
                console.log('result : ' + result);
            });
        }

        res.json(result);
    });
});

router.put('/api/review', (req, res) => {
    let review = req.body;
    let sql = "UPDATE ShopReview "
            + "SET ";
            if(review.comment != null && review.comment != undefined && review.comment != ''){
                sql += "comment = '" + review.comment + "', ";
            }
            if(review.viewyn != null && review.viewyn != undefined && review.viewyn != ''){
                sql += "viewyn = '" + review.viewyn + "', ";
            }
            sql += "moddate = NOW() ";
            sql += "WHERE seq = " + review.seq;
    console.log("update review sql : " + sql);
    console.log(review.imageList.length);
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send({error : 'database failure'});
        }
        
        //이미지 파일 삭제
        review.imageList.map((image) => {
            fs.unlink(image.path+image.image, function(err){
                if(err){
                    console.log(err);
                    throw err;
                }
            })
        })

        console.log('result : ' + result);
        res.json(result);
    });
});

module.exports = router;