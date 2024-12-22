export const debounce = (func : (...args: any[]) => void, delay: number) => {
    let timeout: any = null;
    return (...args : any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay)
    }
}