require('dotenv').config();

const Credentials = () => {

    return {
        ClientId: process.env.CLIENTID,
        ClientSecret: process.env.CLIENTSECRET
    }
}

export { Credentials };