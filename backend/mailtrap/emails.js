import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.js"

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{email}]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent Successfully", response);
  } catch (error) {
    console.error(`Error sending verification`,error);
    throw new Error(`Error sending verification email : ${error}`);
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "20cd9a35-011c-47a0-82e2-4eb11a480f90",
      template_variables: {
      "company_info_name": "HunterJoe Company",
      "name": name,
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending Welcome email`, error);
    throw new Error(`Error sending Welcome email: ${error}`);
  }
}