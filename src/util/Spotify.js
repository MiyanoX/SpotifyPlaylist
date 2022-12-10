let accessToken = "BQC6-OUjQIQCGXi8CiZhXu8korECrY0K8sVYNeTieMML0Az6M-E6RCvK3YDUBTt2Sc56m6xh6vk2i2uCRUesC6jInhFAEvF3bjTvpW-guw_JllSSNB6uhkAvhDdwdeQS-l761rqIAzsU-tUqeyASCLVHUV_wO86ZglQhPKE42HNUYJiVU7i8eEY-8p9pAbOY8rY";
let clientID = 'd866cbcf85a742daac8ae5eb0aea9d0a';
let redirectURI = "http://localhost:3000/callback/";

let Spotify = {
    getAccessToken() {
        if (accessToken) {
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
        console.log(accessToken)
    },
    
    search(searchTerm) {
        return fetch(`https://api.spotify.com/v1/search?type=track&limit=5&q=${searchTerm}`,  {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            .then((response) => response.json())
            .then((data) => {
                if (!data.tracks) {
                    return []
                }
                return data.tracks.items.map((track) => 
                    {  
                        return {
                            name: track.name, 
                            artist: track.artists[0].name, 
                            album: track.album.name,
                            id: track.id,
                            uri: track.uri
                        }
                    }
                );
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
};

// Spotify.search('new');

export default Spotify;