import { HomeClientSide } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {

  const sessionData = await getServerSession(authOptions)
  console.log('sessionData', sessionData);

  if (!sessionData) {
    redirect('/api/auth/signin');
  }
  let initialData ;
  try {
    let res = await fetch(`${process.env.NEXTJS_URL}/api/mydocuments`,{
      method:'POST',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include',
      body:JSON.stringify({
        email : sessionData.user?.email
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
    <main>
        <HomeClientSide initialData = {initialData} sessionData = {sessionData} />
    </main>
  );
}
