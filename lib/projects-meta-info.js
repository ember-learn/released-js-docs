const projectsMetaInfo = [
  {
    name: 'ember',
    npmPackageName: 'ember-source',
    fileNamePattern: 'docs/**/ember-docs.json',
    getDownloadUrl: (version) => `https://unpkg.com/ember-source@${version}/docs/data.json`
  },
  {
    name: 'ember-data',
    npmPackageName: 'ember-data',
    fileNamePattern: 'docs/**/ember-data-docs.json',
    getDownloadUrl: (version) => `https://unpkg.com/ember-data@${version}/dist/docs/data.json`
  }
];

export default projectsMetaInfo;
