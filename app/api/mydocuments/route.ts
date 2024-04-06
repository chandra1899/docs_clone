import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import User from '@/models/user'

export async function POST(req:Request){
    try {
        const {email}=await req.json()
        
        await connectMongoDB()
        let user = await User.findOne({email})
        console.log(user._id);
        
        const documents = await Document.find({
            ownedBy : user._id
            //shared with you
        }) 
        console.log(documents);
        
        return NextResponse.json({documents},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}