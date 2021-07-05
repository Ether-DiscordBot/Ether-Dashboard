const fetch = require('node-fetch');

module.exports = (app) => {
    app.utils = {
        getToken: (code) => {
            const data = {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: `https://z7b9cefb1-gtw.qovery.io/`,
                code: code,
                scope: 'identify guilds',
              };

              let request = fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams(data),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              })
              return request.then(res => res.json())
        },

        identify: (cookies) => {
            if (cookies) {
                const url = `https://discord.com/api/users/@me`;
                const request = fetch(url, {
                    headers: {
                        authorization: `Bearer ${cookies.__cfduid}`
                    }
                })
                return request.then(res => res.json())
                .then(data => {
                    const guildUrl = `https://discord.com/api/users/@me/guilds`;
                    const guildRequest = fetch(guildUrl, {
                        headers: {
                            authorization: `Bearer ${cookies.__cfduid}`
                        }
                    })
                    return guildRequest.then(res => res.json())
                    .then(gData => {
                        data.guilds = gData;
                        return data
                    })
                })
            } else {
                return false
            }
        },

    }
}
