import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import PeopleWithAccess from '@/models/peoplewithaccess';
import { z } from "zod"

const inputTypes = z.object({
    roomName : z.string()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }

        await connectMongoDB()
        await Document.findOneAndDelete({ roomName : parsedInput.data.roomName })
        await PeopleWithAccess.deleteMany({ roomName : parsedInput.data.roomName })
        
        return NextResponse.json({message : "succesfully deleted docs"},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}