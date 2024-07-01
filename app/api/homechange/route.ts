import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import { z } from "zod"

const inputTypes = z.object({
    generalaccessValue : z.enum(["Restricted", "In this Organisation", "AnyOne with link"]),
    generalaccessRole : z.enum(["Viewer", "Editor"]),
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
        let document = await Document.findOne({roomName : parsedInput.data.roomName})
        document.share.generalaccess.value = parsedInput.data.generalaccessValue
        document.share.generalaccess.role = parsedInput.data.generalaccessRole
        await document.save();
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}