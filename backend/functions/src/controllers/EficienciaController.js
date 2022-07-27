import db from '../database/index.js'

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
            response.status(404).json({error: err})
        })
    },

    async result(request, response) {
        response.set('Access-Control-Allow-Origin', '*')

        const {largura, comprimento,distanciaPlanoDeTrabalhoTeto,potenciaLampada,qntdLampadas,iluminanciaMediaFinal} = request.body

        const area = largura * comprimento
        const potenciaTotal = potenciaLampada * qntdLampadas
        const indiceK = area/(distanciaPlanoDeTrabalhoTeto*(comprimento+largura))

        await db.collection('eficiencia')
        .where('indiceK', '>=', indiceK)
        .orderBy('indiceK', 'asc').get()
        .then(snapshot => {
            let eficiencia = {
                nivelA: snapshot.docs[0].data().nivelA,
                nivelB: snapshot.docs[0].data().nivelB,
                nivelC: snapshot.docs[0].data().nivelC,
                nivelD: snapshot.docs[0].data().nivelD
                
            }

            let densidadePotIluminacaoRelativa = potenciaTotal*100/(area*iluminanciaMediaFinal)

            if (densidadePotIluminacaoRelativa <= eficiencia.nivelA) {
                return response.json({
                    classificacao: 'A',
                    indiceK: indiceK,
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else if (densidadePotIluminacaoRelativa <= eficiencia.nivelB) {
                return response.json({
                    classificacao: 'B',
                    indiceK: indiceK,
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else if (densidadePotIluminacaoRelativa <= eficiencia.nivelC) {
                return response.json({
                    classificacao: 'C',
                    indiceK: indiceK,
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else if (densidadePotIluminacaoRelativa <= eficiencia.nivelD) {
                return response.json({
                    classificacao: 'D',
                    indiceK: indiceK,
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else{
                return response.json({
                    classificacao: 'E',
                    indiceK: indiceK,
                    dpiRf : densidadePotIluminacaoRelativa
                })
            
            }


    })
    .catch((err) => {
        response.status(404).json({error: err})
    })
    }
}