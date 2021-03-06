module.exports = {
  branch: "master",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          {
            type: "docs",
            release: "major"
          },
          {
            type: "feat",
            release: "minor"
          },
          {
            type: "refactor",
            release: "patch"
          },
          {
            type: "fix",
            release: "patch"
          },
          {
            scope: "lib/*,.github/*",
            release: false
          }
        ]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/git"
  ]
};
