"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill'
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

// const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({value, setValue, socket}:any) => {
    // const {status,data:session} =useSession()
    const {id} = useParams()
    const [quill, setQuill] = useState()
    // const handleOnChange = async (e:any)=>{
    //   // let email=session?.user?.email
    //   // if(!email) return ;
    //   let res=await axios.post('/api/savedocument',{
    //     roomName : id,
    //     content : e
    //   })
    //   if(res.status === 200){
    //     await socket.emit('change', id, e)
    //   }
    // }

    const Toolbar_Options =  [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

      useEffect(()=>{
        if(socket == null || quill == null) return 

        socket.on('load_document', (data:any)=>{
          console.log('load document data', data);
          
          quill.setContents(data)
          quill.enable()
        })
        socket.emit("get_document", id)
      }, [socket, quill, id])

      useEffect(()=>{
        if(socket == null || quill == null) return 

        const interval = setInterval(()=>{
          console.log('dfdf',quill.getContents());
          
          socket.emit('save_document', quill.getContents())
        },2000)

        return ()=>{
          clearInterval(interval)
        }
      }, [socket, quill])

      useEffect(()=>{
        if(socket == null || quill == null) return 
        const handler = (delta:any)=>{
          quill.updateContents(delta)
        }
        socket.on('recieved_changes',handler)
        
        return ()=>{
          socket.off('recieved_changes',handler)
         
        }
      },[socket, quill])

      useEffect(()=>{
        if(socket == null || quill == null) return 
        const handler = (delta:any, oldDelta:any, source:any)=>{
          if(source !== 'user') return 
          socket.emit('send-changes', delta)
        }
        
        quill?.on('text-change',handler)
        return ()=>{
          quill?.off('text-change',handler)
        }
      },[socket, quill])

      const wrapperRef = useCallback((wrapper:any) => {
        if(wrapper == null) return 
        wrapper.innerHTML = ''
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor , { theme : "snow", modules : {
          toolbar : Toolbar_Options
        } } )
        q.disable()
        q.setText('loading...')
        setQuill(q)
      }, []);

  return (
    <div className='' id='container' ref={wrapperRef} >
    </div>
  )
}

export default Editor
