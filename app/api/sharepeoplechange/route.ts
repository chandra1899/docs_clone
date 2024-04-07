import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import Peoplewithaccess from '@/models/peoplewithaccess'

export async function POST(req:Request){
    try {
        const {role, expirationOn, expirationDate, _id}=await req.json()
        console.log('role', role);
        console.log('expirationOn', expirationOn);
        console.log('expirationDate', expirationDate);
        console.log('_id', _id);
        
        
        await connectMongoDB()
        let peoplewithaccess = await Peoplewithaccess.findById(_id)
        peoplewithaccess.role = role
        peoplewithaccess.expirationOn = expirationOn
        peoplewithaccess.expirationDate = expirationDate
        await peoplewithaccess.save()
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}