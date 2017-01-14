# Leaderboard #

The leaderboard has been created to provide a leaderboard for your Minecraft server.  This is calculated by assigning points to each achievement gained within Minecraft.

## Setup ##

* Clone this project in your Minecraft servers root directory (which is the directory that contains the server.properties file)
* Install [Node.js](https://nodejs.org/)
* Go into the project and install the required node packages using npm


```
npm install

```

## Start up - Quick ##

* Start the application with npm start which runs on a default port of 25566 and looks for the default world

```
npm start
```

## Start up - Custom ##

* Start the application from the Minecraft server root directory specifying a port to run on and the default world.  e.g. node ./leaderboard/server.js [port] [world]

```
node ./leaderboard/server.js 25566 world
```

## Use ##
* View the leaderboard by going to the hostname and port it started on.

```
http://127.0.0.1:25566/leaderboard.html
```

* View the killsboard by going to the hostname and port it started on.

```
http://127.0.0.1:25566/killsboard.html
```

## Config ##

* Points for the achievements / stats can be changed by altering leaderboard/json/points.json
* Banner on the leaderboard can be changed by changing leaderboard/assets/banner.png

## Testing (UNIX / Mac OSX) ##

* Run the tests using npm test.  This will start a default leaderboard node server on port 3000 and run the tests

```
npm test

```