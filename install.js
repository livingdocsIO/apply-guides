#!/usr/bin/env node

path = require('path');
fs = require('fs-sync');

if(fs.exists(path.resolve('package.json'))){
  files = ['coffeelint.json', '.coffeelintignore', '.codeclimate.yml', '.editorconfig'];
  files.forEach(function(file){
    from = path.resolve(__dirname, file);
    to = path.resolve(file);
    result = fs.copy(from, to);
    if(typeof(result) != 'undefined'){
      console.log('livingdocs-apply-guides: Copied '+file);
    } else {
      console.log('livingdocs-apply-guides: Failed copying '+file);
    }
  });
} else {
  console.log('livingdocs-apply-guides: Not run from project root, no files copied.');
}
