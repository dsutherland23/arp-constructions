# Quick Start Guide - Email Testing

## 🚀 Local Testing (Do This First!)

### Step 1: Set Your Email Password
1. Open the `.env` file in this directory
2. Replace the empty `SMTP_PASS=` with your actual Hostinger email password:
   ```
   SMTP_PASS=your_actual_password
   ```
3. Save the file

### Step 2: Run the Test Script
```bash
node test-email.js
```

This will:
- ✅ Verify your SMTP credentials
- ✅ Test the connection to Hostinger
- ✅ Send a test email to info@arpconstructionpro.org
- ✅ Show detailed error messages if something fails

### Step 3: Check Results
- If successful, you'll see: `✅ ALL TESTS PASSED!`
- Check your email inbox at info@arpconstructionpro.org
- If you got the test email, your configuration is correct! ✨

---

## 🌐 Render Deployment Setup

Once local testing works, set the same variables in Render:

### Step 1: Log into Render Dashboard
Go to: https://dashboard.render.com

### Step 2: Navigate to Your Service
1. Find your "Web-Artisan-Studio" or "arpconstructionpro" service
2. Click on it

### Step 3: Add Environment Variables
1. Click "Environment" in the left sidebar
2. Add these 4 variables:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@arpconstructionpro.org
SMTP_PASS=your_actual_password
```

3. Click "Save Changes"

### Step 4: Wait for Deployment
- Render will automatically redeploy your service
- Wait 2-3 minutes for deployment to complete

### Step 5: Check Render Logs
1. Click "Logs" in the left sidebar
2. Look for these messages:
   ```
   [SMTP] Configuring transporter: host=smtp.hostinger.com, port=465, user=info@arpconstructionpro.org
   [SMTP] Connection verified successfully. Server is ready to take messages.
   ```

### Step 6: Test Live Website
1. Go to https://arpconstructionpro.org
2. Submit a test contact form or waitlist signup
3. Check Render logs for:
   ```
   [API] Received Consultation inquiry from [name] ([email])
   [SMTP] Attempting to send consultation email...
   [SMTP] Email sent successfully: [messageId]
   ```
4. Check your email inbox!

---

## 🔍 Troubleshooting

### If Local Test Fails

**Error: "Invalid login" or "Authentication failed"**
- ✅ Verify your email password by logging into Hostinger webmail
- ✅ Check if SMTP is enabled in Hostinger email settings
- ✅ Try using an app-specific password (check Hostinger docs)

**Error: "Connection timeout" or "ETIMEDOUT"**
- ✅ Try port 587 instead: Change `SMTP_PORT=587` in .env
- ✅ Check your firewall/antivirus settings
- ✅ Verify smtp.hostinger.com is the correct server

**Error: "SMTP_USER is not defined"**
- ✅ Make sure you saved the .env file
- ✅ Restart your terminal/script

### If Render Deployment Fails

**Logs show: "SMTP_USER is not defined"**
- ✅ Double-check environment variables are saved in Render
- ✅ Make sure there are no typos in variable names (case-sensitive!)
- ✅ Wait for redeployment to complete

**Logs show: "Connection verification failed"**
- ✅ Same troubleshooting as local test above
- ✅ Contact Hostinger support about cloud hosting access
- ✅ Ask if they block connections from Render's IP addresses

**Emails sent but not received**
- ✅ Check spam folder
- ✅ Log into Hostinger webmail directly
- ✅ Check email filters/forwarding rules
- ✅ Verify SPF/DKIM records in Hostinger DNS settings

---

## 📞 Need Help?

1. Run the test script and share the error output
2. Check Render logs and share relevant error messages
3. Verify you can log into Hostinger webmail with the same credentials
4. Contact Hostinger support if authentication keeps failing

---

## ✅ Success Checklist

- [ ] Created .env file with correct password
- [ ] Ran `node test-email.js` successfully
- [ ] Received test email in inbox
- [ ] Set same variables in Render dashboard
- [ ] Render deployment completed
- [ ] Render logs show "Connection verified successfully"
- [ ] Tested live contact form
- [ ] Received contact form email

---

**Last Updated:** 2026-02-09
**Website:** arpconstructionpro.org
