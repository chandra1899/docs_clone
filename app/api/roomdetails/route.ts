import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
// import PeopleWithAccess from '@/models/peoplewithaccess'

export async function POST(req:Request){
    try {
        const { roomName } = await req.json();
        console.log("roomame", roomName);
        await connectMongoDB()
        const document = await Document.findOne({ roomName })
        .populate('ownedBy', '-password')
        .populate({
            path : 'share.peoplewithaccess',
            populate : {
                path : 'user',
                select : '-password'
            }
        })
        // console.log(await PeopleWithAccess.find());
        
        console.log(document);
        
        return NextResponse.json({document},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}