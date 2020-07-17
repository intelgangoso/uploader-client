# uploader-client
File uploader for JPG & MP4 files using MEAN stack.

### Setting up Node.js
1. Download & install NodeJS & NPM from https://nodejs.org/en/
2. To check if you have node installed run this command in your terminal:
`node -v`
3. To confirm that you have npm installed you can run this command:
`npm -v`

### Setting up the MongoDB database
1. Choose the installation package based on your OS on https://www.mongodb.com/try
2. After installation, go to https://docs.mongodb.com/manual/administration/install-community/ and follow the steps
3. To start MongoDB open a terminal and run:
`mongod`
4. To interact with MongoDB, open another terminal and run:
`mongo`



## Steps to recreate project
1. Create main folder with any name you like
2. npm install -g @angular/cli
3. Git clone https://github.com/intelgangoso/uploader-client.git inside your main folder
4. Git clone https://github.com/intelgangoso/uploader-server.git inside your main folder

## To run client:
* cd uploader-client
* npm install
* Run `nodemon`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

** _To run test:_ **
* Run `ng test` to execute the unit tests via Karma.

## To run server:
* cd uploader-server
* create folder "database" and a file "db.js".
* on the "db.js" file, write down the connection string URI.

`module.exports = {
    db: 'mongodb://127.0.0.1:27017/<your database name here>'
}`
* npm install
* Run `nodemon`.
