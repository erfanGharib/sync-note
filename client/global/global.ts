import axios from "axios"
import { baseurl } from "./baseurl"

export const _axios = axios.create({
    baseURL: baseurl,
})
export const apiEndpoints = {
    notes: {
        'get': '/notes',
        'create': '/notes/create',
        'edit': '/notes/edit',
        'delete': '/notes/delete',
    },
    commands: '/commands',
    isServerUp: '/is-server-up',
}