const { IgApiClient } = require('instagram-private-api');
const config = require('./config.json');
const { Bots } = require('./bots');

class InstagramClient {
  constructor() {
    this.ig = new IgApiClient();
  }

  async run() {

    const userInfo = await this.ig.user.info(this.ig.state.cookieUserId);
    console.log("Followers: " + userInfo.follower_count);
    console.log("Following: " + userInfo.following_count);

    const getWaitTime = () => (Math.random() * 5 * 60000) - (Math.random() * 1 * 60000);
    console.log("Waiting for " + (getWaitTime() / 1000)  + " seg");

    setInterval(async() => {
    try{
      const pendingFollows = await this.getPendingFollows();
      if(pendingFollows.length > 0) {
        pendingFollows.forEach(async (user) => {
          this.ig.friendship.approve(user.pk).then(res => console.log("Pending Follow Accepted: " + user.username));
          await bots.follow(user.username).then(res => console.log("Follow backed: " + user.username));
        });
      }
    }catch(e){console.log(e)}
  }, getWaitTime());
  }

  async login() {
    this.ig.state.generateDevice(config.instagram.username);
    await this.ig.account.login(config.instagram.username, config.instagram.password);
  }
  
  async follow(username) {
    const id = await this.ig.user.getIdByUsername(username)
    console.log("Following: " + username + " ,with id: " + id);
    await this.ig.friendship.create(id);
  }
  
  async getPendingFollows() {
    const pendingFriendships = await this.ig.feed.pendingFriendships().items();
    return pendingFriendships;
  }
}

const bots = new Bots();
const instagramClient = new InstagramClient();

(async () => {
    await instagramClient.login();
    await bots.login();
    await instagramClient.run();
})();