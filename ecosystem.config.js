module.exports = {
  apps : [{
    name: 'stack_lite',
    script: 'app.js',
    env_development: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    watch: true,
    instances: 0,
    exec_mode: "cluster",
    ignore_watch: ["node_modules"],

  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
