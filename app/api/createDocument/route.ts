import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import User from '@/models/user'

export async function POST(req:Request){
    try {
        const {email,roomName}=await req.json()
        // console.log("email", email);
        // console.log("roomName", roomName);
        let user = await User.findOne({email})
        // console.log(user);
        
        if(!user) return ;
        await connectMongoDB()
        let document = await Document.create({
            roomName,
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