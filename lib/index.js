import compareVersions from 'compare-versions';
import download from 'download';
import findVersions from 'find-versions';
import fs from 'fs-extra';
import glob from 'glob';
import getPackagesVersions from 'packages-versions';
import projectsMetaInfo from './projects-meta-info';

Promise.all(
  projectsMetaInfo.map(async (project) => {
    const docs = glob.sync(project.fileNamePattern);
    const availableVersions = docs
      .map((x) => findVersions(x)[0])
      .sort(compareVersions);
    const versionsOnNpm = await getPackagesVersions(project.npmPackageName);

    const versionsToProcess = [...versionsOnNpm].filter((releasedVersion) => {
      return (
        releasedVersion.search(/alpha|beta|canary/g) === -1 &&
        !availableVersions.includes(releasedVersion)
      );
    });

    return await Promise.all(
      versionsToProcess.map(async (version) => {
        let url = project.getDownloadUrl(version);
        let output = `docs/v${version}/${project.name}-docs.json`;

        try {
          let data = await download(url);
          fs.outputFileSync(output, data);
        } catch (error) {
          // Ember data started publishing docs to npm since 3.11.1, so some prev docs will be missing
          if (
            (project.name === 'ember-data' &&
            compareVersions(version, '3.11.1') > 0) || project.name !== 'ember-data'
          ) {
            console.warn(`Missing Doc: ${url}`);
          }
        }
      })
    );
  })
);
