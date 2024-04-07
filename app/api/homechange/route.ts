import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import User from '@/models/user'

export async function POST(req:Request){
    try {
        const {generalaccess, roomName}=await req.json()
        
        await connectMongoDB()
        let document = await Document.findOne({roomName})
        document.share.generalaccess = generalaccess
        await document.save();
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}