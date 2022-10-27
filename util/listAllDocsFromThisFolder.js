import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "firebase/storage";
import {config} from "dotenv";
config()

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

async function listAllDocsFromThisFolder(folder) {
    const listRef = ref(storage, folder);
    const links = []

    const res = await listAll(listRef);
    for(const itemRef of res.items) {
        const url = await getDownloadURL(itemRef);
        links.push(url);
    }

    return links;
}

export { listAllDocsFromThisFolder }