import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import PeopleWithAccess from '@/models/peoplewithaccess'
import { z } from "zod"

const inputTypes = z.object({
    _id : z.any(),
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
        await PeopleWithAccess.findByIdAndDelete(parsedInput.data._id)
        let document = await Document.findOne({roomName : parsedInput.data.roomName})
        await document.share.peoplewithaccess.pull(parsedInput.data._id)
        await document.save()
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}