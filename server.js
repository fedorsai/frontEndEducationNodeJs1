/**
 * Created by Фёдор on 21.05.2017.
 */

const express = require("express");
const vk = require('./vkMethods.js');
const constants = require('./constants.js');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.set('view engine', 'jade');

const port = 3000;
const axios = require("axios");
function run() {

    app.get('/', function (request, response) {
        if(request.cookies.accessToken != null)
        {
            console.log(request.cookies.accessToken);
            response.redirect('/vkready');
        }
        else
        response.render('index', { title: 'Авторизация'});
        response.end();
    });

    app.get('/login', function (request, response) {
        response.redirect(constants.vkUrl);
        response.end();
    });

    app.get('/vk', function (request, response, next) {
        if(request.cookies.accessToken != null)
        {
            response.redirect('/vkready');
        }
        else {
            vk.getGroupInfo(request, response);
        }
    });

    app.get('/vkready', function (request, response) {
        if(request.cookies.accessToken != null)
        {
            vk.getGroupId(request.cookies.accessToken, response);
        }
        else {
            response.redirect('/');
        }
    });

    app.post('/', function (request, response) {
        response.redirect('/login');
        response.end();
    });

    app.use(function (req, res) {
        res.send("Страница не доступна!")
    });

    app.listen(port, function () {
        console.log("Server Ok.")
    });
}
module.exports = {run};
