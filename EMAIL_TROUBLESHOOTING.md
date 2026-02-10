# Email Troubleshooting Guide for arpconstructionpro.org

## 🔧 Environment Variables Setup in Render

Make sure you have these **exact** environment variables set in your Render dashboard:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@arpconstructionpro.org
SMTP_PASS=your_actual_email_password
```

### How to Set Environment Variables in Render:
1. Go to your Render dashboard
2. Select your web service
3. Click on "Environment" in the left sidebar
4. Add each variable with the exact names above
5. Click "Save Changes"
6. **Important:** Render will automatically redeploy your service

---

## 🔍 Debugging Steps

### Step 1: Check Render Logs
After setting the environment variables, check your Render logs for these messages:

**✅ Success Messages:**
```
[SMTP] Configuring transporter: host=smtp.hostinger.com, port=465, user=info@arpconstructionpro.org
[SMTP] Connection verified successfully. Server is ready to take messages.
```

**❌ Error Messages to Look For:**
```
[SMTP] Connection verification failed: [error details]
[SMTP] Failed to create transporter: [error details]
[SMTP] Error: SMTP_USER is not defined in environment variables
```

### Step 2: Test Email Sending
1. Submit a test form on your website
2. Check Render logs for:
   ```
   [API] Received Consultation inquiry from [name] ([email])
   [SMTP] Attempting to send consultation email...
   [SMTP] Email sent successfully: [messageId]
   ```

3. If you see an error, look for:
   ```
   [SMTP] Email sending error details: {
     message: "...",
     code: "...",
     response: "..."
   }
   ```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid login" or "Authentication failed"

**Possible Causes:**
- Wrong email password
- SMTP not enabled in Hostinger
- Need app-specific password

**Solutions:**
1. **Verify your email password:**
   - Log into Hostinger webmail with the same credentials
   - If you can't log in, reset your email password in Hostinger control panel

2. **Enable SMTP in Hostinger:**
   - Log into Hostinger control panel
   - Go to Email → Email Accounts
   - Click on your email account
   - Look for "SMTP Settings" or "External Email Client"
   - Make sure SMTP is enabled

3. **Try app-specific password:**
   - Some email providers require app passwords
   - Check Hostinger documentation for "app password" or "SMTP password"

### Issue 2: "Connection timeout" or "ETIMEDOUT"

**Possible Causes:**
- Render's IP is blocked by Hostinger
- Firewall issues
- Wrong SMTP host/port

**Solutions:**
1. **Verify SMTP settings:**
   - Double-check: `smtp.hostinger.com` and port `465`
   - Some Hostinger accounts use different SMTP servers
   - Check your Hostinger email settings for the correct SMTP server

2. **Try alternative port:**
   - Change `SMTP_PORT=587` (uses STARTTLS instead of SSL)
   - Port 587 sometimes works better with cloud hosting

3. **Contact Hostinger support:**
   - Ask if they block connections from cloud hosting providers
   - Request to whitelist Render's IP addresses

### Issue 3: Emails sent but not received

**Possible Causes:**
- Emails going to spam
- SPF/DKIM records not configured
- Email forwarding issues

**Solutions:**
1. **Check spam folder** in info@arpconstructionpro.org

2. **Verify email account:**
   - Log into Hostinger webmail
   - Check if emails are in the inbox there
   - Check email filters/rules

3. **Configure SPF/DKIM records:**
   - In Hostinger control panel, go to Email → Email Accounts
   - Look for SPF and DKIM settings
   - Make sure they're enabled for your domain

### Issue 4: "SMTP_USER is not defined"

**Solution:**
- Environment variables not set correctly in Render
- Make sure there are no typos in variable names
- After adding variables, wait for Render to redeploy

---

## 🧪 Testing Locally

To test email sending on your local machine:

1. Create a `.env` file in your project root:
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=info@arpconstructionpro.org
   SMTP_PASS=your_actual_password
   ```

2. Make sure `.env` is in your `.gitignore` (it already is)

3. Install dotenv if not already installed:
   ```bash
   npm install dotenv
   ```

4. Add to the top of `server/routes.ts`:
   ```typescript
   import dotenv from 'dotenv';
   dotenv.config();
   ```

5. Start your local server and test the contact form

---

## 📧 Alternative: Try Port 587

If port 465 doesn't work, try port 587 with STARTTLS:

In Render environment variables, change:
```
SMTP_PORT=587
```

The code will automatically adjust the `secure` setting based on the port.

---

## 🔐 Security Checklist

- ✅ Never commit `.env` file to git
- ✅ Use strong email password
- ✅ Rotate passwords regularly
- ✅ Enable 2FA on Hostinger account (if available)
- ✅ Monitor Render logs for suspicious activity

---

## 📞 Next Steps if Still Not Working

1. **Check Render logs** for specific error messages
2. **Test with a different email service** (like Gmail) to isolate if it's a Hostinger issue
3. **Contact Hostinger support** with:
   - Your domain name
   - The error message from Render logs
   - Ask about SMTP access from cloud hosting providers
4. **Share the error logs** with me for further debugging

---

## 🎯 Quick Verification Checklist

- [ ] All 4 environment variables set in Render
- [ ] No typos in variable names (case-sensitive)
- [ ] Correct email password (test by logging into webmail)
- [ ] SMTP enabled in Hostinger email settings
- [ ] Render service redeployed after adding variables
- [ ] Checked Render logs for connection verification message
- [ ] Tested form submission and checked logs
- [ ] Checked spam folder in receiving email
- [ ] Verified SPF/DKIM records configured in Hostinger
