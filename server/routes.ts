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
      // Resilience settings for cloud deployments (Render/Heroku/etc)
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 20000,
      greetingTimeout: 10000,
      socketTimeout: 30000,
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

      // Save lead to storage
      try {
        await storage.createLead({
          name,
          email,
          phone,
          zip: zip || "N/A",
          referral: referral || "Website",
          address: address || null,
          type: leadType,
          status: "New"
        });
        console.log(`[API] Lead saved to storage for ${name}`);
      } catch (dbError) {
        console.error("[API] Failed to save lead to storage:", dbError);
        // We continue anyway to send the email if possible
      }

      if (!smtpUser) {
        console.error("[SMTP] Error: SMTP_USER is not defined in environment variables");
        return res.status(500).json({ message: "Email service not configured correctly" });
      }

      if (!transporter) {
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
          ${address ? `Address: ${address}` : "Address: Not provided"}
          
          Type: ${leadType}
        `,
        html: `
          <h3>New ${leadType}</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Zip Code:</strong> ${zip}</p>
          <p><strong>Referral:</strong> ${referral}</p>
          <p><strong>Address:</strong> ${address || "<em>Not provided</em>"}</p>
          <p><strong>Source:</strong> Website Inquiry (${leadType})</p>
        `,
      };

      console.log(`[SMTP] Attempting to send ${leadType.toLowerCase()} email...`);
      transporter.sendMail(mailOptions)
        .then(info => console.log("[SMTP] Email sent successfully:", info.messageId))
        .catch(error => console.error("[SMTP] Non-blocking email error:", error.message));

      res.json({
        success: true,
        message: `${leadType} recorded successfully. Transitioning to email client.`
      });
    } catch (error: any) {
      console.error("[API] Contact form error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin Authentication
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER || "Admin";
    const adminPass = process.env.ADMIN_PASS || "RicardoPecco";

    if (username === adminUser && password === adminPass) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.isAdmin = false;
    res.json({ success: true });
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ isLoggedIn: !!req.session.isAdmin });
  });

  // Admin Middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    if (req.session.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };

  // Admin Routes
  app.get("/api/admin/leads", requireAdmin, async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.delete("/api/admin/leads/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteLead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  app.patch("/api/admin/leads/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const lead = await storage.updateLeadStatus(req.params.id, status);
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lead status" });
    }
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
