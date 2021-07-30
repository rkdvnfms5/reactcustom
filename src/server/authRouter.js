var express = require('express');
var router = express.Router();

var con = require("./mysqlConnect");

router.post('/api/auth/login', (req, res) => {
    let member = req.body.params;
    let sql = "SELECT seq, id, regdate FROM Member WHERE id = ? AND password = SHA2(?, 256)";

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
        }

        res.json(result);
    });
});

router.post('/api/auth/info', (req, res) => {
    res.json(req.session.member);
});

router.get('/api/auth/logout', (req, res) => {
    if(req.session.member){
        //req.session.destroy(function(err){});
        req.session.member = null;
    }
    res.redirect("/list");
});

module.exports = router;