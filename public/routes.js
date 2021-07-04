const path = require('path');

module.exports = (app) => {
	app.get('/', function (req, res) {
		if (req.query.code) {
			return res.redirect(`/callback?code=${req.query.code}`)
		}
		if (req.cookies.__cfduid) {
			app.utils.identify(req.cookies)
			.then((resp) => {
				res.render('./pages/index.ejs', {
					data: {
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
			res.render('./pages/index.ejs', {
				data: {
					current: "index",
				}
			})
		}
	})

	app.get('/servers', function (req, res) {
		if (req.cookies.__cfduid) {
			var guilds = []
			app.utils.identify(req.cookies)
			.then((resp) => {
				resp.guilds.forEach(function(g) { 
					if (g.permissions_new >= 137438953471) {
						g.is_member = app.bot.guilds.cache.find(guild => guild == g.id) != undefined;
						guilds.push(g);
					}	
				})
				res.render('./pages/servers.ejs', {
					data: {
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
			res.redirect("https://discord.com/api/oauth2/authorize?client_id=693456698299383829&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20guilds")
		}
	})

	app.get('/guild/:id', (req, res) => {
			if (req.cookies.__cfduid) {
			app.utils.identify(req.cookies)
			.then((resp) => {
				let guild = resp.guilds.find(g => g.id == req.params.id && g.permissions_new >= 137438953471)
				if (guild) {
					app.db.getGuild(guild.id)
					.then(dbGuild => {
						res.render('./pages/guild.ejs', {
							data: {
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
			res.redirect("https://discord.com/api/oauth2/authorize?client_id=693456698299383829&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20guilds")
		}
	})
	
	app.get('/logout', (req, res) => {
		res.cookie("__cfduid", '', { maxAge: 0 });
		res.redirect('/')
	})
	
	app.get('/callback', (req, res) => {
		app.utils.getToken(req.query.code)
		.then(data => {
			if (!data.error) {
				res.cookie("__cfduid", data.access_token, { maxAge: data.expires_in * 1000});
				res.redirect('/')
			}
		})
	})

	app.get('/premium', (req, res) => {
		res.redirect("https://www.youtube.com/watch?v=mi9QtsWyyVc");
	})
	
	// Get file in src folder
	app.get('/src/:type/:file', function (req, res) {res.sendFile(path.join(__dirname, `../src/${req.params.type + "/" + req.params.file}`))});

}
