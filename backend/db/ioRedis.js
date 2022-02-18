const Redis = require("ioredis");
const util = require("util");

const client = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_ADDRESS, // Redis host
    //family: 4, // 4 (IPv4) or 6 (IPv6)
    //password: "auth",
    //db: 0,
  });

function get(value) {
  const syncRedisGet = util.promisify(client.get).bind(client);
  return syncRedisGet(value);
}

function set(key, value) {
  const syncRedisSet = util.promisify(client.set).bind(client);
  return syncRedisSet(key, value, 'EX', 10);
}
// voce pode rodar : node -e 'require("./redisIO.js").set(66,59)' em algum terminal para testar sem chamar o provider
module.exports = { client, get, set };
