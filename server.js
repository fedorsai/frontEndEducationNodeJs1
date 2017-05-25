/**
 * Created by Фёдор on 21.05.2017.
 */
const express = require("express");
const vk = require('./vkMuthods.js');

const app = express();
const vkUrl = 'https://oauth.vk.com/authorize?client_id=6046102&redirect_uri=http://localhost:3000/vk&display=popup&scope=groupsresponse_type=code&v=5.64';
app.set('view engine', 'jade');

const port = 3000;
const axios = require("axios");
function run() {

    app.get('/', function (request, response) {
        response.render('index', { title: 'Fucking Twitter'});
        response.end();
    });

    app.get('/login', function (request, response) {
        response.redirect(vkUrl);
        response.end();
    });

    app.get('/vk', function (request, response) {
        console.log(request.query.code);
        vk.getGroupInfo(request, response);
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
