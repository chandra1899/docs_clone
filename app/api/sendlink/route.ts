import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import User from '@/models/user'
import SendLink from '@/mailers/sendlink'

export async function POST(req:Request){
    try {
        const {from, to, msg, roomName}=await req.json()
        SendLink(from, to, msg, roomName)
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}