import compareVersions from 'compare-versions';
import download from 'download';
import findVersions from 'find-versions';
import fs from 'fs-extra';
import glob from 'glob';
import getPackagesVersions from 'packages-versions';
import { urlExists } from 'url-exists-promise';
import projectsMetaInfo from './projects-meta-info';

Promise.all(
  projectsMetaInfo.map(async (project) => {
    const docs = glob.sync(project.fileNamePattern);
    const availableVersions = docs.map((x) => findVersions(x)[0]).sort(compareVersions);
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

        try {
          if (urlExists(url)) {
            let data = await download(project.getDownloadUrl(version));
            fs.writeFileSync(`docs/v${version}/${project.name}-docs.json`, data);
          }
        } catch (error) {
          console.warn(`Missing Doc: ${url}`);
        }
      })
    );
  })
);
