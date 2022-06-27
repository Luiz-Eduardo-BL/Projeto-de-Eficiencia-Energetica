import functions from 'firebase-functions'
import express from 'express';
import routes from "./src/routes.js";

const app = express();
app.use(express.json());
app.use(routes);

export const api = functions.https.onRequest(app);
