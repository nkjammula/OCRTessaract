$(document).ready(function () {
   //Capturing Drag Over, Drag enter and drop events on drop image DIV element
    $('#dropImage').on("dragover dragenter drop", function (event) {
        //Preventing default action and stopping event bubbling
        event.preventDefault();
        event.stopPropagation();
        //checking for drop event
        if (event.type === "drop") {
            //Getting content which is being transferred
            var transferContent = event.originalEvent.dataTransfer;
            if (transferContent) {
                if (transferContent.files.length) {
                    //Creating a new instance of Form data object
                    var data = new FormData();
                    //Appending Image Dropped to formData object
                    data.append("file", transferContent.files[0]);
                    //Passing Image as argument to Image Preview Function
                    readUrl(transferContent.files[0]);
                    $("#imagepreview").show();
                    /*UPLOAD FILES HERE*/
                    $("#renderTextFromImage").text("Extracting...");
                    //Ajax call for sending content to server side
                    $.ajax({
                        type: "POST",
                        url: '/Home/ProcessImage', //Controller/Action Method
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            //Extracting text and mean confidence values from Result JSON object
                            $("#renderTextFromImage").text(result.Text);
                            $("#meanConfidence #meanConfidenceValue").text(result.MeanConfidence + "%");
                        },
                        error: function(xhr, status, p3, p4) {
                            var err = "Error " + " " + status + " " + p3 + " " + p4;
                            if (xhr.responseText && xhr.responseText[0] == "{")
                                err = JSON.parse(xhr.responseText).Message;
                           console.log(err);
                        }
                    });
                }
            }
        } 
           
    });
    function readUrl(input) {
        if (input) {
            //Setting up image preview of dropped image
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagepreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input);
        }
    }
});