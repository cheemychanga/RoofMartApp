const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addDeliveryWindow;
//Listen for app to be ready
app.on('ready', function(){

mainWindow = new BrowserWindow({});

mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true   
}));



//Quit app when closed
mainWindow.on('closed', function(){
    app.quit();
});
//Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);
});

//Handle CreateAddWindow
function createAddDeliveryWindow(){
    addDeliveryWindow = new BrowserWindow({
        width: 500,
        height: 400,
        title: 'Add Deliveries',
        frame: false
    });

    addDeliveryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addDeliveryWindow.html'),
        protocol: 'file:',
        slashes: true   
    }));
    //Garbage Collection
addDeliveryWindow.on('close', function(){
    addDeliveryWindow = null;
});
}

//Catch deliverer:add
ipcMain.on('deliverer:add', function(e, deliverer){
    //console.log(deliverer);
    mainWindow.webContents.send('deliverer:add', deliverer);
});


//Catch address:add
ipcMain.on('address:add', function(e, address){
    //console.log(address);
    mainWindow.webContents.send('address:add', address);
});





//Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add Delivery',
                accelerator: 'CMDOrCTRL+N',
                click(){
                    createAddDeliveryWindow();
                }
            },
            {
                label: 'Delete ALL Deliveries',
                accelerator: 'CMDOrCTRL+D',
                click(){
                    mainWindow.webContents.send('deliverer:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: 'CMDOrCTRL+Q',
                click(){
                app.quit();

                }
            }
        ]
    }
];
//mac fix menu
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools for non production
if (process.env.NODE_ENV != 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: 'CMDOrCTRL+I',
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