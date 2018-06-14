"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
// Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
let studiHomoAssoc = {};
let port = process.env.PORT;
if (port == undefined)
    port = 8200;
let server = Http.createServer((_request, _response) => {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
});
server.addListener("request", handleRequest);
server.listen(port);
function handleRequest(_request, _response) {
    let query = Url.parse(_request.url, true).query;
    var command = query["command"];
    if (query["command"]) {
        switch (query["command"]) {
            case "insert":
                insert(query, _response);
                break;
            case "refresh":
                refresh(_response);
                break;
            case "search":
                search(query, _response);
                break;
            default:
                error();
        }
    }
    _response.end();
}
function insert(query, _response) {
    let obj = JSON.parse(query["data"]);
    let _name = obj.name;
    let _firstname = obj.firstname;
    let matrikel = obj.matrikel.toString();
    let _age = obj.age;
    let _gender = obj.gender;
    let _studiengang = obj.studiengang;
    let studi;
    studi = {
        name: _name,
        firstname: _firstname,
        matrikel: parseInt(matrikel),
        age: _age,
        gender: _gender,
        studiengang: _studiengang
    };
    Database.insert(studi);
    respond(_response, "storing data");
}
function refresh(_response) {
    Database.findAll(function (json) {
        respond(_response, json);
    });
}
function search(query, _response) {
    let studi = studiHomoAssoc[query["searchFor"]];
    if (studi) {
        let line = query["searchFor"] + ": ";
        line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
        line += studi.gender ? "(M)" : "(F)";
        _response.write(line);
    }
    else {
        _response.write("No Match");
    }
}
function error() {
    alert("Error");
}
function respond(_response, _text) {
    //console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map