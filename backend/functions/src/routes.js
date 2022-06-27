import { Router } from "express";
import EficienciaController from "./controllers/EficienciaController.js";

const routes = Router()

routes.get("/eficiencia", EficienciaController.index)
routes.post("/eficienciaResultado", EficienciaController.result)

export default routes
