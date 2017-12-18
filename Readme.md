# Real Time Bid Updates

## Prerequisites for running project
- Node.js
    - This application requires [Node.js](https://nodejs.org/)  to run.
## Steps to run project 

###### Download the project or clone using below commands
After downloading/cloning then install the dependencies and start the server.

$ git clone https://github.com/ankitaraj/dev-challenge-dist.git
$ cd dev-challenge-dist
$ npm install  
$ npm start
```
navigate to http://localhost:8011/ you should see table with data updates.
```
### Architecture
- File index.js is responsible to fetch data from /fx/prices. Whenever it will receive data it will be passed to view to render that data.
- File bidDataUpdates.js (under site directory) is responsible to generate view.

### Notes
- Data is sorted in descending order of Best bid last Changed column.
- For initial 30 seconds you wont see any sparkline. 