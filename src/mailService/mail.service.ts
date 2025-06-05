import * as nodemailer from 'nodemailer';
export class MailService{
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'irzhyckaya@gmail.com',
        pass: 'ajcaahxaepxbphix'
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  }

  async sendPasswordResetEmail(email:string, token: string) {
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`

    const mailOptions = {
      from: '"Anastasiia Irzhytska" <irzhyckaya@gmail.com> ',
      to: email,
      subject: 'Password Reset Request',
      text: 'Hi! For reset the password please click this link:',
      html: `<p>Hi! For reset the password please click this link:</p> <a href="${resetUrl}">CLICK</a>`
    };
    return this.transporter.sendMail(mailOptions)
  }

}