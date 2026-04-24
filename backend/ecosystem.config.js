module.exports = {
  apps: [{
    name: 'freesip-backend',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    merge_logs: true,
    date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
