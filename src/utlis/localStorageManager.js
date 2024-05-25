export const KEY_ACCESS_TOKEN = "access_token"




export function getItem(Key) {
    return localStorage.getItem(Key);
}

export function setItem(key , value){
    localStorage.setItem(key, value);
}

export function removeItem(key) {
    localStorage.removeItem(key);
}