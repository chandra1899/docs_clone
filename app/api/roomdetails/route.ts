import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import PeopleWithAccess from '@/models/peoplewithaccess'

export async function POST(req:Request){
    try {
        const { roomName } = await req.json();
        await connectMongoDB()
        const document = await Document.findOne({ roomName })
        .populate('ownedBy', '-password').select('-content');
        let getpeoplewithaccess = await PeopleWithAccess.find({roomName})
        .populate('user', '-password')
        
        return NextResponse.json({document, getpeoplewithaccess},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}