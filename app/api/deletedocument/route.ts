import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import PeopleWithAccess from '@/models/peoplewithaccess';

export async function POST(req:Request){
    try {
        const { roomName } = await req.json();
        // console.log("in get content", roomName);
        await connectMongoDB()
        await Document.findOneAndDelete({ roomName })
        await PeopleWithAccess.deleteMany({ roomName })
        
        return NextResponse.json({message : "succesfully deleted docs"},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}