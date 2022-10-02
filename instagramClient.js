const { IgApiClient } = require('instagram-private-api');
const config = require('./config.json');

module.exports.InstagramClient = class InstagramClient {
    constructor(bots) {
      this.ig = new IgApiClient();
      this.bots = bots;
    }

    async login() {
      this.ig.state.generateDevice(config.instagram.username);
      await this.ig.account.login(config.instagram.username, config.instagram.password).then( () => console.log("[ LOG ] Instagram Client is running"));
    }
    
    async getAccountData() {
      const {follower_count, following_count} = await this.ig.user.info(this.ig.state.cookieUserId);
      console.log(`[ CLIENT / ${config.instagram.username} ] Followers: ${follower_count} | Following: ${following_count}`);
    }

    async getPendingFollows() {
      const pendingFriendships = await this.ig.feed.pendingFriendships().items();
      return pendingFriendships;
    }

    async run() {
      await this.getAccountData();
      console.log("[ LOG ] Waiting " + (config.timeout) + " minutes for pending follows...");
      setInterval(async() => {
        try{
          const pendingFollows = await this.getPendingFollows();
          if(pendingFollows.length > 0) {
            pendingFollows.forEach(async (user) => {
              this.ig.friendship.approve(user.pk).then(() => console.log(`[ CLIENT / ${config.instagram.username} ] Pending Follow Approved: ${user.username}`));
              await this.bots.follow(user.username);
              this.getAccountData();
            });
          }else{
            console.log("[ LOG ] No pending follows");
          }
        }catch(e){console.log(e)}
      }, (config.timeout * 60 * 1000));
    }  
}