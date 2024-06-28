import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import PeopleWithAccess from '@/models/peoplewithaccess'

export async function POST(req:Request){
    try {
        const {role, expirationOn, expirationDate, _id}=await req.json()
        await connectMongoDB()
        let peoplewithaccess = await PeopleWithAccess.findById(_id)
        peoplewithaccess.role = role
        peoplewithaccess.expirationOn = expirationOn
        peoplewithaccess.expirationDate = expirationDate
        await peoplewithaccess.save()
        
        return NextResponse.json({role, expirationOn, expirationDate, _id},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}