import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Document from '@/models/document'
import User from '@/models/user'
import { z } from "zod"
import PeopleWithAccess from '@/models/peoplewithaccess'

const inputTypes = z.object({
    email : z.string().email()
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
        
        let documents = await Document.find({
            ownedBy : user._id
            //shared with you
        }).select('-content -settings -share')
        .populate({
            path : 'ownedBy',
            select : "-password"
        })

        let accessed = await PeopleWithAccess.find({user : user._id}).select("roomName")
        
        for(let x of accessed){
            let doc = await Document.findOne({roomName : x.roomName}).select('-content -settings -share')
            .populate({
                path : 'ownedBy',
                select : "-password"
            })
            if(doc){
                documents.push(doc)
            }
        }
        await documents.sort((a, b) => b.createdAt - a.createdAt)
        
        return NextResponse.json({documents},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}