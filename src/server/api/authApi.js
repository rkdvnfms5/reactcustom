var express = require('express');
var router = express.Router();

var con = require("../mysqlConnect");

router.post('/api/auth/login', async (req, res) => {
    let member = req.body.params;
    let updateQuery = "UPDATE Member SET profile = ? WHERE id = ?";
    let sql = "SELECT seq, id, name, email, snsyn, profile, regdate FROM Member WHERE id = ? AND password = SHA2(?, 256) AND useyn = 'Y'";
    
    console.log("profile : " + member.profile);

    const [result, updateFields] = await con.promise().query(updateQuery, [member.profile, member.id]);
    const [getMember, memberFields] = await con.promise().query(sql, [member.id, member.password]);

    let logQuery = "INSERT INTO LoginLog (memberseq, memberid, act, regdate) VALUES (?, ?, 'login', NOW())";

    const [log, logFields] = await con.promise().query(logQuery, [getMember[0].seq, member.id]);
    
    //session에 정보 저장
    if(getMember.length > 0){
        req.session.member = getMember[0];
        console.log(req.session.member);
    }
    res.json(getMember);
});

router.post('/api/auth/info', (req, res) => {
    res.json(req.session.member);
});

router.post('/api/auth/logout', async (req, res) => {
    if(req.session.member){
        let logQuery = "INSERT INTO LoginLog (memberseq, memberid, act, regdate) VALUES (?, ?, 'logout', NOW())";

        const [log, logFields] = await con.promise().query(logQuery, [req.session.member.seq, req.session.member.id]);
        req.session.member = null;
        res.json(log);
    }
    
});

module.exports = router;