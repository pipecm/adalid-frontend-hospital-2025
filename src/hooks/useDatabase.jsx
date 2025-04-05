import jsonData from "../../db.json"

const DB_NAME = "hsi_db";
const DB_VERSION = 1;

const useDatabase = (collection) => {
    const findAll = () => {
        return buildPromise("find", []);
    };

    const insert = (data) => {
        return buildPromise("insert", data);
    }

    const update = (data) => {
        return buildPromise("update", data);
    };

    const remove = (id) => {
        return buildPromise("delete", id);
    };

    const buildPromise = (operation, data) => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
        
            request.onerror = (event) => onError(event, "Error abriendo IndexedDB", reject);
        
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(collection, operation === "find" ? "readonly" : "readwrite");
                const store = transaction.objectStore(collection);
        
                let operationRequest;
                switch (operation) {
                    case "insert": 
                        operationRequest = store.add(data);
                        operationRequest.onsuccess = () => resolve("Datos insertados exitosamente");
                        break;
                    case "find":
                        operationRequest = store.getAll();
                        operationRequest.onsuccess = () => resolve(operationRequest.result);
                        break;
                    case "update":
                        operationRequest = store.put(data);
                        operationRequest.onsuccess = () => resolve("Datos actualizados exitosamente");
                        break;
                    case "delete":
                        operationRequest = store.delete(data);
                        operationRequest.onsuccess = () => resolve("Datos borrados exitosamente");
                        break;
                    default:
                        throw new Error("Operación no válida");
                }
        
                operationRequest.onerror = (event) => onError(event, "Se ha producido un error", reject);
            };
        
            request.onupgradeneeded = createCollection; 
        });
    };

    const createCollection = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(collection)) {
            const store = db.createObjectStore(collection, { keyPath: "id" });
            for (const item of jsonData[collection]) {
                store.add(item);
            }
        }
    };

    const onError = (event, message, reject) => {
        console.error(message, event);
        reject(event);
    }

   return { insert, findAll, update, remove };
};

export default useDatabase;