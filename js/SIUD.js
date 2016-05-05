/**
 * Created by EricGiri
 *              on 2016-05-03.
 */
var Videos = {
    Insert: function(options){
        function txFunction(tx){
            var sql = "INSERT INTO videos(videoID, videoTitle, videoLabel, dateAdded, videoType, videoDescription) values(?,?,?,?,?,?);";

            function successInsert() {
                console.info("Successfully Inserted");
                alert("New Video Added");
        }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    SelectAll: function (callBack) {
        var options = [];

        function txFunction(tx) {
            console.info("Selecting all records");
            var sql = "SELECT * FROM videos;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    Select: function (options, callBack) {
        function txFunction(tx) {
            console.info("Selecting one record");
            var sql = "SELECT * FROM videos WHERE ID = ?;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    Delete: function (options) {

        function successDelete() {
            console.info("Success: Delete successful");
            alert("Record deleted successfully");
        }
        function txFunction(tx) {
            console.info("Deleting ..");
            var sql = "DELETE FROM videos " +
                "WHERE ID=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};