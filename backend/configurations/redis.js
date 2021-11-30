const util = require('util');
var redis = require('redis');
var client = redis.createClient({
  port      : '6379',
  host      : '127.0.0.1',
  // password  : 'redispassword',
});

client.on('connect', function() {
    console.log('Redis Database connected'+'\n');
});

client.on('reconnecting', function() {
    console.log('Redis client reconnecting');
});

client.on('ready', function() {
    console.log('Redis client is ready');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.on('end', function() {
    console.log('\nRedis client disconnected');
    console.log('Server is going down now...');
    process.exit();
});

client.connect();

async function get(key) {
    try{ 
        const result = await client.get(key)
        return result
    }catch(err){
        return err
    }
}
function set (key, value) {
    try{    
        client.set(key, value, {'EX': 20, 'NX': true})
        return        
    }catch(err){
        return
    }  
}

module.exports = {
    get,set
}

