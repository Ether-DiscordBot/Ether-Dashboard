module.exports = (app) => {
    app.route('/api/prefix')
        .post(function (req, res) {
            if (req.headers.cookie) {
                const userToken = req.cookies.__cfduid;
                const cookies = req.headers.cookie.split(/[;\s=]+/)
                if (cookies[cookies.indexOf("__cfduid")+1] == userToken) {
                    const prefix = req.body.prefix;
                    const guildId = req.body.guild;
                    if (!prefix) {
                        res.status(403).send({"status": "error", "message": "Prefix is empty."})
                        res.end();
                    } else if (guildId) {
                        app.db.getGuild(guildId)
                        .then(guild => {
                            if (guild.prefix.length < 5) {
                                app.db.addPrefix(guildId, prefix)
                                if (guild) {
                                    app.db.del
                                    res.status(200).send({"status": "success", "message": "Prefix successfuly added!", "prefixes": guild.prefix})
                                    res.end();
                                }
                            } else {
                                res.status(401).send({"status": "error", "message": "Limit reached!"})
                                res.end();
                            }
                            res.status()
                        })
                    } else {
                        res.status(400).send({"status": "error", "message": "Missing argument."})
                        res.end();
                    }
                } else {
                    res.status(401).send({"status": "error", "message": "Invalid token!" })
                    res.end();
                }
            } else {
                res.status(401).send({"status": "error", "message": "Expired session!"})
                res.end();
            }
        })
        .delete(function (req, res) {
            if (req.headers.cookie) {
                const userToken = req.cookies.__cfduid;
                const cookies = req.headers.cookie.split(/[;\s=]+/)
                if (cookies[cookies.indexOf("__cfduid")+1] == userToken) {
                    const prefixIndex = req.body.prefix;
                    const guildId = req.body.guild;
                    if (isNaN(prefixIndex)) {
                        res.status(403).send({"status": "error", "message": "Prefix index is NaN."})
                        res.end();
                    } else if (guildId) {
                        app.db.getGuild(guildId)
                        .then(guild => {
                            app.db.delPrefix(guildId, guild.prefix[prefixIndex])
                            if (guild) {
                                app.db.del
                                res.status(200).send({"status": "success", "message": "Prefix successfuly removed!", "prefixes": guild.prefix})
                                res.end();
                            }
                        })
                    } else {
                        res.status(400).send({"status": "error", "message": "Missing argument."})
                        res.end();
                    }
                } else {
                    res.status(401).send({"status": "error", "message": "Invalid token!" })
                    res.end();
                }
            } else {
                res.status(401).send({"status": "error", "message": "Expired session!"})
                res.end();
            }
        })

    app.route('/api/nickname')
        .post(function(req, res) {
            if (req.headers.cookie) {
                const userToken = req.cookies.__cfduid;
                const cookies = req.headers.cookie.split(/[;\s=]+/)
                if (cookies[cookies.indexOf("__cfduid")+1] == userToken) {
                    const newNickname = req.body.nickname;
                    const guildId = req.body.guild;
                    if (newNickname == undefined) {
                        res.status(403).send({"status": "error", "message": "Nickname is undefined."})
                        res.end();
                    } else if (newNickname.length > 32) {
                        res.status(401).send({"status": "error", "message": "Nickname to long."})
                        res.end();
                    } else if (guildId) {
                        app.db.getGuild(guildId)
                        .then(guild => {
                            app.bot.guilds.cache.find(guild => guild == guildId).members.cache.find(m => m.id == app.bot.user.id).setNickname(newNickname);
                            if (guild) {
                                app.db.del
                                res.status(200).send({"status": "success", "message": "Nickname successfuly changed!", "nickname": newNickname})
                                res.end();
                            }
                        })
                    } else {
                        res.status(400).send({"status": "error", "message": "Missing argument."})
                        res.end();
                    }
                } else {
                    res.status(401).send({"status": "error", "message": "Invalid token!" })
                    res.end();
                }
            } else {
                res.status(401).send({"status": "error", "message": "Expired session!"})
                res.end();
            }
        })
}
