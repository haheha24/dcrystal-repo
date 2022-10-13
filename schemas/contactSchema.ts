import { object, string } from "yup";

export interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema = object().shape({
  name: string()
    .min(2, "Please enter a minimum of 2 characters")
    .max(24, "Please enter a maximum of 24 characters")
    .required("Please enter your name"),
  email: string()
    .email("Must be a valid email")
    .required("Please enter your email"),
  subject: string()
    .min(2, "Please enter a minimum of 2 characters")
    .max(24, "Please enter a maximum of 24 characters")
    .required("Please enter a subject for the email"),
  message: string().trim().required(),
});

export { contactSchema };
