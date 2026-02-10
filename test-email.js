#!/usr/bin/env node

/**
 * Email Configuration Test Script
 * 
 * This script tests your SMTP configuration without running the full server.
 * It will verify connection and attempt to send a test email.
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file if it exists
dotenv.config();

console.log('='.repeat(60));
console.log('EMAIL CONFIGURATION TEST');
console.log('='.repeat(60));
console.log();

// Read environment variables
const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465');
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

// Display configuration (hide password)
console.log('📋 Current Configuration:');
console.log('-'.repeat(60));
console.log(`SMTP_HOST: ${smtpHost}`);
console.log(`SMTP_PORT: ${smtpPort}`);
console.log(`SMTP_USER: ${smtpUser || '❌ NOT SET'}`);
console.log(`SMTP_PASS: ${smtpPass ? '✅ SET (hidden)' : '❌ NOT SET'}`);
console.log();

// Check if required variables are set
if (!smtpUser || !smtpPass) {
    console.error('❌ ERROR: Missing required environment variables!');
    console.log();
    console.log('Please set the following in your .env file or Render dashboard:');
    console.log('  SMTP_USER=info@arpconstructionpro.org');
    console.log('  SMTP_PASS=your_email_password');
    console.log();
    process.exit(1);
}

// Create transporter
console.log('🔧 Creating SMTP transporter...');
const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 15000,
    debug: true, // Enable debug output
    logger: true, // Log to console
});

console.log('✅ Transporter created');
console.log();

// Test 1: Verify connection
console.log('🔍 Test 1: Verifying SMTP connection...');
console.log('-'.repeat(60));

try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    console.log('   Server is ready to send emails.');
    console.log();
} catch (error) {
    console.error('❌ SMTP connection verification failed!');
    console.error();
    console.error('Error details:');
    console.error(`  Message: ${error.message}`);
    console.error(`  Code: ${error.code || 'N/A'}`);
    console.error(`  Command: ${error.command || 'N/A'}`);
    console.error(`  Response: ${error.response || 'N/A'}`);
    console.error();
    console.error('Common solutions:');
    console.error('  1. Check your email password is correct');
    console.error('  2. Verify SMTP is enabled in Hostinger email settings');
    console.error('  3. Try port 587 instead of 465 (change SMTP_PORT=587)');
    console.error('  4. Check if Hostinger requires app-specific password');
    console.error();
    process.exit(1);
}

// Test 2: Send test email
console.log('📧 Test 2: Sending test email...');
console.log('-'.repeat(60));

const testMailOptions = {
    from: smtpUser,
    to: 'info@arpconstructionpro.org',
    subject: '🧪 Test Email - SMTP Configuration Check',
    text: `
This is a test email sent at ${new Date().toISOString()}.

If you receive this, your SMTP configuration is working correctly!

Configuration used:
- Host: ${smtpHost}
- Port: ${smtpPort}
- User: ${smtpUser}
- Secure: ${smtpPort === 465 ? 'Yes (SSL/TLS)' : 'No (STARTTLS)'}
  `,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">🧪 Test Email - SMTP Configuration Check</h2>
      <p>This is a test email sent at <strong>${new Date().toISOString()}</strong>.</p>
      <p style="color: #16a34a; font-weight: bold;">✅ If you receive this, your SMTP configuration is working correctly!</p>
      
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
      
      <h3>Configuration used:</h3>
      <ul>
        <li><strong>Host:</strong> ${smtpHost}</li>
        <li><strong>Port:</strong> ${smtpPort}</li>
        <li><strong>User:</strong> ${smtpUser}</li>
        <li><strong>Secure:</strong> ${smtpPort === 465 ? 'Yes (SSL/TLS)' : 'No (STARTTLS)'}</li>
      </ul>
      
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
      
      <p style="color: #6b7280; font-size: 12px;">
        Sent from: ARP Construction Email Test Script<br>
        Website: arpconstructionpro.org
      </p>
    </div>
  `,
};

try {
    const info = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully!');
    console.log();
    console.log('Email details:');
    console.log(`  Message ID: ${info.messageId}`);
    console.log(`  Response: ${info.response}`);
    console.log();
    console.log('🎉 SUCCESS! Check your inbox at info@arpconstructionpro.org');
    console.log('   (Don\'t forget to check spam folder)');
    console.log();
} catch (error) {
    console.error('❌ Failed to send test email!');
    console.error();
    console.error('Error details:');
    console.error(`  Message: ${error.message}`);
    console.error(`  Code: ${error.code || 'N/A'}`);
    console.error(`  Command: ${error.command || 'N/A'}`);
    console.error(`  Response: ${error.response || 'N/A'}`);
    console.error();

    if (error.code === 'EAUTH') {
        console.error('🔐 Authentication Error - Possible causes:');
        console.error('  1. Wrong email password');
        console.error('  2. SMTP not enabled in Hostinger');
        console.error('  3. Need app-specific password');
        console.error('  4. Account locked or suspended');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
        console.error('⏱️  Connection Timeout - Possible causes:');
        console.error('  1. Firewall blocking connection');
        console.error('  2. Wrong SMTP host or port');
        console.error('  3. Hostinger blocking your IP');
        console.error('  4. Try port 587 instead of 465');
    }
    console.error();
    process.exit(1);
}

console.log('='.repeat(60));
console.log('✅ ALL TESTS PASSED!');
console.log('='.repeat(60));
console.log();
console.log('Next steps:');
console.log('  1. Check your email inbox at info@arpconstructionpro.org');
console.log('  2. If you received the test email, your config is correct!');
console.log('  3. Make sure the same variables are set in Render dashboard');
console.log('  4. After updating Render, wait for automatic redeployment');
console.log();
