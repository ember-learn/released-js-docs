import compareVersions from 'compare-versions';
import findLatestPatchVersions from 'find-latest-patch-versions';
import findVersions from 'find-versions';
import fs from 'fs-extra';
import glob from 'glob';
import projectsMetaInfo from './projects-meta-info';

if (fs.pathExistsSync('dist')) {
  fs.removeSync('dist');
}

fs.mkdirSync('dist');

projectsMetaInfo.map((project) => {
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
