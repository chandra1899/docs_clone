import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import PeopleWithAccess from '@/models/peoplewithaccess'
import { z } from "zod"

const inputTypes = z.object({
    _id : z.any(),
    role : z.enum(["Viewer", "Editor"]),
    expirationOn : z.boolean(),
    expirationDate : z.string(),
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }

        await connectMongoDB()
        let peoplewithaccess = await PeopleWithAccess.findById(parsedInput.data._id)
        peoplewithaccess.role = parsedInput.data.role
        peoplewithaccess.expirationOn = parsedInput.data.expirationOn
        peoplewithaccess.expirationDate = parsedInput.data.expirationDate
        await peoplewithaccess.save()
        
        return NextResponse.json({role : parsedInput.data.role, expirationOn : parsedInput.data.expirationOn, expirationDate : parsedInput.data.expirationDate, _id : parsedInput.data._id},{status:200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}