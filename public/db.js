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

    db.createObjectStore("budgetStore", {
        keyPath: "transactionID",
        autoIncrement: true
    });
};



const checkDatabase = () => {
    let transaction = db.transaction(["budgetStore"], "readwrite");

    const store = transaction.objectStore("budgetStore");

    const getStore = store.getAll();

    getStore.onsuccess = async () => {
        try {
            if (getStore.result.length > 0) {

                const response = await fetch('/api/transaction/bulk', {
                    method: 'POST',
                    body: JSON.stringify(getAll.result),
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (data.length !== 0) {
                    transaction = db.transaction(["budgetStore"], "readwrite");

                    const newStore = transaction.objectStore("budgetStore");
                    newStore.clear();
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
};

const saveRecord = () => {


}