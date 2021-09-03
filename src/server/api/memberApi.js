var express = require('express');
var router = express.Router();
var con = require("../mysqlConnect");

router.post('/api/member/get', (req, res) => {
    let member = req.body;
    let sql = "SELECT seq, id, name, email, snsyn, profile, useyn, regdate FROM Member WHERE useyn='Y'";

    if(member.seq != 0 && member.seq != undefined & member.seq != ''){
        sql += " AND seq = " + member.seq
    }
    if(member.id != null && member.id != undefined & member.id != ''){
        sql += " AND id = '" + member.id + "'"
    }
    console.log("sql : " + sql);
    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//insert
router.post('/api/member/insert', (req, res) => {
    let member = req.body;

    let sql = "INSERT INTO Member (id, password, name, email, snsyn, profile, useyn, regdate) "
            + "VALUES (?, SHA2(?, 256), ?, ?, ?, ?, 'Y', NOW())";
    console.log("sql : " + sql);
    con.query(sql, [member.id, member.password, member.name, member.email, member.snsyn, member.profile] 
        ,(err, result) => {
        if(err){
            console.log(err);
            con.rollback();
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        //result.insertId >> insert한 auto_increment 값
        res.json(result);
    });
});

router.put('/api/member/inactive', async (req, res) => {
    let member = req.body;

    let logSql = "INSERT INTO InactiveLog (memberseq, reason, regdate) VALUES (?, ?, NOW())";
    let memberSql = "UPDATE Member SET useyn = 'N' WHERE seq = ? AND useyn='Y'";

    const [log, logFields] = await con.promise().query(logSql, [member.seq, member.reason]);
    const [inactive, memberFields] = await con.promise().query(memberSql, [member.seq]);

    res.json(inactive);
});

module.exports = router;