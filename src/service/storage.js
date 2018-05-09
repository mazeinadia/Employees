const DB_NAME = 'employeesDB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'employeesStore';

var db;

function testBrowser() {
    if (!window.indexedDB) {
        window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
    }
}

function openDB() {
    console.log("openDB...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (ev) {
        db = this.result;
        console.log("DB opened");
    };
    req.onerror = function (ev) {
        console.error("openDB: ", ev.target.errorCode);
    };

    req.onupgradeneeded = function (ev) {
        console.log("openDB upgadeneeded");
        var thisDB = ev.target.result;
        if (thisDB.objectStoreNames.contains((DB_STORE_NAME))) {
            var store = thisDB.createObjectStore(DB_STORE_NAME,
                {keyPath: 'id', autoIncrement: true});
            store.createIndex('name', 'name', {unique: false});
        }
    }
};

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}


function addEmployee(name, date, position, department, phone, email) {
    var employee = {
        name: name,
        date: date,
        position: position,
        department: department,
        phone: phone,
        email: email
    };

    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;
    try {
        req = store.add(employee);
    }catch (e) {
        if (e.name === 'DataCloneError')
            console.error("This engine doesn't know how to clone a Blob, " +
                "use Firefox");
        throw e;
    }
    req.onsuccess = function (ev) {
        console.log("Insertion in DB successful");
    };
    req.onerror = function() {
        console.error("addPublication error", this.error);
    };
}

function deleteEmployee(key, store) {
    if (typeof store === 'undefined'){
        store = getObjectStore(DB_STORE_NAME, 'readwrite');
    }
    
    var req = store.get(key);
    req.onsuccess = function (ev) {
        var record = evt.target.result;
        console.log("record:", record);
        if (typeof record === 'undefined') {
            console.warn("No matching record found");
            return;
        }
        req = store.delete(key);
        req.onsuccess = function(ev) {
            console.log("Deletion successful");
        };
        req.onerror = function (evt) {
            console.error("deletePublication:", evt.target.errorCode);
        };
    };
    req.onerror = function (evt) {
        console.error("deletePublication:", evt.target.errorCode);
    };
}