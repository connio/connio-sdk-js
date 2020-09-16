module.exports = {
  hooks: {
    'post-checkout': 'yarn install',
    'post-merge': 'yarn install',
  },
};
