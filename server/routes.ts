import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true, // Use SSL for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, zip, referral, address } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: "info@arpconstructionpro.org",
        subject: `New Project Inquiry: ${name}`,
        text: `
          New inquiry received from website:
          
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Zip Code: ${zip}
          Referral: ${referral}
          Address: ${address || "Not provided"}
        `,
        html: `
          <h3>New Project Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Zip Code:</strong> ${zip}</p>
          <p><strong>Referral:</strong> ${referral}</p>
          <p><strong>Address:</strong> ${address || "Not provided"}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Inquiry sent successfully" });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ message: "Failed to send inquiry" });
    }
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
