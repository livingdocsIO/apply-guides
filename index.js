#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const changeFiles = require('@boennemann/github-change-remote-files')

const token = process.env.GH_TOKEN

if (!token) throw new Error('Please provide a GH_TOKEN with write access in the environment')

const repos = require('./repos.json')

const files = {
  '.eslintrc.json': overwrite,
  '.editorconfig': overwrite,
  'package.json': packageUpdate
}

const filenames = _.keys(files)

const build = process.env.TRAVIS_BUILD_ID !== 'undefined'
  ? process.env.TRAVIS_BUILD_ID || ''
  : ''

const options = {
  filenames,
  newBranch: `chore-apply-guides-${Date.now()}`,
  transforms: _.values(files),
  token,
  message: `chore: update config files

${filenames.join(', ')}`,
  pr: {
    title: 'Update config files to the latest version',
    body: `Latest config files from [apply-guides](https://github.com/livingdocsIO/apply-guides).

<sub>_Note: this PR is [automated](${`https://travis-ci.org/livingdocsIO/apply-guides/builds/\
${build}`}) and wasn't created by a human._</sub>`
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
  let pkg
  try {
    pkg = JSON.parse(content)
  } catch (e) {
    return null
  }

  if (pkg.devDependencies) delete pkg.devDependencies['livingdocs-apply-guides']

  pkg.engines = {
    node: '6',
    npm: '^3.10.8'
  }

  return `${JSON.stringify(pkg, null, 2)}\n`
}
