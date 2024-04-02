"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill'
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

// const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({value, setValue, socket}:any) => {
    // const {status,data:session} =useSession()
    const {id} = useParams()
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

      const wrapperRef = useCallback((wrapper:any) => {
        if(wrapper == null) return 
        wrapper.innerHTML = ''
        const editor = document.createElement("div")
        wrapper.append(editor)
        new Quill(editor , { theme : "snow", modules : {
          toolbar : Toolbar_Options
        } } )

      }, []);

  return (
    <div className='' id='container' ref={wrapperRef} >
    </div>
  )
}

export default Editor
