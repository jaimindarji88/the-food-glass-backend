var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

const config = {
    userName: 'jaimin',
    password: 'cryptoMemes123',
    server: 'jtt2018.database.windows.net',
    options: {
        database: 'Food_Nutrition',
        encrypt: true
    }
}

const connection = new Connection(config)

export default connection;