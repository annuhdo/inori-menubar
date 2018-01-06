# inori-menubar 🏯

An experimental desktop menubar app that allows the user to track anime series they are currently watching. 

![Inori Demo Gif](./demo.gif)

## Features

* Bundled with GraphQL Express server.
* Accesses and stores data in Apollo cache.
* Cache-and-network queries -- connect to cache if unable to connect to network.

## How to Run

### Initial setup

```
$ git clone https://github.com/annuhdo/inori-menubar.git
$ cd inori-menubar

$ yarn install
```

### Start server locally

Server is going to be hosted on port 7777. This can be changed on
[server.js](./server/server.js).

```
$ yarn run server

🚀 Server is running on port: 7777
```

The GraphiQL is located at http://localhost:7777/

### Starting the app

```
$ yarn start 
```

## Roadmap

* Complete offline-capabilities (save assets)
* Export and import lists (MAL, Kitsu, etc.)

## License

MIT
