const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const os = require('os');
const {createNewWindow} = require('./utilities');
require('dotenv').config();

let mainWindow;

let addTodoWindow;

let menuTemplate = [
    {
        label:'File',
        submenu:[
            {label: 'New Todo' , click : () => {
                if(addTodoWindow && !addTodoWindow.isDestroyed()) {
                    addTodoWindow.focus();
                } else {
                    addTodoWindow = createNewWindow(__dirname + '/pages/add-todo.html', {
                        resizable: false,
                        width: 400,
                        height: 300,
                        title: 'Add Todo',
                    });
                }

            }},
            {label: 'Quit' ,
             click: () => {app.quit()},
             accelerator: (()=>{
                if(os.platform() === 'darwin') {
                    return 'Command+Q';
                } else {
                    return 'Ctrl+Q';
                }
             })() // use an imediately invoked frunction for best practices

            }
        ]
    }
]
app.disableHardwareAcceleration() //
app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        webPreferences :{
            contextIsolation: false,
            preload: __dirname + '/preload.js'
        }
    })
    mainWindow.loadFile(__dirname + '/pages/main.html');
    if(os.platform() === 'darwin') {
        menuTemplate.unshift({label: app.name});
    }

    if(process.env.ENVIRONMENT === 'development') {
        menuTemplate.push({
            label: 'Developers Options',
            submenu:[
                {
                    label: 'Reload',
                    accelerator: (()=>{
                        if(os.platform() === 'darwin') {
                            return 'Command+R';
                        } else {
                            return 'Ctrl+R';
                        }
                    })(),
                    click: (_,foccusedWindow) => {
                        foccusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: (()=>{
                        if(os.platform() === 'darwin') {
                            return 'Command+Alt+I';
                        } else {
                            return 'Ctrl+Shift+I';
                        }
                    })(),
                    click: (_,foccusedWindow) => {
                        foccusedWindow.webContents.toggleDevTools();
                    }
                }

            ]
        })
    }
    const mainMenue = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenue)
    mainWindow.on('closed',() => app.quit());
})