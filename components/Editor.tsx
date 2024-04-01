import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({value, setValue}:any) => {
    const {id} = useParams()
    const handleOnChange = async (e:any)=>{
      let res=await axios.post('/api/savedocument',{
        roomName : id,
        content : e
      })
      if(res.status === 200){
        setValue(e)
      }
      
    }
    const fontSizeArr = ['8px','9px','10px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px'];

    const Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSizeArr;
    Quill.register(Size, true);
    const COLORS = [
        "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff",
        "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
        "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
        "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
        "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
      ];
    const modules = {
        toolbar: [
        //   [{ 'header': [1, 2, 3, false] }],
          [{ 'size': fontSizeArr }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [
            {
              color: COLORS,
            },
          ],
          ['clean']
        ],
      }
    
      const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
      ]
  return (
    <div className='bg-black max-w-[800px] mx-auto'>
       <ReactQuill 
       theme="snow" 
       value={value} 
       modules={modules}
       formats={formats}
       onChange={handleOnChange} />
    </div>
  )
}

export default Editor
