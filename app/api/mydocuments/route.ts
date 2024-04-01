import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'

export async function POST(req:Request){
    try {
        const {email}=await req.json()
        console.log('hello');
        
        await connectMongoDB()
        const documents = await Document.find({
            ownedBy : email
            //shared with you
        }) 
        return NextResponse.json({documents},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}