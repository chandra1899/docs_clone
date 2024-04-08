import {transporter} from '@/config/nodemailer'

const Requesteditaccess = async (from:string, to:string, msg: string, roomName : string)=>{
    // console.log(from, to, msg);
    
    try {
        let info=await transporter.sendMail({
            from:'c4746665@gmail.com',
            to: to,
            subject: `${from} requested for edit access`,
            html: `
            <p>${from} requested you to provide edit access to <a href='http://localhost:8000/document/${roomName}'>Document</a> </p>            
            <h2>Message</h2>
            <p>${msg}</p>
            `
         });
         return ;
       } catch (error) {
            console.log('error in sendind mail',error);
       }
}
export default Requesteditaccess