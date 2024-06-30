import { RetgisterForm, GoogleLogin } from '@/components'
import { authOptions } from '@/lib/auth'
import {getServerSession} from "next-auth"
import {redirect} from "next/navigation"

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
