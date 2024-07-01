import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import User from '@/models/user'
import { z } from "zod"

const inputTypes = z.object({
    email : z.string().email(),
    roomName : z.string()
})

export async function POST(req:Request){
    try {
        const body=await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }
        let user = await User.findOne({email : parsedInput.data.email})
        if(!user) return ;
        await connectMongoDB()
        let document = await Document.create({
            roomName : parsedInput.data.roomName,
            ownedBy : user?._id,
            content : "This is a new Document",
            documentName : "Untitled Document"
        })
        
        return NextResponse.json({documentId : document?._id},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}