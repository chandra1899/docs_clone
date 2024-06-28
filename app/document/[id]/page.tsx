import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DocumentClientSide } from "@/components"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

interface Params {
  id: string;
}

const page = async ({ params } : any) => {
  const sessionData = await getServerSession(authOptions)
  console.log('sessionData', sessionData);

  if (!sessionData) {
    redirect('/api/auth/signin');
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
    console.log('in server side');
    
  } catch (error) {
    console.log('error in fetching initial props at server', error);
    return 
  }  
  
  return (
      <DocumentClientSide initialData = {initialData} sessionData = {sessionData} />
    )
}

export default page
