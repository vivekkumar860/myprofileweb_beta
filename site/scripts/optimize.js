#!/usr/bin/env node

/**
 * Development Optimization Script
 * Helps identify areas for improvement in the codebase
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  maxFileSize: 500, // lines
  maxComponentSize: 300, // lines
  ignoredFiles: ['node_modules', '.git', 'out', '.next'],
  fileExtensions: ['.js', '.jsx', '.ts', '.tsx']
};

// Analysis functions
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const stats = {
      path: filePath,
      lines: lines.length,
      size: content.length,
      imports: (content.match(/^import\s+/gm) || []).length,
      exports: (content.match(/^export\s+/gm) || []).length,
      functions: (content.match(/function\s+\w+|const\s+\w+\s*=\s*\(/g) || []).length,
      issues: []
    };

    // Check for potential issues
    if (lines.length > CONFIG.maxFileSize) {
      stats.issues.push(`File is too large (${lines.length} lines)`);
    }

    // Check for console.log statements (excluding commented ones and test files)
    const hasConsoleLog = lines.some(line => {
      const trimmedLine = line.trim();
      return trimmedLine.includes('console.log') && 
             !trimmedLine.startsWith('//') && 
             !trimmedLine.startsWith('/*') &&
             !trimmedLine.startsWith('*');
    });
    
    if (hasConsoleLog && !filePath.includes('test')) {
      stats.issues.push('Contains console.log statements');
    }

    if (content.includes('TODO') || content.includes('FIXME')) {
      stats.issues.push('Contains TODO/FIXME comments');
    }

    return stats;
  } catch (error) {
    return { path: filePath, error: error.message };
  }
}

function walkDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !CONFIG.ignoredFiles.includes(file)) {
      fileList = walkDirectory(filePath, fileList);
    } else if (CONFIG.fileExtensions.some(ext => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function generateReport(files) {
  const analysis = files.map(analyzeFile);
  const issues = analysis.filter(file => file.issues && file.issues.length > 0);
  const largeFiles = analysis.filter(file => file.lines > CONFIG.maxFileSize);
  
  console.log('\n📊 Code Analysis Report\n');
  console.log(`Total files analyzed: ${analysis.length}`);
  console.log(`Files with issues: ${issues.length}`);
  console.log(`Large files (>${CONFIG.maxFileSize} lines): ${largeFiles.length}\n`);
  
  if (largeFiles.length > 0) {
    console.log('🔍 Large Files:');
    largeFiles.forEach(file => {
      console.log(`  - ${file.path} (${file.lines} lines)`);
    });
    console.log('');
  }
  
  if (issues.length > 0) {
    console.log('⚠️  Files with Issues:');
    issues.forEach(file => {
      console.log(`  - ${file.path}`);
      file.issues.forEach(issue => console.log(`    • ${issue}`));
    });
    console.log('');
  }
  
  // Summary statistics
  const totalLines = analysis.reduce((sum, file) => sum + (file.lines || 0), 0);
  const totalFunctions = analysis.reduce((sum, file) => sum + (file.functions || 0), 0);
  
  console.log('📈 Summary:');
  console.log(`  Total lines of code: ${totalLines.toLocaleString()}`);
  console.log(`  Total functions: ${totalFunctions.toLocaleString()}`);
  console.log(`  Average file size: ${Math.round(totalLines / analysis.length)} lines`);
  
  return { analysis, issues, largeFiles };
}

// Main execution
if (require.main === module) {
  const srcDir = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('❌ src directory not found');
    process.exit(1);
  }
  
  console.log('🔍 Analyzing codebase...');
  const files = walkDirectory(srcDir);
  const report = generateReport(files);
  
  // Save report to file
  const reportPath = path.join(process.cwd(), 'optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

module.exports = { analyzeFile, walkDirectory, generateReport }; 