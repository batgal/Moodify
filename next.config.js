require("dotenv").config();

module.exports = {
    env: {
        SPOTIFYLINK : process.env.SPOTIFYLINK,
        CLIENTID : process.env.CLIENTID,
        CLIENTSECRET : process.env.CLIENTSECRET
    },
};