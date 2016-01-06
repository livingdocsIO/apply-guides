#!/usr/bin/env node

path = require('path');
fs = require('fs-sync');
rootPath = path.resolve('../..')

if(fs.exists(path.join(rootPath, 'package.json'))){
  files = ['coffeelint.json', '.coffeelintignore', '.codeclimate.yml', '.editorconfig'];
  files.forEach(function(file){
    from = path.join(__dirname, file);
    to = path.join(rootPath, file);
    result = fs.copy(from, to, {force: true});

    if(result){
      console.log('livingdocs-apply-guides: Copied '+file);
    } else {
      console.log('livingdocs-apply-guides: Failed copying '+file);
    }
  });
} else {
  console.log('livingdocs-apply-guides: Not run from project root, no files copied.');
}
