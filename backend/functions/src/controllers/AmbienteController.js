import db from '../database/index.js'

export default {

    async create(request, response) {
        response.set('Access-Control-Allow-Origin', '*')
        const {
            pavimento,//pavimento
            ambiente,//nome ou numeracao da ambiente
            comprimento,//comprimento da ambiente
            largura,//largura da ambiente
            distanciaPlanoDeTrabalhoTeto, //distancia do plano de trabalho ate o teto
            potenciaLampada,//potencia da lampada
            qntdLampadas,//quantidade de lampadas
        } = request.body

        await db.collection('ambientes')
            .add({
                pavimento,
                ambiente,
                comprimento,
                largura,
                distanciaPlanoDeTrabalhoTeto,
                potenciaLampada,
                qntdLampadas
            }) 
            .then(() => response.status(204).send())//nao tem conteudo para exibir
            .catch(() => response.status(404).send())
    },
    async indexQrCode(request, response) {
        response.set('Access-Control-Allow-Origin', '*')
        const { ambiente, pavimento } = request.query
        await db.collection('ambientes')
            .where('pavimento', '==', pavimento)
            .where('ambiente', '==', ambiente)
            .get()
            .then(snapshot => {
                let ambienteInfo = {}
                snapshot.forEach(doc => {
                    ambienteInfo = {
                        pavimento: doc.data().pavimento,
                        ambiente: doc.data().ambiente,
                        comprimento: doc.data().comprimento,
                        largura: doc.data().largura,
                        distanciaPlanoDeTrabalhoTeto: doc.data().distanciaPlanoDeTrabalhoTeto,
                        potenciaLampada: doc.data().potenciaLampada,
                        qntdLampadas: doc.data().qntdLampadas
                    }
                })
                return response.json({qrCodeAmbiente:`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${JSON.stringify(ambienteInfo).replace(/"([^"]+)":/g, '$1:').replaceAll("\"", "'")}`})
            }
            )
            .catch((err) => {
                response.status(404).json({ error: err })
            }
            )

    }
}