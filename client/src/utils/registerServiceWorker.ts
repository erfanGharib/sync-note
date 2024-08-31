export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        const serviceWorkerPath = '/cache-page.js';
        window.addEventListener('load', async () => {
            const registeredWorkers = await navigator.serviceWorker.getRegistrations()
            let index = 0;
    
            do {
                const registeredWorker = registeredWorkers[index];
    
                if(registeredWorker && registeredWorker?.active.scriptURL.includes(serviceWorkerPath)) return;
        
                navigator.serviceWorker.register(serviceWorkerPath)
                    .then(() => console.log(`${serviceWorkerPath}: Registered Successfully.`))
                    .catch((err) => console.error(`${serviceWorkerPath}: Failed To Register ServiceWorker.`, err))
                
                index++;
            }
            while(index < registeredWorkers.length);
        })
    }
}