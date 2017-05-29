/**
 * Created by Фёдор on 25.05.2017.
 */
const axios = require("axios");
const constants = require('./constants.js');
const getAccessTokenUrl = 'https://oauth.vk.com/access_token?client_id='+ constants.client_id+'&client_secret='+ constants.client_secret+'&redirect_uri='+ constants.redirect_uri+'&code=';
var variables = require('./variables.js');
function getGroupInfo(request, response){
    axios.get(getAccessTokenUrl + request.query.code)
        .then(function (res) {
            variables.accessToken = res.data.access_token;
            response.cookie('accessToken',variables.accessToken, { maxAge: 900000, httpOnly: true });
        })
        .then(function () {
            response.redirect('/vkready');
        })
}

function getGroupId(accessToken, response){
    console.log(accessToken);
    axios.get(constants.getGroupIdUrl + accessToken)
        .then(function (res) {
            variables.gid = res.data.response[1].gid;
            variables.accessToken = accessToken;
            getWallPosts(variables.accessToken, variables.gid, response);
        });
}

function getWallPosts(accessToken, gid, response){
    var getWallPostsUrl = 'https://api.vk.com/method/wall.get?owner_id=-' + gid + '&count=5&filter=all&access_token=' + accessToken;
    axios.get(getWallPostsUrl)
        .then(function (res) {
            var resultHtml = '<ul>';
            var posts = [];
            res.data.response.forEach(function (item, i) {

                    if (i != 0) {
                        resultHtml = resultHtml + '<li>' + item.text + '</li>';
                        v.push(item.text);
                    }
            });
            console.log(v);
            resultHtml = resultHtml + '</ul>';
            response.render('groupPosts', { title: 'Моя группа', posts: posts});
            response.end();
        });
}

module.exports = {getGroupInfo, getGroupId};