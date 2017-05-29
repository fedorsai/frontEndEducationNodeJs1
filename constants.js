/**
 * Created by Фёдор on 27.05.2017.
 */


const client_secret = 'rajpHbX5HyWYVHIixJ8j';
const client_id = '6046102';
const redirect_uri = 'http://localhost:3000/vk';

const getGroupIdUrl = 'https://api.vk.com/method/groups.get?extended=1&count=1&access_token=';
const vkUrl = 'https://oauth.vk.com/authorize?client_id=6046102&redirect_uri=http://localhost:3000/vk&display=popup&scope=groupsresponse_type=code&v=5.64';

module.exports = {client_secret, client_id, redirect_uri, getGroupIdUrl, vkUrl};