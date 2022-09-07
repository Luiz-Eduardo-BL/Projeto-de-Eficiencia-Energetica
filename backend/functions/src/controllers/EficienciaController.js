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

    async result(request, response) {
        response.set('Access-Control-Allow-Origin', '*')

        let dataLeitura = moment.tz("America/Sao_Paulo").format("YYYY-MM-DD") //data atual em que ocorreu a leitura na sala

        //console.log(dataAtual)

        const { sala, largura, comprimento, distanciaPlanoDeTrabalhoTeto, potenciaLampada, qntdLampadas, iluminanciaMediaFinal, aparelho } = request.body

        const area = largura * comprimento
        const potenciaTotal = potenciaLampada * qntdLampadas
        const indiceK = area / (distanciaPlanoDeTrabalhoTeto * (comprimento + largura))
        console.log(indiceK)
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
                    .where('dataLeitura',"==", dataLeitura)
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