import { listAllDocsFromThisFolder } from "./util/listAllDocsFromThisFolder.js";
import express from 'express';

const app = express();
app.get("/", async(_, res) => {
    res.send(await listAllDocsFromThisFolder("Calificaciones"));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Express listening at http://0.0.0.0:${port}`);
});