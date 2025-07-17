module.exports = {
  apps: [
    {
      name: 'cybersec-assistant',
      script: './dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
