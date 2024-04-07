import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import PeopleWithAccess from '@/models/peoplewithaccess'

export async function POST(req:Request){
    try {
        const { _id, roomName } = await req.json();
        await connectMongoDB()
        await PeopleWithAccess.findByIdAndDelete(_id)
        let document = await Document.findOne({roomName})
        await document.share.peoplewithaccess.pull(_id)
        await document.save()
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}