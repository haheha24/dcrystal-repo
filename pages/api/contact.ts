import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import { contactSchema } from "../../schemas/contactSchema";
import type { IContactForm } from "../../schemas/contactSchema";

interface IMailOptions {
  to: string;
  from: string;
  subject: string;
  message: string;
  html: string;
  mail_settings: {
    sandboxMode: {
      enable: boolean;
    };
  };
}

const contactEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const contactEmail: IContactForm = req.body.contact;
      const confirmationMsg: IMailOptions = {
        to: contactEmail.email,
        from: "danielle.cristallo@gmail.com",
        subject: "Confirmation Email",
        message: contactEmail.message,
        html: `
        <p>Hi ${contactEmail.name},</p>
        <p>
          This is a confirmation email and <br>
          I will be in contact within 48 hours.
        </p>
        <p>Thank you, <br> Danielle Cristallo</p>
        <br><br><br>
        <p>Message sent:<br>${contactEmail.message}<p>`,
        mail_settings: {
          sandboxMode: {
            enable: Boolean(process.env.SENDGRID_SANDBOX!),
          },
        },
      };
      const customerMsg: IMailOptions = {
        to: "danielle.cristallo@gmail.com",
        from: "danielle.cristallo@gmail.com",
        subject: `${contactEmail.subject}, from ${contactEmail.email}`,
        message: contactEmail.message,
        html: `<div>From ${contactEmail.name}</div>
        <div>Email: ${contactEmail.email}</div>
        <p>${contactEmail.message}</p>`,
        mail_settings: {
          sandboxMode: {
            enable: Boolean(process.env.SENDGRID_SANDBOX!),
          },
        },
      };
      await contactSchema.validate(contactEmail).then(() => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        sgMail.send(confirmationMsg).catch((error) => error);
        sgMail.send(customerMsg).catch((error) => error);
      });
      return res.status(200).json({
        success: true,
        message:
          "Your email has been sent and you will receive a confirmation email shortly. Thank you.",
      });
    } catch (error) {
      return res.status(400).json({ error: error, success: false });
    }
  } else {
    return res
      .status(405)
      .json({ error: `Cannot ${req.method}`, success: false });
  }
};

export default contactEmail;
