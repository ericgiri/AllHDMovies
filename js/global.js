/**
 * Created by EricGiri
 *              on 2016-05-03.
 */
function setCurrentDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10)
    {
        dd = '0' + dd
    }
    if (mm < 10)
    {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    $("#dateAdded").val(today);
}

function videoDetail_show() {
    displayVideo();
}

function btnSubmit_click() {
        addVideo();
}

function btnUpdate_click() {
    updateVideo();
    $("#publishOrUpdate").val("update");
    $(location).prop('href', '#ADDPAGE')
}

function btnDelete_click() {
    DeleteVideo();
}

function init() {
    $("#btnSubmit").on("click", btnSubmit_click);
    $("#videoList").on("click", videoDetail_show);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    setCurrentDate();
}

function initDB()
{
    console.info("Creating Database");
    try{
        DB.CreateDatabase();
        if (db) {
            console.info("Creating tables");
            DB.CreateTables();
        }
        else{
            console.error("Error: Cannot create tables: Database not available!");
        }
    }catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed" );
    }
}

$(document).ready(function () {
    init();
    initDB();
    populateList1();
});

