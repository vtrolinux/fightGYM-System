# fightGYM-System
.env:  
EXPRESS_PORT=3000  
MONGO_DB_ADDRESS=localhost  
MONGO_DB_PORT=27017  
MONGO_DB_NAME=yourdbname  

JWT_SECRET=yoursecret  
JWT_EXPIRE_IN=5  

REDIS_PORT=6379  
REDIS_ADDRESS=127.0.0.1  

db.users.updateOne({_id :ObjectId("999999999999999999999") },{$set : {"adm":true}})
