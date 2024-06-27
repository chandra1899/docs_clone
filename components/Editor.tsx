"use client"
import { modules_toolBar } from '@/utils/toolbarOptions';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { yourrole } from '@/store/atoms/yourrole';
import ReactQuill from 'react-quill';

const Editor = ({socket, currDocMode}:any) => {
    const {status,data:session} = useSession()
    const myRole = useRecoilValue(yourrole)
    const {id} = useParams()
    const editor = useRef<ReactQuill>(null)
    const [connectionEstablished, setConnectionEstablished] = useState(false)
    const [openToolBar, setOpenToolBar] = useState(false)

    const saveDocument = async () => {
      if(myRole === 'Viewer') return ;
          try {
            let res = await fetch('/api/savedocument',{
              method:'POST',
              headers:{
                'Access-Control-Allow-Origin': '*',
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include',
              body:JSON.stringify({
                roomName : id,content : editor.current?.getEditor().getContents()
              })
            })
            if(res.status === 200)
              console.log('saved');
            
          } catch (error) {
            console.log("error", error);
          }
      }
      useEffect(() => {        
        editor.current?.getEditor().disable()
        if(socket == null || editor.current == null) return ;
        setConnectionEstablished(false)
        editor.current?.getEditor().setText("Establishing connection.........")
        socket.on("connection-established", async () => {
          editor.current?.getEditor().setText("getting initial state of document.........")
            try {
              let res = await fetch('/api/roomdetails',{
                method:'POST',
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  Accept:"application/json",
                  "Content-Type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify({
                  roomName : id
                })
              })
              if(res.status === 200){
                console.log('document loaded');
                
                let data = await res.json();
                console.log('document dta', data);
                
                const initialContent = data.document.content
                editor.current?.getEditor().setContents(initialContent.ops)
                setConnectionEstablished(true)
                if(myRole !== 'Viewer'){
                  editor.current?.getEditor().enable()
                  setOpenToolBar(true)
                }
              }            
            } catch (error) {
              editor.current?.getEditor().setText("........Error in fetcing initial state of document, Please refresh.........")
                console.log("error in getting document", error);
            }
        })
        socket.emit("establish-conection", id)
      }, [socket, editor.current])

      useEffect(() => {
        if(socket == null || editor.current == null || connectionEstablished == false) return ;
        const interval = setInterval(async () => {
          console.log("saveDocument");
          
            await saveDocument()
        }, 1500)
        return () => {
          clearInterval(interval)
        }
      }, [socket, editor.current, connectionEstablished])

      useEffect(() => {
        if(socket == null || editor.current == null || connectionEstablished == false) return ;
          const handler = (delta: any) => {
            editor.current?.getEditor().updateContents(delta)
          }
          socket.on("receive-changes", handler)
          return () => {
            socket.off("receive-changes", handler)
          }
      }, [socket, editor.current, connectionEstablished])

      useEffect(() => {
        if(socket == null || editor.current == null || connectionEstablished == false) return ;
        const quillToolBar = document.getElementById('elementQuill')?.children[0] as HTMLElement
        if(openToolBar){
          quillToolBar.style.display = 'flex';
          quillToolBar.style.justifyContent = 'center';
        }
        else {
          quillToolBar.style.display = 'none';
        }
      }, [openToolBar, socket, editor.current, connectionEstablished])

      useEffect(() => {
        if(socket == null || editor.current == null || connectionEstablished == false) return ;
        const quillToolBar = document.getElementById('elementQuill')?.children[0] as HTMLElement
        
        if(myRole !== 'Viewer'){
          editor.current?.getEditor().enable()
          quillToolBar.style.display = 'flex';
          quillToolBar.style.justifyContent = 'center';
        }
        else {
          editor.current?.getEditor().disable()
          quillToolBar.style.display = 'none';
        }
      }, [myRole, socket, editor.current, connectionEstablished])

      useEffect(() => {
        if(socket == null || editor.current == null || connectionEstablished == false) return ;
        if(currDocMode == 'Edit' && myRole !== 'Viewer'){
          editor.current?.getEditor().enable()
          setOpenToolBar(true)
        }
        else{
          setOpenToolBar(false)
          editor.current?.getEditor().disable()
        }
      }, [currDocMode, socket, editor.current, connectionEstablished])

      const handleOnChange = (content : string, delta : any, source : any, presentEditor : ReactQuill.UnprivilegedEditor) => {
          if(connectionEstablished == false || source !== 'user' || socket == null || editor.current == null) return ;
          socket.emit('send-changes', delta)
      }

  return <ReactQuill id='elementQuill' theme="snow" ref={editor} onChange={handleOnChange} modules={modules_toolBar} />;
}

export default Editor