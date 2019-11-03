const fs = require('fs-extra');
const glob = require('glob');
const findVersions = require('find-versions');
const compareVersions = require('compare-versions');
const findLatestPatchVersions = require('find-latest-patch-versions');

if (fs.pathExistsSync('dist')) {
  fs.removeSync('dist');
}

const availableProjects = [
  {
    name: 'ember',
    fileNamePattern: 'docs/**/ember-docs.json'
  },
  {
    name: 'ember-data',
    fileNamePattern: 'docs/**/ember-data-docs.json'
  }
];

fs.mkdirSync('dist');

availableProjects.map((project) => {
  fs.mkdirSync(`dist/${project.name}`);

  const docs = glob.sync(project.fileNamePattern);
  const availableVersions = docs.map((x) => findVersions(x)[0]).sort(compareVersions);

  const versionsToPublish = findLatestPatchVersions(availableVersions);

  docs.forEach((doc) => {
    const version = findVersions(doc)[0];

    if (versionsToPublish.includes(version)) {
      fs.copyFileSync(doc, `dist/${project.name}/${version}.json`);
    }
  });
});
