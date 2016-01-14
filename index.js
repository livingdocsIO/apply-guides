#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var changeFiles = require('@boennemann/github-change-remote-files')

var token = process.env.GH_TOKEN

if (!token) throw new Error('Please provide a GH_TOKEN with write access in the environment')

var repos = require('./repos.json')

var filenames = ['coffeelint.json', '.coffeelintignore', '.codeclimate.yml', '.editorconfig', 'package.json']

var build = process.env.TRAVIS_BUILD_NUMBER !== 'undefined'
  ? process.env.TRAVIS_BUILD_NUMBER || ''
  : ''

var options = {
  filenames,
  transforms: [overwrite, overwrite, overwrite, overwrite, packageUpdate],
  token,
  message: `chore: update config files

${filenames.join(', ')}`,
  pr: {
    title: 'Update config files to the latest version',
    body: `Latest config files from [apply-guides](https://github.com/upfrontIO/apply-guides).

<sub>_Note: this PR is [automated](${'https://travis-ci.org/upfrontIO/apply-guides/builds/' + build}) and wasn\'t created by a human._</sub>`
  }
}

repos.forEach((repo) => {
  changeFiles(Object.assign(repo, options), (err, res) => {
    if (err) console.log(err.stack || err)
    if (res) console.log(`PR created ${res.html_url}`)
  })
})

function overwrite (content, filename) {
  return fs.readFileSync(path.join(__dirname, 'static', filename), 'utf8')
}

function packageUpdate (content) {
  try {
    var pkg = JSON.parse(content)
  } catch (e) {
    return null
  }

  if (pkg.devDependencies) delete pkg.devDependencies['livingdocs-apply-guides']

  pkg.engines = {
    node: '4',
    npm: '^3.5'
  }

  return JSON.stringify(pkg, null, 2) + '\n'
}