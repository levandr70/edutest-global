#!/usr/bin/env node

/**
 * Pre-Deployment Verification Script
 * Run with: node scripts/pre-deploy-check.js
 * 
 * This script checks if your project is ready for deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Pre-Deployment Check\n');
console.log('='.repeat(60));

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

function check(name, condition, message, isWarning = false) {
  if (condition) {
    console.log(`✅ ${name}`);
    checks.passed++;
  } else {
    if (isWarning) {
      console.log(`⚠️  ${name}: ${message}`);
      checks.warnings++;
    } else {
      console.log(`❌ ${name}: ${message}`);
      checks.failed++;
    }
  }
}

// Check 1: Required files exist
console.log('\n📁 File Structure:');
check(
  'package.json exists',
  fs.existsSync('package.json'),
  'package.json is missing'
);

check(
  'next.config.ts exists',
  fs.existsSync('next.config.ts'),
  'next.config.ts is missing'
);

check(
  'tsconfig.json exists',
  fs.existsSync('tsconfig.json'),
  'tsconfig.json is missing'
);

check(
  'app directory exists',
  fs.existsSync('app'),
  'app directory is missing'
);

check(
  'app/layout.tsx exists',
  fs.existsSync('app/layout.tsx'),
  'app/layout.tsx is missing'
);

check(
  'app/page.tsx exists',
  fs.existsSync('app/page.tsx'),
  'app/page.tsx is missing'
);

check(
  'app/not-found.tsx exists',
  fs.existsSync('app/not-found.tsx'),
  'app/not-found.tsx is missing'
);

// Check 2: Environment template
console.log('\n🔐 Environment Variables:');
check(
  'env.template exists',
  fs.existsSync('env.template'),
  'env.template is missing (needed for reference)',
  true
);

// Check 3: Package.json scripts
console.log('\n📦 Package.json Scripts:');
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  
  check(
    'build script exists',
    !!scripts.build,
    'build script is missing'
  );
  
  check(
    'dev script exists',
    !!scripts.dev,
    'dev script is missing'
  );
  
  check(
    'start script exists',
    !!scripts.start,
    'start script is missing'
  );
  
  check(
    'Next.js is in dependencies',
    packageJson.dependencies && packageJson.dependencies.next,
    'Next.js is not in dependencies'
  );
  
  check(
    'React is in dependencies',
    packageJson.dependencies && packageJson.dependencies.react,
    'React is not in dependencies'
  );
}

// Check 4: API routes
console.log('\n🔌 API Routes:');
check(
  'API contact route exists',
  fs.existsSync('app/api/contact/route.ts'),
  'app/api/contact/route.ts is missing'
);

// Check 5: SEO files
console.log('\n🔍 SEO Files:');
check(
  'sitemap.ts exists',
  fs.existsSync('app/sitemap.ts'),
  'app/sitemap.ts is missing'
);

check(
  'robots.ts exists',
  fs.existsSync('app/robots.ts'),
  'app/robots.ts is missing'
);

// Check 6: Configuration files
console.log('\n⚙️  Configuration:');
check(
  'vercel.json exists',
  fs.existsSync('vercel.json'),
  'vercel.json is missing (optional but recommended)',
  true
);

// Check 7: .gitignore
console.log('\n📝 Git Configuration:');
check(
  '.gitignore exists',
  fs.existsSync('.gitignore'),
  '.gitignore is missing'
);

if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  check(
    '.env*.local is in .gitignore',
    gitignore.includes('.env') || gitignore.includes('.env*.local'),
    '.env files should be in .gitignore',
    true
  );
  
  check(
    'node_modules is in .gitignore',
    gitignore.includes('node_modules'),
    'node_modules should be in .gitignore',
    true
  );
  
  check(
    '.next is in .gitignore',
    gitignore.includes('.next'),
    '.next should be in .gitignore',
    true
  );
}

// Check 8: Documentation
console.log('\n📚 Documentation:');
check(
  'README.md exists',
  fs.existsSync('README.md'),
  'README.md is missing',
  true
);

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 Summary:');
console.log(`   ✅ Passed: ${checks.passed}`);
console.log(`   ❌ Failed: ${checks.failed}`);
console.log(`   ⚠️  Warnings: ${checks.warnings}`);

if (checks.failed === 0 && checks.warnings === 0) {
  console.log('\n🎉 All checks passed! Your project is ready for deployment.');
  console.log('\n📋 Next Steps:');
  console.log('   1. Set all environment variables in Vercel');
  console.log('   2. Run: npm run build (to verify local build)');
  console.log('   3. Deploy to Vercel');
  console.log('   4. See FINAL_DEPLOYMENT_CHECKLIST.md for details');
  process.exit(0);
} else if (checks.failed === 0) {
  console.log('\n✅ Critical checks passed!');
  console.log('⚠️  Some warnings found, but deployment should work.');
  console.log('\n📋 Next Steps:');
  console.log('   1. Review warnings above');
  console.log('   2. Set all environment variables in Vercel');
  console.log('   3. Run: npm run build');
  console.log('   4. Deploy to Vercel');
  process.exit(0);
} else {
  console.log('\n❌ Some critical checks failed!');
  console.log('Please fix the issues above before deploying.');
  process.exit(1);
}



