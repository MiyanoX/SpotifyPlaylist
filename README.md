# Miyaaaaaano

Miyaaaaaano is a `React` web app for users to search tracks and save them to playlist in Spotify. \
\
Open [http://miyano.surge.sh](http://miyano.surge.sh) to view it in your browser.

## App Instruction

<img width="1439" alt="Screen Shot 2022-12-14 at 14 53 16" src="https://user-images.githubusercontent.com/62541265/207517474-91d53b60-d0b0-4ae4-81ef-d2ccc63f088c.png">

### Search Bar

* Input anything you want and click `Search`.

### Search Results

* Display results from Spotify with your search input. 
* Click `+` to add tracks to left playlist.

### Playlist
* Display tracks added by users.
* Set whatever you like as name of playlist. 
* Click `-` to delete tracks from playlist. 
* Click `Save to Spotify` to save current list to Spotify.

## Run, Build and Deploy

Install npm firstly before running.

```
npm install
```

### Run

```
npm start
```

Runs the app in the development mode.\
\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

```
npm run build
```

Builds the app for production to the `build` folder.\

### Deploy

This project use `Surge` for deploy.\
 \
Start by installing `Surge`:

```
npm install --global surge
```

After build, open `build` folder:

```
cd ./build/
```

And then duplicate `index.html` to `200.html`:

```
cp index.html 200.html
```

After previous command, upload it to the Surge:

```
surge
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
