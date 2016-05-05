/**
 * Created by EricGiri
 *              on 2016-05-03.
 */
function addVideo() {
    if (validateForm()) {
        var videoID = $("#videoID").val();
        var videoTitle = $("#videoTitle").val();
        var videoLabel = $("#videoLabel").val();
        var dateAdded = $("#dateAdded").val();
        var videoType = $("#videoType").val();
        var description = $("#videoDescription").val();
        var options = [videoID, videoTitle, videoLabel, dateAdded, videoType, description];
        Videos.Insert(options);
        $(location).prop('href', '#HOMEPAGE');
    }
}

function displayVideo() {
    var ID = localStorage.getItem('id');
    var options = [ID];
    console.info("Showing review detail for " + ID);
    function processData(tx, results) {
        var row = results.rows[0];
        var videoID = row['videoID'];
        var html = "<a href='http://allhdmovies.net/yt.php?v="+videoID+"' target='_blank' <h3>" + row['videoTitle'] + "</h3></a>" +
            "<img src='http://i.ytimg.com/vi/" + row['videoID'] + "/hqdefault.jpg' width='300' height='240'/>" +
            "<p>Date Added: " + row['dateAdded'] + "</p>" +
            "<p>Source: " + row['videoType'] + "</p>" +
            "<p>Description: " + row['videoDescription'] + "</p>";

    html+="<iframe width='640' height='360' src='https://www.youtube.com/embed/"+videoID+"' frameborder='0' allowfullscreen></iframe>";

        $("#videoDetail").html(html);
    }
    Videos.Select(options, processData);
}

function updateVideo() {
    var ID = localStorage.getItem('id');
    var options = [ID];
}

function populateList() {
    function successSelectAll(tx, results) {
        console.info(results.rows.length);
        var htmlCode = "";
        if (results.rows.length > 0) {
            var numberOfItem = results.rows.length;
            for (var i = 0; i < numberOfItem; i++) {
                var row = results.rows[i];  // results.rows.item(i) also works;
                var videoID = row['videoID'];
                var url = "http://allhdmovies.net/yt.php?v=" + videoID;
                if (row['videoType'] == "Facebook") {
                    url = "http://allhdmovies.net/fb.php?v=" + videoID;
                }
                htmlCode += ["<li><a data-role='button' data-row-id='" + row['ID'] + "' href='" + url + "' target='_blank'>" +
                "<img src='http://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg' width='200' height='120'/>" +
                "<h3>" + row['videoTitle'] + "</h3>" +
                "<p>Date Added: " + row['dateAdded'] + "</p>" +
                "<p>Source: " + row['videoType'] + "</p>" +
                "<p>Description: " + row['videoDescription'] + "</p>" +
                "</a></li>"];
            }
        }
        else {
            alert("No Record Found");
        }

        var lv = $("#videoList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
    }

    Videos.SelectAll(successSelectAll);
}

function populateList1() {
    function successSelectAll(tx, results) {
        console.info(results.rows.length);
        var htmlCode = "";
        if (results.rows.length > 0) {
            var numberOfItem = results.rows.length;
            for (var i = 0; i < numberOfItem; i++) {
                var row = results.rows[i];  // results.rows.item(i) also works;
                var videoID = row['videoID'];
                var url = "http://allhdmovies.net/yt.php?v=" + videoID;
                if (row['videoType'] == "Facebook") {
                    url = "http://allhdmovies.net/fb.php?v=" + videoID;
                }
                htmlCode += ["<li><a data-role='button' data-row-id='" + row['ID']+"' href='#'>" +
                "<img src='http://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg' width='200' height='120'/>" +
                "<h3>" + row['videoTitle'] + "</h3>" +
                "<p>Date Added: " + row['dateAdded'] + "</p>" +
                "<p>Source: " + row['videoType'] + "</p>" +
                "<p>Description: " + row['videoDescription'] + "</p>" +
                "</a></li>"];
            }
        }
        else {
            alert("No Record Found");
        }

        var lv = $("#videoList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        $("#videoList a").on("click", clickHandler);
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#VideoPage');
        }
    }
    Videos.SelectAll(successSelectAll);
}

function DeleteVideo() {
    var id = localStorage.getItem("id");
    var option = [id];
    var response = confirm("Do you really want to delete ?");
    if (response) {
        Videos.Delete(option);
        $(location).prop('href', '#HOMEPAGE');
    }
}
