import jsonData from "../../db.json"

const DB_NAME = "hsi_db";
const DB_VERSION = 1;

const COLLECTIONS_TO_PERSIST = ["doctors", "services", "users", "appointments"];

const useDatabase = (collection) => {
    const findAll = () => {
        return buildPromise("find", []);
    };

    const findBy = (predicate) => {
        return buildPromise("findBy", predicate);
    }

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

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                populate(db);
            };
        
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
                    case "findBy":
                        operationRequest = store.getAll();
                        operationRequest.onsuccess = () => resolve(operationRequest.result.filter(data));
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
        });
    }; 

    const onError = (event, message, reject) => {
        console.error(message, event);
        reject(event);
    };

    const populate = (db) => {
        for (const table of COLLECTIONS_TO_PERSIST) {
            if (!db.objectStoreNames.contains(table)) {
                const store = db.createObjectStore(table, { keyPath: "id" });
                for (const item of jsonData[table]) {
                    store.add(item);
                }
            }
        }
    };

   return { insert, findAll, findBy, update, remove };
};

export default useDatabase;