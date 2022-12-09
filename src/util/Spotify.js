let accessToken;
let clientID = 'd866cbcf85a742daac8ae5eb0aea9d0a';
let redirectURI = "http://localhost:3000/";

let Spotify = {
    getAccessToken() {
        if (!accessToken) {
            return accessToken;
        }
        const URL = window.location.href;
        if (!URL.match(/error=([^&]*)/)) {
            accessToken = URL.match(/access_token=([^&]*)/);
            const expireIn= URL.match(/expires_in=([^&])*/);
            window.setTimeout(() => accessToken = '', expireIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }

        
    }
    

};

module.exports = Spotify;