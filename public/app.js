$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append (
            "<p data-id='" + data[i]._id + "'>" +
            data[i].title +
            "<button class='comment'>" +
            "Comment" +
            "</button>" +
            "<br />" +
            "<a href=" + data[i].link + ">" +
            data[i].link +
            "</a>" +
            "</p>"
        );
    };
});