const { IgApiClient } = require('instagram-private-api');
const config = require('./config.json');

module.exports.Bots = class Bots {
    constructor() {
      config.bots.forEach((bot) => {
        this[bot.username] = new IgApiClient();
      });
    }
    async login() {
        try{
            config.bots.forEach(async (bot) => {
                this[bot.username].state.generateDevice(bot.username);
                config.proxy.enabled ? this[bot.username].state.proxyUrl = config.proxy.hosts[Math.floor(Math.random() * config.proxy.hosts.length)] : null;
                await this[bot.username].account.login(bot.username, bot.password).then((res) => console.log(`[ BOT ] Login Success: ${res.username}`));
            });
        }catch(e){console.log("Ha ocurrido un error: " + e)}
    }
    async follow(id) {
            config.bots.forEach(async (bot) => {
                try {
                    await this[bot.username].friendship.create(id).then((res) => console.log(`[ BOT / ${bot.username} ] Following: ${res.username}`))
                }catch (error) {
                    console.log("Ha ocurrido un error: " + error);
                }
            });
    }
};  