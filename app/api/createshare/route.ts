import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import PeopleWithAccess from '@/models/peoplewithaccess'
import User from '@/models/user'
import Document from '@/models/document'

export async function POST(req:Request){
    try {
        const {email,role,expirationOn,expirationDate, roomName}=await req.json()
        await connectMongoDB()
        let user = await User.findOne({email})
        if(!user) return NextResponse.json({message:'email not found'},{status:404})
        let people = await PeopleWithAccess.create({
            user : user._id,
            roomName,
            role,
            expirationOn,
            expirationDate
        })
        let document = await Document.findOne({roomName})
        document.share.peoplewithaccess.push(people._id)
        await document.save()
        people = await people.populate({
            path : 'user',
            select : '-password'
        })
        console.log(people);
        
        
        return NextResponse.json({people},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}