const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow requests from your React frontend
app.use(bodyParser.json());

// 📧 Configure Nodemailer (use Gmail or any SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail", // you can also use "Outlook", "Yahoo", or SMTP settings
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password", // ⚠️ not your Gmail password, but an App Password
  },
});

// API endpoint to handle bookings
app.post("/book", async (req, res) => {
  const { patientName, patientEmail, doctorName, doctorEmail, timeSlot } = req.body;

  try {
    // Send email to doctor
    await transporter.sendMail({
      from: '"Doctor Booking" <your-email@gmail.com>',
      to: doctorEmail,
      subject: `New Appointment Request`,
      text: `Hello Dr. ${doctorName},

You have a new booking request:
- Patient: ${patientName}
- Email: ${patientEmail}
- Time Slot: ${timeSlot}

Please confirm the appointment.`,
    });

    res.json({ success: true, message: "Booking confirmed and email sent to doctor" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
