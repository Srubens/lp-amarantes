import type { NextApiRequest, NextApiResponse } from 'next'

const handler =  async(req:NextApiRequest, res:NextApiResponse) =>{
    try{
        console.log('Requisição: ',res.end(req.body))
    }catch(err){
        console.log('Error: ', err)
    }
}

export default handler