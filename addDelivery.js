

//const {app, BrowserWindow, Menu, ipcMain} = electron;

//let addDeliveryWindow;
//mainWindow = new BrowserWindow({});

function createAddDeliveryWindow2(){
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

document.getElementById('addButton').click();

}