/**
 * Created by Фёдор on 21.05.2017.
 */
const express = require("express");

const app = express();
app.set('view engine', 'jade');
const port = 3000;
const axios = require("axios");
function run() {
   //* "02H05KUjCQlduyqfFcS2JMWRR",
   //     "N4oBDCI6M40MaFVOQyyCjCimMH7UygFUUjZA23jT9JmXhqNTYl",


    app.get('/', function (request, response) {
        response.render('index', { title: 'Fucking Twitter'});
        //response.send(getAuthForm());

        response.end();

    });

    app.post('/', function (request, response) {

        response.send("Авторизация в твиттере");
//axios.get('https://api.twitter.com/oauth/authenticate?oauth_token=866261745656090626-WgWVyytFOaSW0YCd4elebnSTv3I9mRR')
        response.end();

    });

    app.use(function (req, res) {
        res.send("Страница не доступна!")
    });
/*
    var getAuthForm = function () {
        return '<form action="/" method="post">'+
                '<input type="submit" text="Авторизация"/></form>'
    }
*/


    app.listen(port, function () {
        console.log("Server Ok.")
    });
}
module.exports = {run};
