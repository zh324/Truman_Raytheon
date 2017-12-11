    
const electron = require('electron');
const url = require('url');
const path =  require('path');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, Menu, ipcMain} = electron;

var csv = require('fast-csv');


//var XLSX = require('xlsx');

// Set ENV
//process.env.NODE_ENV = "production";


// Create the objects
let mainWindow;
let addWindow;




// listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({});
    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));    

    let mainContents = mainWindow.webContents;
    console.log(mainContents);
    /*mainContents.on('will-navigate',function(e,url){
        console.log('will navigate to:' + url)
    });

    mainContents.on('did-navigate', function (e,url){
        console.log('did navigate to:' + url)
    });
    */

    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build Menu from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
});


// Handle create add window
function createAddWindow(){
    // Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    // load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));   

    // Garbage Collection Handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}

//  Catch item: add
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item: add', item);
    addWindow.close();
});

// Catch the video submitted
ipcMain.on('video:submit', (event, path) =>{
    ffmpeg.ffprobe(path, (err, metadata) =>{
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
    
});




// Create Menu Template
const mainMenuTemplate = [
    {},
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item: clear');
                }
                
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// If mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I':
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });

}

/*
var user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    bio: faker.lorem.sentence(),
    image: faker.image.avatar()
};

var faker = require('faker');

  var name = faker.name.findName();
  var randomEmail = faker.internet.email();
*/



// read csv file
exports.CsvStreamRead = (ActorModel, pathToCsv) => {
 const actors = [];
 fs.createReadStream(pathToCsv)
  .pipe(csv())
  .on('data', function(data){
   // this function is called for each row in csv.
   const actorJson = Parser.parser(data);
   const newActor = new ActorModel({
    class: actorJson.class,
    username: actorJson.username,
    profile: {
     name: actorJson.name,
     gender: actorJson.gender,
     age: actorJson.age,
     location: actorJson.location,
     bio: actorJson.bio,
     picture: actorJson.picture
    }
   });
   actors.push(newActor);
  })
  .on('end', function(data){
   console.log('Read finished');
  });
 return actors;
}




// Mongo DB Connnection
/*
function connectMongo(){
                  var MongoClient = require('mongodb').MongoClient;
                  console.log('MongoClient is',typeof MongoClient)
                  var myCollection;
                  const dbName = 'newDb';
                  mongoose.connect('mongodb://localhost/' + dbName, { useMongoClient: true });
                  mongoose.Promise = global.Promise;
                    console.log("connected to the mongoDB!");
                    myCollection = db.collection('test_collection');
                  }
                
                connectMongo()
                // const dbName = 'newDb';
                //mongoose.connect('mongodb://localhost/' + dbName, { useMongoClient: true });
                //mongoose.Promise = global.Promise;
                 var mongoose = require('mongoose');

                 const actorSchema = new mongoose.Schema({
                     class: String, //normal, bully, victim, highread,cohort
                     username: String,
                     name: String,
                     gender: String,
                     age: Number,
                     location: String,
                     bio: String,
                     picture: String
                                 
                    }, { timestamps: true });

                                const Actor = mongoose.model('ActorModel', actorSchema);
                                const actors = data;

                                Actor.collection.insert(actors, onInsert);
                                function onInsert(err) {
                                    if (err) {
                                        // TODO: handle error
                                        console.log("error to store");
                                    } else {
                                        console.log('actors successfully stored.');
                                    }
                                    mongoose.connection.close();
                                }

*/