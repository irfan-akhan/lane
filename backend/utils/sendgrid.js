API_KEY = '';
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// function sendMAIL(email, body) {
//   console.log(email, body);
//   const msg = {
//     to: email, // Change to your recipient
//     from: "info@shuttlelane.com", // Change to your verified sender
//     subject: "Shuttlelane car services",
//     text: body,
//     html: `<strong>${body}</strong>`,
//   };
//   sgMail
//     .send(msg)
//     .then((res) => {
//       console.log("Email sent", res);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

module.exports = sendMAIL;
