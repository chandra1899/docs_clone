import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'

export async function POST(req:Request){
    try {
        const {newName, roomName}=await req.json()
        // console.log("newName", newName);
        
        await connectMongoDB()
        const document = await Document.findOneAndUpdate({ roomName }, {documentName : newName}) 
        return NextResponse.json({newName},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}