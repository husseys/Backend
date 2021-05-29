var express = require('express');
var app = express();

// app.use(express.static('public'));
// app.get('/index.html', function handleHomePage(request, response){
//     response.sendFile(__dirname + "/" + "index.html");
// });

console.log("hello");



var server = app.listen(process.env.PORT || 3000, function ServerListner() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Using Forms and Express, listening at http://%s:$%s", host, port);
});