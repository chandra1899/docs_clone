import { RetgisterForm, GoogleLogin } from '@/components'
import {getServerSession} from "next-auth"
import {redirect} from "next/navigation"
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home () {
  const session=await getServerSession(authOptions)
    if(session) redirect('/')
  return (
    <main className='flex justify-center items-center'>
    <div className='flex flex-col mt-[45px]'>
    <GoogleLogin/>
    <RetgisterForm/>
    </div>
  </main>
  )
}
