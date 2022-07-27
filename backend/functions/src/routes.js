import { Router } from "express";
import EficienciaController from "./controllers/EficienciaController.js";
import SalaController from "./controllers/SalaController.js";

const routes = Router()

routes.get("/eficiencia", EficienciaController.index)
routes.post("/eficienciaResultado", EficienciaController.result)

routes.post("/salas",SalaController.create)
routes.get("/salasQrCode",SalaController.indexQrCode)

export default routes
