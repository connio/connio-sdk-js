module.exports = {
  hooks: {
    'post-checkout': 'npm install',
    'post-merge': 'npm install',
  },
};
