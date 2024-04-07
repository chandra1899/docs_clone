import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import User from '@/models/user'

export async function POST(req:Request){
    try {
        const {s1, s2, roomName}=await req.json()
        let document = await Document.findOne({roomName})
        document.settings.s1 = s1;
        document.settings.s2 = s2;
        await document.save()
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}