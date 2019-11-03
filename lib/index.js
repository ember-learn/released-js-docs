if (projectName === 'ember') {
  getProjectFileUrl = (v) => `https://unpkg.com/ember-source@${v}/docs/data.json`;
} else {
  getProjectFileUrl = (v) => `https://unpkg.com/ember-data@${v}/dist/docs/data.json`;
}
