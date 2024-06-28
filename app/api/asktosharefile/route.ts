import {NextResponse } from 'next/server'
import Requesttoaddemail from '@/mailers/requesttoaddemail'

export async function POST(req:Request){
    try {
        const {from, to, msg, roomName, email}=await req.json()
        Requesttoaddemail(from, to, msg, roomName, email)
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}