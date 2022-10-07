import React, { useState, useReducer } from "react";
import type { IContactForm } from "../../schemas/contactSchema";
const Contact = () => {
  const [email, setEmail] = useReducer(
    (initialEmail: IContactForm, newEmail: IContactForm) => ({
      ...initialEmail,
      ...newEmail,
    }),
    {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  );
  const [send, setSend] = useState(false);
  const [result, setResult] = useState("Nothing sent yet");

  const sendEmail = async () => {
    try {
      const emailRequest = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact: email }),
      });
      const data = await emailRequest.json();
      setSend(false);
      setResult(data.message);
      setSend(true);
    } catch (error) {
      setSend(false);
      return error;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //Requires more investigation
    setEmail({ [name]: value } as Pick<IContactForm, keyof IContactForm>);
  };
  return (
    <>
      <form>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={email?.name}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email?.email}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={email?.subject}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="message">Message</label>
        <input
          id="message"
          type="text"
          name="message"
          value={email?.message}
          onChange={(e) => handleChange(e)}
        />
      </form>
      <button type="submit" onClick={sendEmail}>
        Send
      </button>
      <main>
        {send && <>{result}</>}
        {!send && <>{result}</>}
      </main>
    </>
  );
};

export default Contact;
