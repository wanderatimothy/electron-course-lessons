import { contextBridge } from "electron";

contextBridge.executeInMainWorld('electron', {
    'send': (channel, data) => ipcRenderer.send(channel, data),
    'on': (channel, func) => ipcRenderer.on(channel, (event, data) => func(event,data)),
})