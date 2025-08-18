const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// HTML files to copy from root to dist
const htmlFiles = [
  'index.html',
  'about.html',
  'blog.html',
  'contact.html',
  'portfolio.html',
  'preview.html',
  'process.html',
  'services.html'
];

// Copy HTML files and fix asset paths
htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix CSS path from /dist/css/ to css/
    content = content.replace(/href="\/dist\/css\//g, 'href="css/');
    
    // Fix JS path from /dist/js/ to js/
    content = content.replace(/src="\/dist\/js\//g, 'src="js/');
    
    // Fix asset paths from /src/assets/ to svg/ (or appropriate folder)
    content = content.replace(/src="\/src\/assets\//g, 'src="svg/');
    content = content.replace(/href="\/src\/assets\//g, 'href="svg/');
    
    fs.writeFileSync(path.join('dist', file), content);
    console.log(`Copied and fixed paths in ${file} to dist/`);
  } else {
    console.warn(`Warning: ${file} not found`);
  }
});

// Copy services directory if it exists
if (fs.existsSync('services')) {
  const servicesDistDir = path.join('dist', 'services');
  if (!fs.existsSync(servicesDistDir)) {
    fs.mkdirSync(servicesDistDir, { recursive: true });
  }
  
  const serviceFiles = fs.readdirSync('services');
  serviceFiles.forEach(file => {
    const srcPath = path.join('services', file);
    const destPath = path.join(servicesDistDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied services/${file} to dist/services/`);
  });
}

console.log('HTML files copied successfully!');
