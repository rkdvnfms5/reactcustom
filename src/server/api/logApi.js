var express = require('express');
var router = express.Router();
var con = require("../mysqlConnect");
var requestIp = require('request-ip');
var device = require('express-device');

router.use(device.capture());

router.post('/api/log/visit', async (req, res) => {
    let memberseq = 0;
    if(req.session.member){
        memberseq = req.session.member.seq;
    }
    let ip = requestIp.getClientIp(req);
    let device = req.device.type;

    let selectSql = "SELECT * FROM VisitLog WHERE ip = ? AND regdate LIKE CONCAT(DATE_FORMAT(NOW(), '%Y-%m-%d'), '%')";
    let insertSql = "INSERT INTO VisitLog (memberseq, device, ip, regdate) VALUES (?, ?, ?, NOW())";

    const [logs, fields] = await con.promise().query(selectSql, [ip]);
    if(logs.length == 0){
        const [insert, fields2] = await con.promise().query(insertSql, [memberseq, device, ip]);
    }
    
});

router.get('/api/log/visit', async (req, res) => {
    let ip = requestIp.getClientIp(req);
    let device = req.device.type;

    let todaySql = "SELECT COUNT(*) as count FROM VisitLog WHERE regdate LIKE CONCAT(DATE_FORMAT(NOW(), '%Y-%m-%d'), '%')";

    const [count, fields] = await con.promise().query(todaySql);

    console.log("@@@@@@@@@@@@ count :" + count);
    res.json(count);
})

module.exports = router;