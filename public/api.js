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
                            app.db.addPrefix(guildId, prefix)
                            if (guild) {
                                app.db.del
                                res.status(200).send({"status": "success", "message": "Prefix successfuly removed!"})
                                res.end();
                            } else {
                                res.status(400).send({"status": "success", "message": "Prefix successfuly removed!"})
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
                                res.status(200).send({"status": "success", "message": "Prefix successfuly removed!"})
                                res.end();
                            } else {
                                res.status(400).send({"status": "success", "message": "Prefix successfuly removed!"})
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
