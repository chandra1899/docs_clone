import {transporter} from '@/config/nodemailer'

const Requesteditaccess = async (from:string, to:string, msg: string, roomName : string)=>{    
    try {
        let info=await transporter.sendMail({
            from:'c4746665@gmail.com',
            to: to,
            subject: `${from} requested for edit access`,
            html: `
            <p>${from} requested you to provide edit access to <a href='${process.env.NEXTJS_URL}/document/${roomName}'>Document</a> </p>            
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