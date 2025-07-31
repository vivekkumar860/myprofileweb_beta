const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting GitHub Pages deployment...');

try {
  // Set environment variable for GitHub Pages build
  process.env.GITHUB_PAGES = 'true';
  
  console.log('📦 Building for production...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('📄 Creating .nojekyll file...');
  fs.writeFileSync(path.join(__dirname, 'out', '.nojekyll'), '');
  
  console.log('🌐 Deploying to GitHub Pages...');
  execSync('npx gh-pages -d out -r https://github.com/vivekkumar860/myprofileweb_beta.git --dotfiles', { stdio: 'inherit' });
  
  console.log('✅ Deployment completed successfully!');
  console.log('🔗 Your site will be available at: https://vivekkumar860.github.io/myprofileweb_beta/');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
