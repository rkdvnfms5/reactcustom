var express = require('express');
var router = express.Router();

var con = require("../mysqlConnect");

//Shop API
router.get('/api/shop', (req, res) => {
    let sql = "SELECT * FROM Shop";

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

router.get('/api/shop/:seq', (req, res) => {
    let sql = "SELECT * FROM Shop WHERE seq=" + req.params.seq;

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//insert
router.post('/api/shop', (req, res) => {
    let shop = req.body;
    let sql = "INSERT INTO Shop (memberseq, title, category, phone, zipcode, address, addressdetail, url, content, viewyn, views, rating, thumbnail, register, regdate) "
            + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Y', 0, ?, ?, ?, NOW())";
    con.query(sql, [shop.memberseq, shop.title, shop.category, shop.phone, shop.zipcode, shop.address, shop.addressdetail, shop.url, shop.content, shop.rating, shop.thumbnail, , shop.register] 
        ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        //result.insertId >> insert한 auto_increment 값
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

//ShopImage API
router.get('/api/shopimage:seq', (req, res) => {
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
            + "VALUES (?, 999, 'N', NOW(), ?)";
    con.query(sql, [category.name, category.register] 
        ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

module.exports = router;