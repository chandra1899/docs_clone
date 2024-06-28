import {transporter} from '@/config/nodemailer'

const Sharefile = async (from:string, to:string, msg: string, roomName : string)=>{
    try {
        let info=await transporter.sendMail({
            from:'c4746665@gmail.com',
            to: to,
            subject: `${from} Shared a File with you`,
            html: `
            <h3>Open</h3>
            <a href='http://localhost:8000/document/${roomName}'>link</a>
            <h2>Message</h2>
            <p>${msg}</p>
            `
         });
         return ;
       } catch (error) {
            console.log('error in sendind mail',error);
       }
}
export default Sharefile