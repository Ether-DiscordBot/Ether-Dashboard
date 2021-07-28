const { resolveMx } = require('dns');
const path = require('path');

module.exports = (app) => {
	app.get('/', function (req, res) {
		if (req.query.code) {
			return res.redirect('/callback?code=' + req.query.code)
		}
		if (req.cookies.__cfduid) {
			return app.utils.identify(req.cookies)
			.then((resp) => {
				res.render('./pages/index.ejs', {
					data: {
						aouth2Link: app.aouth2Link,
						current: "index",
						user: {
							name: resp.username,
							disc: resp.discriminator,
							id: resp.id,
							avatar: resp.avatar
						}
					}
				})
			})
		} else {
			return res.render('./pages/index.ejs', {
				data: {
					aouth2Link: app.aouth2Link,
					current: "index",
				}
			})
		}
	})

	app.get('/servers', function (req, res) {
		if (req.cookies.__cfduid) {
			let guilds = []
			app.utils.identify(req.cookies)
			.then((resp) => {
				resp.guilds.forEach(function(g) {
					if (g.permissions_new >= 274877906943) {
						g.is_member = app.bot.guilds.cache.find(guild => guild == g.id) != undefined;
						guilds.push(g);
					}
				})
				res.render('./pages/servers.ejs', {
					data: {
						clientId: app.client_id,
						aouth2Link: app.aouth2Link,
						user: {
							current: "servers",
							name: resp.username,
							disc: resp.discriminator,
							id: resp.id,
							avatar: resp.avatar
						},
						guilds: guilds
					}
				})
			})
		} else {
			res.redirect(app.aouth2Link)
		}
	})

	app.get('/guild/:id', (req, res) => {
			if (req.cookies.__cfduid) {
			app.utils.identify(req.cookies)
			.then((resp) => {
				if (resp.guilds.message) {return}
				let guild = resp.guilds.find(g => g.id == req.params.id && g.permissions_new >= 274877906943)
				if (guild) {
					app.db.getGuild(guild.id)
					.then(dbGuild => {
						res.render('./pages/guild.ejs', {
							data: {
								aouth2Link: app.aouth2Link,
								user: {
									current: "servers",
									name: resp.username,
									disc: resp.discriminator,
									id: resp.id,
									avatar: resp.avatar
								},
								guild: guild,
								db_guild: dbGuild
							}
						})
					})
				} else {
					res.redirect('/')
				}
			})
		} else {
			res.redirect(app.aouth2Link)
		}
	})

	app.get('/logout', (req, res) => {
		res.cookie("__cfduid", '', { maxAge: 0 });
		res.redirect('/')
	})

	app.get('/premium', (req, res) => {
		res.redirect("https://www.youtube.com/watch?v=mi9QtsWyyVc");
	})

	app.get('/callback', (req, res) => {
		app.utils.getToken(req.query.code)
		.then(data => {
			if (!data.error) {
				res.cookie("__cfduid", data.access_token, { maxAge: data.expires_in * 1000 });
				res.redirect("/")
			} else {
				res.send(data)
			}
		})
		return
	})

	// Get file in src folder
	app.get('/src/:type/:file', function (req, res) {res.sendFile(path.join(__dirname, `../src/${req.params.type + "/" + req.params.file}`))});

}
