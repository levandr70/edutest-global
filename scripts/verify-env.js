/**
 * Environment Variables Verification Script
 * Run with: node scripts/verify-env.js
 * 
 * This script checks if all required environment variables are set
 * and validates their format.
 */

const requiredVars = {
  // Firebase Configuration (6 variables)
  'NEXT_PUBLIC_FIREBASE_API_KEY': {
    required: true,
    public: true,
    description: 'Firebase API Key',
    validation: (val) => val && val.length > 20 && !val.includes('your_'),
    example: 'AIzaSy...',
  },
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': {
    required: true,
    public: true,
    description: 'Firebase Auth Domain',
    validation: (val) => val && val.includes('.firebaseapp.com') && !val.includes('your-'),
    example: 'your-project.firebaseapp.com',
  },
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID': {
    required: true,
    public: true,
    description: 'Firebase Project ID',
    validation: (val) => val && val.length > 0 && !val.includes('your-'),
    example: 'your-project-id',
  },
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': {
    required: true,
    public: true,
    description: 'Firebase Storage Bucket',
    validation: (val) => val && (val.includes('.appspot.com') || val.includes('gs://')) && !val.includes('your-'),
    example: 'your-project.appspot.com',
  },
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': {
    required: true,
    public: true,
    description: 'Firebase Messaging Sender ID',
    validation: (val) => val && val.length > 0 && !val.includes('your_'),
    example: '123456789012',
  },
  'NEXT_PUBLIC_FIREBASE_APP_ID': {
    required: true,
    public: true,
    description: 'Firebase App ID',
    validation: (val) => val && val.length > 0 && !val.includes('your_'),
    example: '1:123456789012:web:abc123',
  },
  
  // Admin Access Control
  'NEXT_PUBLIC_ADMIN_EMAILS': {
    required: true,
    public: true,
    description: 'Admin Email Allowlist',
    validation: (val) => {
      if (!val) return false;
      const emails = val.split(',').map(e => e.trim());
      return emails.every(email => email.includes('@') && email.includes('.'));
    },
    example: 'admin@example.com,admin2@example.com',
  },
  
  // Cloudflare Turnstile
  'NEXT_PUBLIC_TURNSTILE_SITE_KEY': {
    required: true,
    public: true,
    description: 'Turnstile Site Key (Public)',
    validation: (val) => val && val.length > 10 && !val.includes('your_'),
    example: '0x4AAAAAA...',
  },
  'TURNSTILE_SECRET_KEY': {
    required: true,
    public: false, // IMPORTANT: This should NOT have NEXT_PUBLIC_ prefix
    description: 'Turnstile Secret Key (Server-side only)',
    validation: (val) => val && val.length > 10 && !val.includes('your_'),
    example: '0x4AAAAAA...',
  },
  
  // Site URL
  'NEXT_PUBLIC_SITE_URL': {
    required: true,
    public: true,
    description: 'Production Site URL',
    validation: (val) => {
      if (!val) return false;
      // Should start with https:// and not have trailing slash
      return val.startsWith('https://') && !val.endsWith('/') && val.length > 10;
    },
    example: 'https://edutestglobal.org',
  },
};

function verifyEnvironment() {
  console.log('🔍 Verifying Environment Variables...\n');
  console.log('='.repeat(60));
  
  const results = {
    missing: [],
    invalid: [],
    valid: [],
    warnings: [],
  };
  
  // Check each required variable
  for (const [varName, config] of Object.entries(requiredVars)) {
    const value = process.env[varName];
    
    // Check if variable exists
    if (!value || value.trim() === '') {
      results.missing.push({
        name: varName,
        config,
      });
      continue;
    }
    
    // Check if it's a placeholder value
    if (value.includes('your_') || value.includes('your-') || value.includes('yourdomain')) {
      results.warnings.push({
        name: varName,
        value: value.substring(0, 20) + '...',
        message: 'Contains placeholder text',
      });
      continue;
    }
    
    // Validate format
    if (config.validation && !config.validation(value)) {
      results.invalid.push({
        name: varName,
        value: value.substring(0, 30) + (value.length > 30 ? '...' : ''),
        config,
      });
      continue;
    }
    
    // Check prefix for public variables
    if (config.public && !varName.startsWith('NEXT_PUBLIC_')) {
      results.warnings.push({
        name: varName,
        message: 'Public variable should have NEXT_PUBLIC_ prefix',
      });
    }
    
    // Check that TURNSTILE_SECRET_KEY does NOT have NEXT_PUBLIC_ prefix
    if (varName === 'TURNSTILE_SECRET_KEY' && varName.startsWith('NEXT_PUBLIC_')) {
      results.invalid.push({
        name: varName,
        message: 'TURNSTILE_SECRET_KEY should NOT have NEXT_PUBLIC_ prefix (server-side only)',
        config,
      });
      continue;
    }
    
    results.valid.push({
      name: varName,
      config,
    });
  }
  
  // Print results
  console.log('\n✅ VALID VARIABLES:');
  if (results.valid.length === 0) {
    console.log('   None found');
  } else {
    results.valid.forEach(({ name, config }) => {
      const value = process.env[name];
      const displayValue = value.length > 30 
        ? value.substring(0, 30) + '...' 
        : value;
      console.log(`   ✓ ${name}`);
      console.log(`     Value: ${displayValue}`);
      console.log(`     Description: ${config.description}`);
      console.log('');
    });
  }
  
  console.log('\n❌ MISSING VARIABLES:');
  if (results.missing.length === 0) {
    console.log('   None - All required variables are set!');
  } else {
    results.missing.forEach(({ name, config }) => {
      console.log(`   ✗ ${name}`);
      console.log(`     Description: ${config.description}`);
      console.log(`     Example: ${config.example}`);
      console.log(`     Public: ${config.public ? 'Yes (NEXT_PUBLIC_ prefix)' : 'No (server-side only)'}`);
      console.log('');
    });
  }
  
  console.log('\n⚠️  INVALID VARIABLES:');
  if (results.invalid.length === 0) {
    console.log('   None');
  } else {
    results.invalid.forEach(({ name, value, message, config }) => {
      console.log(`   ✗ ${name}`);
      if (value) console.log(`     Current value: ${value}`);
      if (message) console.log(`     Issue: ${message}`);
      if (config) {
        console.log(`     Expected format: ${config.example}`);
      }
      console.log('');
    });
  }
  
  console.log('\n⚠️  WARNINGS:');
  if (results.warnings.length === 0) {
    console.log('   None');
  } else {
    results.warnings.forEach(({ name, value, message }) => {
      console.log(`   ⚠ ${name}`);
      if (value) console.log(`     Value: ${value}`);
      if (message) console.log(`     Warning: ${message}`);
      console.log('');
    });
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY:');
  console.log(`   Total required: ${Object.keys(requiredVars).length}`);
  console.log(`   ✅ Valid: ${results.valid.length}`);
  console.log(`   ❌ Missing: ${results.missing.length}`);
  console.log(`   ⚠️  Invalid: ${results.invalid.length}`);
  console.log(`   ⚠️  Warnings: ${results.warnings.length}`);
  console.log('');
  
  if (results.missing.length === 0 && results.invalid.length === 0 && results.warnings.length === 0) {
    console.log('🎉 All environment variables are correctly configured!');
    return 0;
  } else {
    console.log('⚠️  Please fix the issues above before deploying.');
    return 1;
  }
}

// Run verification
const exitCode = verifyEnvironment();
process.exit(exitCode);



