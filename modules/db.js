const DB_NAME = "DexLinkDB";
const DB_VERSION = 1;
const USER_STORE = "users";

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(USER_STORE)) {
                db.createObjectStore(USER_STORE, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = e => {
            resolve(e.target.result);
        };

        request.onerror = e => {
            reject(e.target.error);
        };
    });
}

async function createUser(user) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(USER_STORE, "readwrite");
        const store = tx.objectStore(USER_STORE);

        // Checking if username exists already
        const indexRequest = store.openCursor();
        let exists = false;

        indexRequest.onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                if (cursor.value.username === user.username) {
                    exists = true;
                    reject(new Error("User already exists"));
                    return;
                }
                cursor.continue();
            } else {
                if (!exists) {
                    store.add(user);
                    tx.oncomplete = () => resolve();
                    tx.onerror = () => reject(tx.error);
                }
            }
        };

        indexRequest.onerror = function() {
            reject(indexRequest.error);
        };
    });
}

async function getUser(username, password){
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(USER_STORE, "readonly");
        const store = tx.objectStore(USER_STORE);
        const cursorRequest = store.openCursor();

        cursorRequest.onsuccess = e => {
            const cursor = e.target.result;
            if(cursor){
                if(cursor.value.username === username && cursor.value.password === password){
                    resolve(cursor.value);
                    return;
                }
                cursor.continue();
            } else {
                reject(alert("Invalid Username or Password"));
            }
        };

        cursorRequest.onerror = e => {
            reject(cursorRequest.error);
        }
    });
}
export { openDatabase, createUser, getUser};