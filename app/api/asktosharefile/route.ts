import {NextResponse } from 'next/server'
import Requesttoaddemail from '@/mailers/requesttoaddemail'
import { z } from 'zod'

const inputypes = z.object({
    from : z.string().email(),
    to : z.string().email(),
    msg : z.string(),
    roomName : z.string(),
    email : z.string().email()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }
        Requesttoaddemail(parsedInput.data.from, parsedInput.data.to, parsedInput.data.msg, parsedInput.data.roomName, parsedInput.data.email)
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}