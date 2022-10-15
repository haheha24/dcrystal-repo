import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.SENDGRID_API_KEY,
        },
      },
      from: process.env.EMAIL_SERVER_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const { host } = new URL(url);
        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: textFallBack({ url, host }),
          html: html({ url, host }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
  /* secret: process.env.NEXTAUTH_SECRET, */
  callbacks: {
    async session({ session, token }) {
      console.log("session", session)
      return session;
    },
    async redirect({ baseUrl, url }) {
      return url.startsWith(baseUrl) ? baseUrl : url;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  /*  pages: {
    signIn: "/auth/signin",
  }, */
});

const html = ({ url, host }: { url: string; host: string }) => {
  const escapedHost = host.replace(/\./g, "&#8203;.");
  return `
    <head>
      <style>
        .container {
          padding: 10px;
          color:white;
          text-align: center;
          border-radius: 10px;
          background: linear-gradient(90deg, rgba(120,9,121,1) 0%, rgba(0,212,255,1) 100%);
        }
        .link {
          display: inline-block;
          margin: 10px;
          padding: 7.5px 10px;
          font-size: 18px;
          text-decoration: none;
          font-weight: bold;
          border-radius: 10px;
          border: 1px solid white;          
          background: rgb(50, 155, 200);
        }
        .link:hover {
          background: rgb(50, 185, 200);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Sign In</h2>
        <p>Sign into <strong>${escapedHost}</strong></p>
        <a href="${url}" class="link">
            Sign in
        </a>
      </div>
    </body>`;
};
const textFallBack = ({ url, host }: { url: string; host: string }) => {
  return `Sign in to ${host}\n${url}\n\n`;
};
