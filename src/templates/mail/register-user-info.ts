export function registerUserInfoEmailTemplate(username) {
  return `<html>
  <head>
    <title>User Registration Confirmation</title>
  </head>
  <body>
    <p>Dear ${username},</p>
    <p>Thank you for registering with our service. We're delighted to have you on board!</p>
    <p>If you need any help, please don't hesitate to contact our support team. We're always happy to assist you!</p>
    <p>Best regards,</p>
    <p>The team at our service</p>
  </body>
</html>`;
}
