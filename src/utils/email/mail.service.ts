import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private configService: ConfigService) {}

    async sendEmail(email: string, confirmationCode: string) {
        const mailPass = this.configService.get<string>("mailPass");
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "anton.pavlovskiy1990@gmail.com",
                pass: mailPass,
            },
        });
        const info = await transport.sendMail({
            from: "Anton Pavlovskiy",
            to: email,
            subject: "email confirmation",
            text: `https://somesite.com/confirm-email?code=${confirmationCode}`,
        });
        return true;
    }

    async sendEmailWithPasswordRecovery(email: string, passwordRecoveryCode: string) {
        const mailPass = this.configService.get<string>("mailPass");
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "anton.pavlovskiy1990@gmail.com",
                pass: mailPass,
            },
        });
        const info = await transport.sendMail({
            from: "Anton Pavlovskiy",
            to: email,
            subject: "Password recovery",
            text: `https://somesite.com/password-recovery?recoveryCode=${passwordRecoveryCode}`,
        });
        return true;
    }
}
