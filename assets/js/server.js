// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML, CSS, JS)
app.use(express.static('public'));

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, contact, message } = req.body;

  // Configure nodemailer to send an email
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: 'puneetpandey872@gmail.com', // Your email
      pass: 'puneet7465', // Your email password or app password
    },
  });

  let mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // Your email where you want to receive notifications
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contact}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Success');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
