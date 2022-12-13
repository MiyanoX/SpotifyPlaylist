let accessToken;
let clientID = 'd866cbcf85a742daac8ae5eb0aea9d0a';
let redirectURI = "http://miyano.surge.sh/callback/";

let Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const URL = window.location.href;
        if (URL.match(/access_token=([^&]*)/)) {
            accessToken = URL.match(/access_token=([^&]*)/)[1];
            const expireIn= URL.match(/expires_in=([^&]*)/)[1];
            setTimeout(() => accessToken = '', expireIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    
    search(searchTerm) {
        this.getAccessToken();
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
    },

    async savePlaylist(playlistName, trackURLs) {
        if (!playlistName || !trackURLs) {
            return
        }
        this.getAccessToken();
        let currentAccessToken = accessToken;
        let header = { Authorization: `Bearer ${currentAccessToken}` };
        let userID;
        let playlistID;

        await fetch("https://api.spotify.com/v1/me", {headers: header})
            .then((response) => response.json())
            .then((data) => {
                userID = data.id;
            })
        
        await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: header,
            method: 'POST',
            body: JSON.stringify({
                name: playlistName
            })
        })
            .then((response) => response.json())
            .then((data) => {
                playlistID = data.id;
            })

        await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: header,
            method: 'POST',
            body: JSON.stringify({
                uris: trackURLs
            })
        })
            .then((respons) => respons.json())
            .then((data) => {
                playlistID = data.id
            })

    }
};

// Spotify.search('new');

export default Spotify;