import {transporter} from '@/config/nodemailer'

const SendLink = async (from:string, to:string, msg: string, roomName : string)=>{
    try {
        let info=await transporter.sendMail({
            from:'c4746665@gmail.com',
            to: to,
            subject: `${from} Shared a File Link`,
            html: `
            <h3>Open</h3>
            <a href='${process.env.NEXTJS_URL}/document/${roomName}'>link</a>
            <h2>Message</h2>
            <p>${msg}</p>
            `
         });
         return ;
       } catch (error) {
            console.log('error in sendind mail',error);
       }
}
export default SendLink