/**
 * Created by EricGiri
 *              on 2016-05-04.
 */
function validateForm() {
    var form = $("#videoForm");
    form.validate({
        rules: {
            videoID: {
                required: true
            },
            videoTitle: {
                required: true,
                rangelength: [3, 50]
            },
            videoLabel:{
                required:true
            },
            dateAdded:{
                required:true
            }
        },
        messages: {
            videoID: {
                required: "What is the VIDEO ID Bro ?"
            },
            videoTitle: {
                required: "You are Missing Title Bro !",
                rangelength: "50 Characters Expected"
            },
            videoLabel:{
                required:"Label is Required"
            },
            dateAdded:{
                required:"Missing Date Bro !"
            }
        }
    });
    return form.valid();
}