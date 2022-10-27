import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "firebase/storage";
import {config} from "dotenv";
config()

// Le pasamos las credenciales privadas de nuestro storage
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

// Inicializamos nuestro storage
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

async function listAllDocsFromThisFolder(folder) {
    // Obtiene las referencias del storage en la carpeta dada
    const listRef = ref(storage, folder);
    const links = []
    
    // Lista todas las referencias del storage a ser iterables
    const res = await listAll(listRef);
    for(const itemRef of res.items) {
        const url = await getDownloadURL(itemRef); // Obtiene las URL de los documentos
        links.push(url);
    }

    return links; // Retorna los enlaces de descarga de todos los documentos de la carpeta dada
}

export { listAllDocsFromThisFolder }
