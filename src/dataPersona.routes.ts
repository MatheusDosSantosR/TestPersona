import express, {Request, Response} from "express"
import {StatusCodes} from "http-status-codes"
import { generateData } from "./generate.data"

export const dataPersona = express.Router()

dataPersona.get("/TestPerson", async (req : Request, res : Response) => {
    try {
        const generate = await generateData()

        if(!generate){
            return res.status(StatusCodes.NOT_FOUND).json({error : 'Nao foi possivel gerar os dados.'})
        }

        return res.status(StatusCodes.OK).json({data: generate })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})
