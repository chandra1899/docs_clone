import {NextResponse } from 'next/server'
import Document from '@/models/document'
import { z } from "zod"

const inputTypes = z.object({
    s1 : z.boolean(),
    s2 : z.boolean(),
    roomName : z.string()
})

export async function POST(req:Request){
    try {
        const body=await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }
        let document = await Document.findOne({roomName : parsedInput.data.roomName})
        document.settings.s1 = parsedInput.data.s1;
        document.settings.s2 = parsedInput.data.s2;
        await document.save()
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}