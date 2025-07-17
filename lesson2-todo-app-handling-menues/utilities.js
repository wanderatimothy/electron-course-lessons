const  electron  = require('electron');
const path = require('node:path');
module.exports.createNewWindow = (filePath , options)  => {
    const { BrowserWindow } = electron;
   let newWindow = new BrowserWindow({
    resizable: options.resizable || true,
    width: options.width || 800,
    height: options.height || 600,
    title: options.title || 'New Window',
    webPreferences: {
        preload:path.join(__dirname,'preload.js'),
        contextIsolation: options.contextIsolation || true,
        nodeIntegration:false
    }
   });
   newWindow.loadFile(filePath);
   newWindow.setMenu(options.menu || null);
   return newWindow;
}


