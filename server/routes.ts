import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Simple health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Setup Nodemailer transporter
  const smtpPort = parseInt(process.env.SMTP_PORT || "465");
  const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpUser = process.env.SMTP_USER;

  console.log(`[SMTP] Configuring transporter: host=${smtpHost}, port=${smtpPort}, user=${smtpUser}`);

  let transporter: nodemailer.Transporter;
  try {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // True for 465, false for other ports (587/25)
      auth: {
        user: smtpUser,
        pass: process.env.SMTP_PASS,
      },
      // Adding some timeouts to prevent long hangs
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 15000,
    });

    // Verify connection configuration on startup
    transporter.verify((error: Error | null, success: boolean) => {
      if (error) {
        console.error("[SMTP] Connection verification failed:", error);
      } else {
        console.log("[SMTP] Connection verified successfully. Server is ready to take messages.");
      }
    });
  } catch (err) {
    console.error("[SMTP] Failed to create transporter:", err);
  }

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, zip, referral, address, type } = req.body;
      const leadType = type || "Consultation";
      console.log(`[API] Received ${leadType} inquiry from ${name} (${email})`);

      if (!name || !email || !phone) {
        console.warn("[API] Submission rejected: Missing required fields");
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!smtpUser) {
        console.error("[SMTP] Error: SMTP_USER is not defined in environment variables");
        return res.status(500).json({ message: "Email service not configured correctly" });
      }

      if (!transporter!) {
        console.error("[SMTP] Error: Transporter failed to initialize");
        return res.status(500).json({ message: "Email service failed to initialize. Check server logs." });
      }

      const isWaitlist = leadType === "Waitlist";
      const subject = isWaitlist
        ? `New Waitlist Signup: ${name} (${zip})`
        : `New Project Inquiry: ${name}`;

      const mailOptions = {
        from: smtpUser,
        to: "info@arpconstructionpro.org",
        subject: subject,
        text: `
          New ${leadType.toLowerCase()} received from website:
          
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Zip Code: ${zip}
          Referral: ${referral}
          ${address ? `Address: ${address}` : "Address: Not provided (Outside service area)"}
          
          Type: ${leadType}
        `,
        html: `
          <h3>New ${leadType}</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Zip Code:</strong> ${zip}</p>
          <p><strong>Referral:</strong> ${referral}</p>
          <p><strong>Address:</strong> ${address || "<em>Not provided (Outside service area)</em>"}</p>
          <p><strong>Source:</strong> Website Inquiry (${leadType})</p>
        `,
      };

      console.log(`[SMTP] Attempting to send ${leadType.toLowerCase()} email...`);
      const info = await transporter.sendMail(mailOptions);
      console.log("[SMTP] Email sent successfully:", info.messageId);
      res.json({ success: true, message: `${leadType} sent successfully` });
    } catch (error: any) {
      console.error("[SMTP] Email sending error details:", {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        stack: error.stack
      });
      res.status(500).json({ message: "Failed to send inquiry. Please check server logs." });
    }
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
