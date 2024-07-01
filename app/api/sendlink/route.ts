import {NextResponse } from 'next/server'
import SendLink from '@/mailers/sendlink'
import { z } from "zod"

const inputTypes = z.object({
    from : z.string().email(),
    to : z.string().email(),
    msg : z.string(),
    roomName : z.string()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }

        SendLink(parsedInput.data.from, parsedInput.data.to, parsedInput.data.msg, parsedInput.data.roomName)
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}