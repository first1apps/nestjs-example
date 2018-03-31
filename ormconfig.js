const config = require('config');
function getDbConnectionOptions() {
    const dbConnection = config.get('dbConnection');
    const migrationFolder = "migration";
    const dbConnectionOptions = {
        "type": "postgres",
        "schema": "public",
        "host": dbConnection.host,
        "port": dbConnection.port,
        "username": dbConnection.user,
        "password": dbConnection.password,
        "database": dbConnection.database,
        "ssl": dbConnection.ssl,
        "synchronize": false, // DO NOT EVER SET TO TRUE, EVEN IN DEVELOPMENT
        "logging": false,
        "entities": [],
        "migrations": [
            `${migrationFolder}/**/*.ts`
        ],
        "cli": {
            "migrationsDir": migrationFolder
        }
    };
    return dbConnectionOptions;
}
module.exports = exports = getDbConnectionOptions();
