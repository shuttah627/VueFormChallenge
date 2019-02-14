var post_destination = "http://webhook.site/84b6a30c-7906-44b4-935c-9b856b232584"

function sendData(questions) {
    alert("Sending data...")
    $.post(post_destination, function(data, status) {
        alert("MESSAGE SENT.\n"+data+"\nstatus\n"+status);
    }, "text")
    return 0;
}