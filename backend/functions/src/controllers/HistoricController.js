import db from '../database/index.js'
import moment from 'moment-timezone'

export default {

    async index(request, response) {
        response.set('Access-Control-Allow-Origin', '*')

        await db.collection('historico')
            .orderBy('dataLeitura', 'desc')
            .limit(365)//retorna os ultimos 365 registros / 1 ano
            .get()
            .then(snapshot => {
                let historico = []
                snapshot.forEach(doc => {
                    historico.push({
                        dataLeitura: moment(doc.data().dataLeitura).tz('America/Sao_Paulo').format('DD-MM-YYYY'),
                        densidadePotIluminacaoRelativa: doc.data().densidadePotIluminacaoRelativa
                    })
                })
                return response.json(historico)
            })
            .catch((err) => {
                response.status(404).json({ error: err })
            })
    }
}