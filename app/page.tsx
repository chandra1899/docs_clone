import { HomeClientSide } from "@/components";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const sessionData = await getServerSession(authOptions)

  if (!sessionData) {
    return <div className="flex flex-row justify-center items-center mt-4">
      <p>Please Login Here</p>
      <Link href={`${process.env.NEXTJS_URL}/api/auth/signin`}>
        <p className="text-blue-600 hover:text-blue-700 cursor-pointer">SignIn</p>
      </Link>
    </div>
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
