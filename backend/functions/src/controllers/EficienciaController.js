import db from '../database/index.js'
import moment from 'moment-timezone'


export default {

    async index(request, response) {
        response.set('Access-Control-Allow-Origin', '*')

        await db.collection('eficiencia')
            .orderBy('indiceK', 'asc').get()
            .then(snapshot => {
                let eficiencia = []
                snapshot.forEach(doc => {
                    eficiencia.push({
                        indiceK: doc.data().indiceK,
                        nivelA: doc.data().nivelA,
                        nivelB: doc.data().nivelB,
                        nivelC: doc.data().nivelC,
                        nivelD: doc.data().nivelD

                    })
                })
                return response.json(eficiencia)
            })
            .catch((err) => {
                response.status(404).json({ error: err })
            })
    },

    async create(request, response) {// usar somente se não tiver a tabela de eficiencia no banco
        response.set('Access-Control-Allow-Origin', '*')
        const tabelaEficiencia = [
            {
                "indiceK": 0.6,
                "nivelA": 2.84,
                "nivelB": 4.77,
                "nivelC": 5.37,
                "nivelD": 6.92
            },
            {
                "indiceK": 0.8,
                "nivelA": 2.5,
                "nivelB": 3.86,
                "nivelC": 4.32,
                "nivelD": 5.57
            },
            {
                "indiceK": 1,
                "nivelA": 2.27,
                "nivelB": 3.38,
                "nivelC": 3.77,
                "nivelD": 4.86
            },
            {
                "indiceK": 1.25,
                "nivelA": 2.12,
                "nivelB": 3,
                "nivelC": 3.34,
                "nivelD": 4.31
            },
            {
                "indiceK": 1.5,
                "nivelA": 1.95,
                "nivelB": 2.75,
                "nivelC": 3,
                "nivelD": 3.9
            },
            {
                "indiceK": 2,
                "nivelA": 1.88,
                "nivelB": 2.53,
                "nivelC": 2.77,
                "nivelD": 3.57
            },
            {
                "indiceK": 2.5,
                "nivelA": 1.83,
                "nivelB": 2.38,
                "nivelC": 2.57,
                "nivelD": 3.31
            },
            {
                "indiceK": 3,
                "nivelA": 1.76,
                "nivelB": 2.27,
                "nivelC": 2.46,
                "nivelD": 3.17
            },
            {
                "indiceK": 4,
                "nivelA": 1.73,
                "nivelB": 2.16,
                "nivelC": 2.33,
                "nivelD": 3
            },
            {
                "indiceK": 5,
                "nivelA": 1.71,
                "nivelB": 2.09,
                "nivelC": 2.24,
                "nivelD": 2.89
            }
        ]

        for (let i = 0; i < tabelaEficiencia.length; i++) {
            await db.collection('eficiencia').add({
                indiceK: tabelaEficiencia[i].indiceK,
                nivelA: tabelaEficiencia[i].nivelA,
                nivelB: tabelaEficiencia[i].nivelB,
                nivelC: tabelaEficiencia[i].nivelC,
                nivelD: tabelaEficiencia[i].nivelD
            })
        }
        return response.json({ message: "Tabela de Eficiencia cadastrada com sucesso" })

    },


    async result(request, response) {
        response.set('Access-Control-Allow-Origin', '*')

        let dataLeitura = moment.tz("America/Sao_Paulo").format("YYYY-MM-DD") //data atual em que ocorreu a leitura na sala

        //console.log(dataAtual)

        const { sala, largura, comprimento, distanciaPlanoDeTrabalhoTeto, potenciaLampada, qntdLampadas, iluminanciaMediaFinal, aparelho } = request.body

        const area = largura * comprimento
        const potenciaTotal = potenciaLampada * qntdLampadas
        const indiceK = area / (distanciaPlanoDeTrabalhoTeto * (comprimento + largura))
        //console.log(indiceK)
        let classificacao = ""

        //if(aparelho.toLowerCase().includes("samsung")){

        // }

        await db.collection('eficiencia')
            .orderBy('indiceK', 'asc').get()
            .then(async snapshot => {
                let difAux = 0
                let eficienciaAux = []
                let countAux = 0
                let pos = 0
                snapshot.forEach(doc => {
                    eficienciaAux.push({
                        nivelA: doc.data().nivelA,
                        nivelB: doc.data().nivelB,
                        nivelC: doc.data().nivelC,
                        nivelD: doc.data().nivelD
                    })
                    if (countAux == 0)
                        difAux = Math.abs(doc.data().indiceK - indiceK)
                    else if (Math.abs(doc.data().indiceK - indiceK) < difAux) {
                        difAux = Math.abs(doc.data().indiceK - indiceK)
                        pos = countAux //posição do nivel k mais próximo
                    }

                    countAux++
                })


                let eficiencia = eficienciaAux[pos]

                let densidadePotIluminacaoRelativa = potenciaTotal * 100 / (area * iluminanciaMediaFinal)

                if (densidadePotIluminacaoRelativa <= eficiencia.nivelA) {
                    classificacao = "A"
                }
                else if (densidadePotIluminacaoRelativa <= eficiencia.nivelB) {
                    classificacao = "B"
                }
                else if (densidadePotIluminacaoRelativa <= eficiencia.nivelC) {
                    classificacao = "C"
                }
                else if (densidadePotIluminacaoRelativa <= eficiencia.nivelD) {
                    classificacao = "D"
                }
                else {
                    classificacao = "E"
                }


                await db.collection('historico')
                    .where('sala', "==", sala)
                    .where('dataLeitura', "==", dataLeitura)
                    .get()
                    .then(async snapshot => {

                        if (snapshot.empty) {

                            await db.collection('historico').add({
                                sala,
                                iluminanciaMediaFinal,
                                classificacao,
                                indiceK,
                                densidadePotIluminacaoRelativa,
                                aparelho,
                                dataLeitura
                            }).then(() => {
                                response.json({ classificacao, indiceK, densidadePotIluminacaoRelativa })
                            }).catch(err => {
                                response.status(404).json({ error: err })
                            })
                        }
                        else {
                            await db.collection('historico')
                                .doc(snapshot.docs[0].id)//pega o id do documento que tem a data atual (o primeiro da query)
                                .update({
                                    iluminanciaMediaFinal,
                                    classificacao,
                                    indiceK,
                                    densidadePotIluminacaoRelativa,
                                    aparelho,
                                    dataLeitura
                                }).then(() => {
                                    response.json({ classificacao, indiceK, densidadePotIluminacaoRelativa })
                                }).catch(err => {
                                    response.status(404).json({ error: err })
                                })

                        }
                    }).catch(err => {
                        response.status(404).json({ error: err })
                    })
            })
            .catch((err) => {
                response.status(404).json({ error: err })
            })


    }
}