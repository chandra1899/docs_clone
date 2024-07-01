import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import { z } from "zod"

const inputTypes = z.object({
    roomName : z.string(),
    content : z.any()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }
        
        await connectMongoDB()
        const document = await Document.findOneAndUpdate({ roomName : parsedInput.data.roomName }, { content : parsedInput.data.content }) 
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}