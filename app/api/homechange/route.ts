import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'

export async function POST(req:Request){
    try {
        const {generalaccessValue, generalaccessRole, roomName}=await req.json()
        
        await connectMongoDB()
        let document = await Document.findOne({roomName})
        document.share.generalaccess.value = generalaccessValue
        document.share.generalaccess.role = generalaccessRole
        await document.save();
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}