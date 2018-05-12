"use strict";
const Http = require("http");
const Url = require("url");
var Node;
(function (Node) {
    let port = process.env.PORT; //process.env.PORT wird als Umgebungsvar festgelegt f�r den gegebenen PORT
    if (port == undefined)
        port = 8100; //dann port = 8100
    let server = Http.createServer(); //eigenen server creieren
    server.addListener("listening", handleListen); //wenn server 'listening dann function handleListen aufrufen
    server.addListener("request", handleRequest); //sever 'requeste' reagieren beibringen
    server.listen(port);
    function handleListen() {
        console.log("Ich h�re?"); //ausgabe in console oder terminal
    }
    function handleRequest(_request, _response) {
        console.log("Ich h�re Stimmen!");
        let query = Url.parse(_request.url, true).query; //�bersetzung in assoziatives array und umwandeln in js (/?a=10&b=20)
        let a = parseInt(query["a"]);
        let b = parseInt(query["b"]);
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write("Ich habe dich geh�rt<br/>");
        for (let key in query)
            _response.write("Die eingegebenen Query-Informationen: " + (query[key]) + "<br>");
        _response.write("Das Ergebnis lautet:" + (a + b));
        _response.end();
    }
})(Node || (Node = {}));
//# sourceMappingURL=Server.js.map