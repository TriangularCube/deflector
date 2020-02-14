module.exports = {
    apps : [
        {
            name: 'deflector-server',
            script: 'server.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            autorestart: true,
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
