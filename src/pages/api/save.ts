import type { NextApiRequest, NextApiResponse } from 'next'
const { GoogleSpreadsheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const fromBase64 = (value:any) =>{
    const buff = new Buffer(value,'base64')
    return buff.toString('ascii')
}

const handler =  async(req:any, res:any) =>{
    try{
        await doc.useServiceAccountAuth({
            client_email:process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo()

        const data = JSON.parse(req.body)
        console.log(req.body)

        // console.log('titulo',doc.title)

        const sheet = doc.sheetsByIndex[0]
        await sheet.loadCells('A2:M1')
        // console.log('titulo de: ',sheet.title)

        // const cliente = sheet.getCell(0, 12)
        // console.log('valor da celula: ',cliente.value)

        await sheet.addRow({
           nome:data.nome,
           sobrenome:data.sobrenome,
           cpf:data.cpf,
           ddd:data.ddd,
           telefone:data.telefone,
           nascimento:data.nascimento,
           cep:data.cep,
           logradouro:data.logradouro,
           bairro:data.bairro,
           localidade:data.localidade,
           numero:data.numero,
           uf:data.uf
        })
        console.log('Requisição: ',res.end(req.body))
        res.end(req.body)
    }catch(err){
        console.log('Error: ', err)
    }
}

export default handler