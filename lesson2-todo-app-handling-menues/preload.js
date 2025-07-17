const { contextBridge } = require('electron/renderer');

contextBridge.exposeInMainWorld('electron', {
    'electron': require('electron'),
    'os': require('node:os'),
});