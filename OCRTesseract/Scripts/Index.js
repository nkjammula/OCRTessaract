$(document).ready(function () {
   //
    $('#dropImage').on(
        'dragover',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    );
    $('#dropImage').on(
        'dragenter',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    );
    $('#dropImage').on(
        'drop',
        function (e) {
            if (e.originalEvent.dataTransfer) {
                if (e.originalEvent.dataTransfer.files.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    var data = new FormData();
                    data.append("file", e.originalEvent.dataTransfer.files[0]);
                    readUrl(e.originalEvent.dataTransfer.files[0]);
                    $("#imagepreview").show();
                    /*UPLOAD FILES HERE*/
                    $("#renderTextFromImage").text("Extracting...");
                    $.ajax({
                        type: "POST",
                        url: '/Home/ProcessImage',
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            $("#renderTextFromImage").text(result.Text);
                            $("#meanConfidence #meanConfidenceValue").text(result.MeanConfidence + "%");
                        },
                        error: function (xhr, status, p3, p4) {
                            var err = "Error " + " " + status + " " + p3 + " " + p4;
                            if (xhr.responseText && xhr.responseText[0] == "{")
                                err = JSON.parse(xhr.responseText).Message;
                            console.log(err);
                        }
                    });
                }
            }
        }
    );
   
    function readUrl(input) {
        if (input) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagepreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input);
        }
    }
});