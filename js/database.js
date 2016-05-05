/**
 * Created by EricGiri
 *              on 2016-05-03.
 */
var db;
function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + "(" + error.code + ")--" + error.message);
}

function successTransaction() {
    console.info("Success: Transaction successful");
}
var DB = {
    CreateDatabase: function () {
        var shortName = "ALlHDMovies";
        var version = "1.0";
        var displayName = "DB for AllHDMovies";
        var dbsize = 2 * 1024 * 1024;
        console.info("Creating Database....");
        db = openDatabase(shortName, version, displayName, dbsize,
            dbCreateSuccess);
        function dbCreateSuccess() {
            console.info("Success: Database creating successful");
        }
    },
    CreateTables: function () {
        function successCreateTable() {
            console.info("Table created successfully");
        }

        function txFunction(tx) {
            var option = [];
            var sql = "CREATE TABLE IF NOT EXISTS videos (" +
                "ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "videoID VARCHAR(55) NOT NULL," +
                "videoTitle TEXT NOT NULL," +
                "videoLabel VARCHAR(20) NOT NULL," +
                "dateAdded Date NOT NULL," +
                "videoType VARCHAR(20) NOT NULL," +
                "videoDescription TEXT);";

            tx.executeSql(sql, option, successCreateTable, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}
