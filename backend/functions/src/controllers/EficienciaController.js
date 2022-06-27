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
        .catch((err) => {response.status(404).json({error: err})})
    },

    async result(request, response) {
        response.set('Access-Control-Allow-Origin', '*')
        const { indiceK, area, potenciaTotal, iluminanciaMediaFinal} = request.body

        await db.collection('eficiencia')
        .where('indiceK', '>=', indiceK)
        .orderBy('indiceK', 'asc').get()
        .then(snapshot => {
            let eficiencia = []
            snapshot.forEach(doc => {
                eficiencia.push({
                    nivelA: doc.data().nivelA,
                    nivelB: doc.data().nivelB,
                    nivelC: doc.data().nivelC,
                    nivelD: doc.data().nivelD
                    
                })
            })
            let analise = eficiencia[0]

            let densidadePotIluminacaoRelativa = potenciaTotal*100/(area*iluminanciaMediaFinal)

            if (densidadePotIluminacaoRelativa <= analise.nivelA) {
                return response.json({
                    classificacao: 'A',
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else if (densidadePotIluminacaoRelativa <= analise.nivelB) {
                return response.json({
                    classificacao: 'B',
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else if (densidadePotIluminacaoRelativa <= analise.nivelC) {
                return response.json({
                    classificacao: 'C',
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else if (densidadePotIluminacaoRelativa <= analise.nivelD) {
                return response.json({
                    classificacao: 'D',
                    dpiRf : densidadePotIluminacaoRelativa
                })
            }
            else{
                return response.json({
                    classificacao: 'E',
                    dpiRf : densidadePotIluminacaoRelativa
                })
            
            }


    })
    .catch((err) => {response.status(404).json({error: err})})
    }
}