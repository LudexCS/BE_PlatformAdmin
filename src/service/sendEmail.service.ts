import nodemailer from 'nodemailer';
import { findIdByEmail } from '../repository/account.repository';
import { insertEmailLog } from '../repository/sendEmail.repository';

export const sendEmailService = async (
    adminId: number,
    userEmail: string,
    content: string
) => {
    const receiverId = await findIdByEmail(userEmail);

    if (!adminId || !receiverId) {
        throw new Error('Invalid admin or user email');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `process.env.MAIL_USER`,
        to: userEmail,
        subject: '[Ludex] Message from Ludex',
        html: `
            <html>
              <body style="font-family: 'Apple SD Gothic Neo', Arial, sans-serif; background-color: #f6f6f6; padding: 40px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 40px; text-align: left;">
                  
                  <h2 style="color: #2D6FF2; font-size: 36px; font-weight: bold; margin-bottom: 40px;">Ludex</h2>
                  
                  <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    안녕하세요, <strong>Ludex</strong> 입니다.<br/><br/>
                    ${content}
                  </p>
            
                  <p style="color: #555; font-size: 14px; line-height: 1.6;">
                    본 메일은 Ludex 플랫폼과 관련된 중요한 안내 또는 알림을 위해 발송되었습니다.<br/>
                    문의 사항이 있으시면 <a href="mailto:ludexuos@gmail.com" style="color: #2D6FF2; text-decoration: none;">ludexuos@gmail.com</a>으로 연락주시기 바랍니다.
                  </p>
                  
                  <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
                  
                  <p style="color: #999; font-size: 13px;">궁금하신 점이 있으시면 언제든지 위 메일 주소로 회신해주세요.</p>
                  <p style="color: #aaa; font-size: 11px;">Copyright © Ludex All rights reserved.</p>
                </div>
              </body>
            </html>
        `,
    });

    await insertEmailLog(adminId, receiverId, content);
};
