let router = require('express').Router()
let mysql = require('mysql')
let bodyParser = require('body-parser')
let cors = require('cors')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '01041992',
    database: 'sekolahku'
})
db.connect(() => {
    console.log('')
})
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/user', (req, res) => {
    let sql = 'select * from users'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

router.post('/signup', (req, res) => {
    let users = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    db.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {

            res.send({
                email: req.body.email,
                username: req.body.username,
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });

})


//login
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.query('SELECT * FROM users WHERE email = ?', email, function (error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    console.log(results.password)
                    res.send({
                        results,
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
})

module.exports = router