const electron = require('electron');

const ffmpeg = require('fluent-ffmpeg');

const os = require('node:os');



const {app, BrowserWindow , ipcMain , dialog} = electron;



app.disableHardwareAcceleration()

const ElectoronEvents = {
    Ready: 'ready',
    Closed: 'closed',
}

let MainWindow;

app.on(ElectoronEvents.Ready,() => {
    console.log('Electron is ready');
    MainWindow =  new BrowserWindow({
        resizable: true,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    MainWindow.loadURL(`file://${__dirname}/index.html`);
})

ipcMain.on('open-dialog-for-file', (event) => {
    console.log('open dialog for file');
    if(os.platform() === 'linux'  || os.platform() === 'win32'){
        // For Linux and Windows, we can use the 'openFile' property
        dialog.showOpenDialog({ 
            properties: ['openFile']
        }).then((fileLists) => { //callback is deprecated, use promise instead
            if(fileLists ){
                ffmpeg.ffprobe(fileLists.filePaths[0],(err, metadata) => {
                    if(err){
                        console.error('Error getting metadata:', err);
                        MainWindow.webContents.send('error-selected-file', err);
                        return;
                    }
                    MainWindow.webContents.send('selected-file-duration', metadata.format.duration);
                })
            }
        })
    }else{
        console.log('open dialog for directory executed in mac');
        dialog.showOpenDialog({ 
            properties: ['openFile', 'openDirectory']
        }).then(
        (fileLists) => {
            if(fileLists ){
                ffmpeg.ffprobe(fileLists.filePaths[0], (err, metadata) => {
                    if(err){
                        console.error('Error getting metadata:', err);
                        MainWindow.webContents.send('error-selected-file', err);
                        return;
                    }
                    MainWindow.webContents.send('selected-file-duration', metadata.format.duration);
                })
            }
        })
    }
})



