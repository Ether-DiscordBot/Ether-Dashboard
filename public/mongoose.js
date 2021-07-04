const mongoose = require(`mongoose`);
const Long = require('mongodb').Long;

require('dotenv').config()

const Guild = mongoose.model('guilds', new mongoose.Schema({
    id: String,
    prefix: {
        type: Array
    }
}))

class DB {
    constructor(app) {
        const mongOption = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			autoIndex: false, // Don't build indexes
			poolSize: 10, // Maintain up to 10 socket connections
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
			family: 4 // Use IPv4, skip trying IPv6
		}
        try {
			mongoose.connect(process.env.MONGO_URI, mongOption);
        } catch (error) {
			console.error(error);
        }
		mongoose.Promise = global.Promise;
		mongoose.connection.on("connected", () => {
            console.log("Mongoose has been connected.")
            this.db = mongoose.connection.db
        })
    }

    async getGuild(guild_id) {
        return await Guild.findOne({id: guild_id});
    }

    async addPrefix(guild_id, prefix) {
        await Guild.findOneAndUpdate({ id: guild_id }, { $push: { prefix: prefix } })
    }

    async delPrefix(guild_id, prefix) {
        await Guild.findOneAndUpdate({ id: guild_id }, { $pull: { "prefix": prefix } })
    }
}

module.exports.db = DB;