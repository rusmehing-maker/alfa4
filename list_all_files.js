import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next') && !file.includes('dist')) {
          results = results.concat(walk(fullPath));
        }
      } else {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

const allFiles = walk('.');
console.log('All files in workspace:', allFiles.filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f)));
