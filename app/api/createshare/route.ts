import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import PeopleWithAccess from '@/models/peoplewithaccess'
import User from '@/models/user'
import Document from '@/models/document'
import Sharefile from '@/mailers/sharedfile'
import { z } from "zod"

const inputTypes = z.object({
    email : z.string().email(),
    role : z.enum(["Viewer", "Editor"]),
    expirationOn : z.boolean(),
    expirationDate : z.string(),
    roomName : z.string(),
    notify : z.boolean(),
    msg : z.string()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }
        
        await connectMongoDB()
        let user = await User.findOne({email : parsedInput.data.email})
        if(!user) return NextResponse.json({message:'email not found'},{status:404})
        let people = await PeopleWithAccess.create({
            user : user._id,
            roomName : parsedInput.data.roomName,
            role : parsedInput.data.role,
            expirationOn : parsedInput.data.expirationOn,
            expirationDate : parsedInput.data.expirationDate
        })
        let document = await Document.findOne({roomName : parsedInput.data.roomName}).populate('ownedBy')
        
        if(parsedInput.data.notify) {
            Sharefile(document.ownedBy.email, parsedInput.data.email, parsedInput.data.msg, parsedInput.data.roomName)
        }
        document.share.peoplewithaccess.push(people._id)
        await document.save()
        people = await people.populate({
            path : 'user',
            select : '-password'
        })

        return NextResponse.json({people},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}