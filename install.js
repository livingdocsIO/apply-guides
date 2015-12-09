#!/usr/bin/env node

var Validate = require('git-validate');
Validate.copy('coffeelint.json', 'coffeelint.json');
Validate.copy('.coffeelintignore.json', '.coffeelintignore.json');
Validate.copy('.codeclimate.yml', '.codeclimate.yml');
Validate.copy('.editorconfig', '.editorconfig');
