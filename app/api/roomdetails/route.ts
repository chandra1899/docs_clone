import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import PeopleWithAccess from '@/models/peoplewithaccess'
import { z } from "zod"

const inputTypes = z.object({
    roomName : z.string()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }

        await connectMongoDB()
        const document = await Document.findOne({ roomName : parsedInput.data.roomName})
        .populate('ownedBy', '-password').select('-content');
        let getpeoplewithaccess = await PeopleWithAccess.find({roomName : parsedInput.data.roomName})
        .populate('user', '-password')
        
        return NextResponse.json({document, getpeoplewithaccess},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}