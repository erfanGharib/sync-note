import { _axios, apiEndpoints } from '../../global/global';
import { offlineModeStore } from "../store/offlineMode";

export const isServerUp = async () => {
    const offlineMode = offlineModeStore();

    return new Promise((resolve) => {
        _axios.get(apiEndpoints.isServerUp)
        .then(() => {
            offlineMode.changeMode(false)
            resolve(true)
        })
        .catch(() => {
            offlineMode.changeMode(true)
            resolve(false)
        })
    })
}