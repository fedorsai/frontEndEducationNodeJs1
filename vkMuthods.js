/**
 * Created by Фёдор on 25.05.2017.
 */

const axios = require("axios");
const client_secret = 'rajpHbX5HyWYVHIixJ8j';
const client_id = '6046102';
const redirect_uri = 'http://localhost:3000/vk';
const getAccessTokenUrl = 'https://oauth.vk.com/access_token?client_id='+client_id+'&client_secret='+client_secret+'&redirect_uri='+redirect_uri+'&code=';
const getGroupIdUrl = 'https://api.vk.com/method/groups.get?extended=1&count=1&access_token=';
var gid = '';
var accessToken ='';

function getGroupInfo(request, response){
    console.log(getAccessTokenUrl + request.query.code);
    axios.get(getAccessTokenUrl + request.query.code)
        .then(function (res) {
            console.log(res.data.access_token);
            accessToken = res.data.access_token;
            response.cookie('accessToken',accessToken, { maxAge: 900000, httpOnly: true });
            console.log(request.cookie);

            getGroupId(accessToken, response);
        });
}

function getGroupId(accessToken, response){
    console.log('getGroupId');
    axios.get(getGroupIdUrl + accessToken)
        .then(function (res) {
            console.log(res.data);
            console.log(res.data.response[1]);
            console.log(gid);
            gid = res.data.response[1].gid;
            getWallPosts(accessToken, gid, response);
        });
}

function getWallPosts(accessToken, gid, response){
    var getWallPostsUrl = 'https://api.vk.com/method/wall.get?owner_id=-' + gid + '&count=5&filter=all&access_token=' + accessToken;
    axios.get(getWallPostsUrl)
        .then(function (res) {
            console.log(res.data);
            console.log(res.data.response[1]);
            resultHtml = '<ul>';
            res.data.response.forEach(function (item, i) {

                    if (i != 0) {
                        resultHtml = resultHtml + '<li>' + item.text + '</li>';
                        console.log(item.text);
                    }

            });
            resultHtml = resultHtml + '</ul>';
            //console.log(request.cookies);
            console.log(resultHtml);


            response.send(resultHtml);
            response.end();

        });
}

module.exports = {getGroupInfo, getGroupId};