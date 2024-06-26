import {transporter} from '@/config/nodemailer'

const Requesttoaddemail = async (from:string, to:string, msg: string, roomName : string, email : string)=>{
    try {
        let info=await transporter.sendMail({
            from:'c4746665@gmail.com',
            to: to,
            subject: `${from} request to add email`,
            html: `
            <p>${from} request you to share <a href='${process.env.NEXTJS_URL}/document/${roomName}'>Document</a> to email ${email}</p>            
            <h2>Message</h2>
            <p>${msg}</p>
            `
         });
         return ;
       } catch (error) {
            console.log('error in sendind mail',error);
       }
}
export default Requesttoaddemail