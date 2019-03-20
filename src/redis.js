

class RedisClient{
    constructor()
    {
        var redis = require("redis");
        var client = redis.createClient();
        
        client.on('connect', function() {
             console.log('Redis client connected');
         });
   

        client.on('error', function (err) {
                console.log('Something went wrong ' + err);
        });

        client.set('my test key', 'Probica', redis.print);
        client.get('my test key', function (error, result) {
         if (error) {
                console.log(error);
                throw error;
             }
        console.log('GET result ->' + result);
        });
    }
    proba()
    {
        console.log("USPEO SAM!");
    }
}
var myredis=new RedisClient();
module.exports=myredis;
