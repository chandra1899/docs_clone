import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DocumentClientSide, NotFound } from "@/components"
import { getServerSession } from "next-auth"
import Link from "next/link"

interface Params {
  id: string;
}

const page = async ({ params } : any) => {
  const sessionData = await getServerSession(authOptions)

  if (!sessionData) {
    return <div className="flex flex-row justify-center items-center mt-4">
      <p>Please Login Here</p>
      <Link href={`${process.env.NEXTJS_URL}/api/auth/signin`}>
        <p className="text-blue-600 hover:text-blue-700 cursor-pointer">SignIn</p>
      </Link>
    </div>
  }
  const roomName = params.id
  let initialData ;
  try {
    let res = await fetch(`${process.env.NEXTJS_URL}/api/roomdetails`,{
      method:'POST',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include',
      body:JSON.stringify({
        roomName 
      })
    })
    if(res.status !== 200) {
      console.log('serverside error');
      return ;      
    }
    initialData = await res.json()
    if(!initialData.document){
      return <NotFound/>
    }    
  } catch (error) {
    console.log('error in fetching initial props at server', error);
    return 
  }  
  
  return (
      <DocumentClientSide initialData = {initialData} sessionData = {sessionData} />
    )
}

export default page
