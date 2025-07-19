import electron from 'electron';
import path from 'node:path';
import dotenv from 'dotenv';
const { app , BrowserWindow , Tray } = electron;

dotenv.config();

let MainWindow;

let TrayInstance;

let __dirname = path.dirname(new URL(import.meta.url).pathname);

app.disableHardwareAcceleration();

app.whenReady().then(() => {
    
    MainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        frame: false,
        show: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname,'preload.js'),
            contextIsolation: false
        }
    });
    MainWindow.loadURL(process.env.VITE_APP_CLIENT_URL);

    TrayInstance = new Tray(path.join(__dirname,'/src/assets/flame.png'));
    TrayInstance.on('click',() => {
        if(MainWindow.isVisible()){
            MainWindow.hide();
        }else{
            MainWindow.show();
        }

    })


})