const { Bots } = require('./bots');
const { InstagramClient } = require('./instagramClient');

const bots = new Bots();
const instagramClient = new InstagramClient(bots);

(async () => {
    await instagramClient.login();
    await bots.login();
    await instagramClient.run();
})();