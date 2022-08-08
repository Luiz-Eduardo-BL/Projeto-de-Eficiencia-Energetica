import db from '../database/index.js'

export default {

    async create(request, response) {
        response.set('Access-Control-Allow-Origin', '*')
        const {
            sala,//nome ou numeracao da sala
            comprimento,//comprimento da sala
            largura,//largura da sala
            distanciaPlanoDeTrabalhoTeto, //distancia do plano de trabalho ate o teto
            potenciaLampada,//potencia da lampada
            qntdLampadas,//quantidade de lampadas
        } = request.body

        await db.collection('salas')
            .add({
                sala,
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
        const { sala } = request.query
        await db.collection('salas')
            .where('sala', '==', sala)
            .get()
            .then(snapshot => {
                let salaInfo = {}
                snapshot.forEach(doc => {
                    salaInfo = {
                        sala: doc.data().sala,
                        comprimento: doc.data().comprimento,
                        largura: doc.data().largura,
                        distanciaPlanoDeTrabalhoTeto: doc.data().distanciaPlanoDeTrabalhoTeto,
                        potenciaLampada: doc.data().potenciaLampada,
                        qntdLampadas: doc.data().qntdLampadas
                    }
                })
                return response.json({qrCodeSala:`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${JSON.stringify(salaInfo).replace(/"([^"]+)":/g, '$1:').replaceAll("\"", "'")}`})
            }
            )
            .catch((err) => {
                response.status(404).json({ error: err })
            }
            )

    }
}