/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env:{
    cloudFlareAccount: "b34aad77a0649956f636aabd25654a21",
    cloudFlareToken: "126696776eccea97c410b5b001deafebf6bdd",
    cloudFlareEmail: "th.biabiany.dev@gmail.com",
    cloudFlareAuthKey: "126696776eccea97c410b5b001deafebf6bdd",
    mongodbPassword: "XmyABqJdssCfKqib",
    mongo_uri: "mongodb+srv://claquetteuuuh:XmyABqJdssCfKqib@cluster0.fspow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  },

}

module.exports = nextConfig