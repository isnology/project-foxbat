# Project FOXBAT
## External links
Figma wireframes ([clean](https://www.figma.com/file/EtEpPs4hyG9qDEsYVX7Kif5w/Foxbat-clean-wireframes) & [dev](https://www.figma.com/file/0tRu6eCM4M8QjqD2DJvvh8Tb/Foxbat-project))  |  [Trello task list](https://www.figma.com/file/0tRu6eCM4M8QjqD2DJvvh8Tb/Foxbat-project)  |  Google Drive for team documents
## Contents
* [The Brief](#the-brief)
* [How to run](#how-to-run-in-development)
* [Tools used](#tools-used)
* [Team](#team)

## The Brief
### Problem
[Foxbat Australia](http://www.foxbat.com.au/) import Aeroprakt airplanes from Europe, configure and then sell to buyers in Australia.

Their practice up to this point has involved phone call discussions between customers in Australia and then relaying their desires to the factory in Europe who then respond with an updated schematic of the custom instrument panel layout. 

This process can involve a lot of back-and-forth and takes a lot of time and so it was identified that a web app could assist by allowing the customer a platform to configure their own instrument panel and see immediate results.

### Solution
Provide a web app written with the following technologies
* Mongo
* Express
* React
* Node

## How to run in development
If you clone this, to run it you have to:
1. `cd api`
1. `yarn install`
1. `yarn seed`
1. Ensure that mongod service is started:
    * on Linux:
        1. verify by executing `ps -aux | grep mong`
        1. start the server by executing `sudo service mongod start`
    * on MacOS:
        1. Check if its running with `brew services list`
        1. ensure the server is running by executing `brew services start mongod`
1. If there are any lines in the source code that look like `process.env.MONGO_URI` for example, particularly the `process.env` part, then it means some environment variables have been deployed, and they won't have been pushed to github so you won't have a copy of them. You'll have to create a file in your backend /api folder called .env (and production.env if you're to be deploying online) and here is an example of what the contents would be for dev:
    * `MONGO_URI = mongodb://localhost/foxbat`
    * `JWT_SECRET = <whatever you like here, but secure>`
1. `yarn dev`

## Tools used
* Figma for wireframes
* Trello for task lists and user stories
* Google drive for document storage (team minutes, notes etc.)
* Slack for online team communication
* Git and Github for source code version control

## Team
[Simon Dwyer](https://github.com/piratechicken/)

[Glenn Marks](https://github.com/isnology/)

[Nathanial Mether](https://github.com/NathanielMether/)

[Alex Palma](https://github.com/developingAlex/)