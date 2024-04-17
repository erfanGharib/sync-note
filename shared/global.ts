import axios from "axios"

export const serverAddress = {
    port: 5000,
    hostname: '192.168.1.70'
}
export const clientAddress = {
    port: 5173,
    hostname: '192.168.1.70'
}
export const apiBaseUrl = 'https://192.168.1.70:5000'
export const notesFolderPath = 'C:/Users/TOP/Documents/sync-notes/'

export const apiEndpoints = {
    notes: {
        'get': '/notes',
        'create': '/notes/create',
        'edit': '/notes/edit',
        'delete': '/notes/delete',
    },
    openNotesFolder: '/open-notes-folder'
}
export const _axios = axios.create({
    baseURL: apiBaseUrl
})