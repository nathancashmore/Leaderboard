![leaderboard logo](https://github.com/nathancashmore/Leaderboard/blob/master/app/assets/images/leaderboard.png "Leaderboard Logo")

This project has been created to provide a leaderboard for your Minecraft server.  
This is calculated by assigning points to each achievement gained within Minecraft.

## Setup ##

* Install [NodeJs](https://nodejs.org/en/) v10
> If installing on Windows make sure you install windows build tools first :

> ```npm install --global --production windows-build-tools```

* Clone this project
* Install dependencies


```
npm install
```
## Start up - Quick ##
To start the application with the default values:
* PORT = ```25566```
* EXPORT_PATH = ```./app/data"```
* EXPORT_FREQUENCY = ```0```
* MC_SERVER_PATH = ```../MinecraftServer```
* BACKGROUND = ```obsidian```
* DISPLAY_SERVERNAME = ```true```
* BANNER = ```leaderboard.png```

```
npm start
```

## Start up - Custom ##
You can change any of the run parameters on the command line at startup:
```
MC_SERVER_PATH="../MyNewShinyServer/" PORT=25575 BASE_PATH="/leaderboard" BACKGROUND="lapis" DISPLAY_SERVERNAME="false" BANNER="myownbanner.png" npm start
```

## Start up - Config file ##
Add desired settings to new config file in the config directory.
  
See ```./config/default.json``` for possible options. 

e.g. with new config file ```./config/myCustomServer.json```

```
NODE_ENV=myCustomServer npm start

```

## Use ##
View the leaderboard by going to the hostname and port it started on.

[http://127.0.0.1:25566/](http://127.0.0.1:25566/)

## Config ##

* Points for the achievements can be changed by altering ```app/assets/json/points.json```
* Banner on the leaderboard can be changed by changing ```app/assets/images/banner.png```
* BACKGROUND start parameter can be any of the following:
```
obsidian
lapis
netherrack
prismarine
```
* DISPLAY_SERVERNAME can be set to ```true``` or ```false``` if you want to also show the 
minecraft server connection details on the leaderboard.
* BANNER can be set to an alternative image file to be displayed at the top of the leaderboard.  
Add the file you want to use to ```app/assets/images/``` directory.
* EXPORT_PATH can be set to change the location where an image of the current leaderboard will be saved 
when the [http://127.0.0.1:25566/export](http://127.0.0.1:25566/export) endpoint is requested.
* EXPORT_FREQUENCY can be set to a number representing the number of minutes between exports
of the leaderboard to the EXPORT_PATH directory (Default 0 - No Export)

## Release (< 1.11) ##
The latest code works with Minecraft 1.14 and Advancements.
For earlier Minecraft servers use the [v1.11 release](https://github.com/nathancashmore/Leaderboard/releases/tag/v1.11).

## Glider Rider Bukkit plugin ##
The Leaderboard has been optimised to work with the Glider Rider Bukkit plugin which can be found on
[Curse](https://mods.curse.com/bukkit-plugins/minecraft/278342-gliderrider)

To use:

* Download and install a [Spigot or CraftBukkit server](https://getbukkit.org/)
* Create a course using the [GliderRider plugin](https://mods.curse.com/bukkit-plugins/minecraft/278342-gliderrider)
* View the course leaderboard by going to:
[http://127.0.0.1:25566/glider-rider/\<course-name\>](http://127.0.0.1:25566/glider-rider/<course-name>)

## View the Leaderboard in Minecraft ##
It is now possible to view the Leaderboard in Minecraft itself with the help of the 
[ImageMaps](https://dev.bukkit.org/projects/imagemaps) plugin running on a Spigot server.

To do this:
* Create a [Spigot](https://www.spigotmc.org/wiki/spigot-installation/) Minecraft server
* Add the [ImageMaps](https://dev.bukkit.org/projects/imagemaps) plugin
* Change the ```EXPORT_PATH``` to be that of the ImageMaps input directory
e.g. ```./MinecraftServer/plugins/ImageMaps/images``` 
* Change the ```EXPORT_AS_IMAGE``` to be ```true```

When you now start up the Leaderboard, every 5 mins it will export the Leaderboard
as an image to the ImageMaps input directory.  In the game you will then be able to
add the image to a block e.g.
 
```imagemap leaderboard.png```

You should then setup a commandblock to periodically reload the image in the game
so it is kept upto date e.g.

```imagemap leaderboard.png reload```


## Testing (UNIX / Mac OSX) ##

```
npm test
```
