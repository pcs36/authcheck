import mySql from 'mysql';

const dbConnection = mySql.createConnection({
    "host": process.env.HOST_NAME,
    "user": "root",
    "password": "",
    "database" : "api_server",
    "timezone": "UTC"
})

dbConnection.connect((error, response) => {
    if(error){
        console.log("Database connection failed", error);
    }
})
export default dbConnection;