let db;

const request = window.indexedDB.open("budgetIndexDB", 1);

request.onerror = event => {
    console.log(`Error: ${event.target.errorCode}`)
};

request.onsuccess = event => {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onupgradeneeded = event => {
    db = event.target.result;

    db.createObjectStore("budgetIndexDB", {
        keyPath: "transactionID",
        autoIncrement: true
    });
};



const checkDatabase = () => {


};

const saveRecord = () => {


}