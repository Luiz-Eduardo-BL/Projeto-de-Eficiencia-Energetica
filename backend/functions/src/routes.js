import { Router } from "express";
import EficienciaController from "./controllers/EficienciaController.js";
import AmbienteController from "./controllers/AmbienteController.js";
import HistoricController from "./controllers/HistoricController.js";

const routes = Router()

routes.get("/eficiencia", EficienciaController.index) //retorna a tabela de eficiencia

routes.post("/eficiencia",EficienciaController.create)// Cuidado!!! ===> Usar essa rota somente se não tiver a tabela de eficiencia no banco

routes.post("/eficienciaResultado", EficienciaController.result) //retorna o nivel de eficiencia do ambiente

routes.post("/ambientes",AmbienteController.create) //cria um novo ambiente no banco de dados
routes.get("/ambientesQrCode",AmbienteController.indexQrCode) //retorna o link do qrCode do ambiente

routes.get("/historico",HistoricController.index) //retorna os ultimos 365 registros / 1 ano

export default routes
