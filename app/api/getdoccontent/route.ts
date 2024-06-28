import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'

export async function POST(req:Request){
    try {
        const { roomName } = await req.json();
        // console.log("in get content", roomName);
        await connectMongoDB()
        const document = await Document.findOne({ roomName })
        let contents = document.content
        
        return NextResponse.json({contents},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}