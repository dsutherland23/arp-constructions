#!/usr/bin/env node

/**
 * Environment Variables Checker
 * 
 * This script checks which environment variables are set
 * Useful for debugging deployment issues
 */

console.log('='.repeat(60));
console.log('ENVIRONMENT VARIABLES CHECK');
console.log('='.repeat(60));
console.log();

const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const optionalVars = ['NODE_ENV', 'PORT'];

console.log('📋 Required Variables:');
console.log('-'.repeat(60));

let allSet = true;

requiredVars.forEach(varName => {
    const value = process.env[varName];
    const isSet = value !== undefined && value !== '';

    if (isSet) {
        // Hide password
        if (varName === 'SMTP_PASS') {
            console.log(`✅ ${varName}: ${'*'.repeat(value.length)} (hidden)`);
        } else {
            console.log(`✅ ${varName}: ${value}`);
        }
    } else {
        console.log(`❌ ${varName}: NOT SET`);
        allSet = false;
    }
});

console.log();
console.log('📋 Optional Variables:');
console.log('-'.repeat(60));

optionalVars.forEach(varName => {
    const value = process.env[varName];
    const isSet = value !== undefined && value !== '';

    if (isSet) {
        console.log(`✅ ${varName}: ${value}`);
    } else {
        console.log(`ℹ️  ${varName}: not set (using default)`);
    }
});

console.log();
console.log('='.repeat(60));

if (allSet) {
    console.log('✅ All required environment variables are set!');
    console.log();
    console.log('Next step: Run `node test-email.js` to test the configuration');
} else {
    console.log('❌ Some required environment variables are missing!');
    console.log();
    console.log('Action needed:');
    console.log('  1. For local testing: Set variables in .env file');
    console.log('  2. For Render: Set variables in dashboard Environment section');
}

console.log('='.repeat(60));
console.log();
