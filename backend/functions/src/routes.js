import { Router } from "express";
import EficienciaController from "./controllers/EficienciaController.js";
import SalaController from "./controllers/SalaController.js";
import HistoricController from "./controllers/HistoricController.js";

const routes = Router()

routes.get("/eficiencia", EficienciaController.index)
routes.post("/eficiencia",EficienciaController.create)

routes.post("/eficienciaResultado", EficienciaController.result)

routes.post("/salas",SalaController.create)
routes.get("/salasQrCode",SalaController.indexQrCode)

routes.get("/historico",HistoricController.index)

export default routes
