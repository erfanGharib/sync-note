export const fireDataFetchedEvent = () => 
    document.dispatchEvent(new CustomEvent('dataFetched'));
