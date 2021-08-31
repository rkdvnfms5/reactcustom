var express = require('express');
var router = express.Router();

var con = require("../mysqlConnect");

router.post('/api/auth/login', async (req, res) => {
    let member = req.body.params;
    let updateQuery = "UPDATE Member SET profile = ? WHERE id = ?";
    let sql = "SELECT seq, id, name, email, snsyn, profile, regdate FROM Member WHERE id = ? AND password = SHA2(?, 256)";

    console.log("profile : " + member.profile);

    const [result, fields] = await con.promise().query(updateQuery, [member.profile, member.id]);
    const [getMember, fileds] = await con.promise().query(sql, [member.id, member.password]);

    
    /*
    con.query(sql, [member.id, member.password], (err, result) => {
        if(err){
            throw err;
        }
        
        //result는 Array[Object] 형태
        //result 출력
        for (var i = 0; i < result.length; i++) {
            for ( var keyNm in result[i]) {
                console.log("key : " + keyNm + ", value : " + result[i][keyNm]);
            }
        }

        //session에 정보 저장
        if(result.length > 0){
            req.session.member = result[0];
            console.log(req.session.member);
        }

        res.json(result);
    });
    */
    if(getMember.length > 0){
        req.session.member = getMember[0];
        console.log(req.session.member);
    }
    res.json(getMember);
});

router.post('/api/auth/info', (req, res) => {
    res.json(req.session.member);
});

router.post('/api/auth/logout', (req, res) => {
    if(req.session.member){
        //req.session.destroy(function(err){});
        req.session.member = null;
    }
    res.redirect("/shop/list");
});

module.exports = router;