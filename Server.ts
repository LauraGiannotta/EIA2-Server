import * as Http from "http";
import * as Url from "url";
import * as Database from "./Database";


// Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
let studiHomoAssoc: Studis = {};
let port: number = process.env.PORT;
if (port == undefined)
    port = 8200;

let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
});
server.addListener("request", handleRequest);
server.listen(port);

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    let query: AssocStringString = Url.parse(_request.url, true).query;
    var command: string = query["command"];

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

function insert(query: AssocStringString, _response: Http.ServerResponse): void {
    let obj: Studi = JSON.parse(query["data"]);
    let _name: string = obj.name;
    let _firstname: string = obj.firstname;
    let matrikel: string = obj.matrikel.toString();
    let _age: number = obj.age;
    let _gender: boolean = obj.gender;
    let _studiengang: string = obj.studiengang;
    let studi: Studi;
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

function refresh(_response: Http.ServerResponse): void {
    Database.findAll(function(json: string): void {
        respond(_response, json);
    });
}

function search(query: AssocStringString, _response: Http.ServerResponse): void {
    let studi: Studi = studiHomoAssoc[query["searchFor"]];
    if (studi) {
        let line: string = query["searchFor"] + ": ";
        line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
        line += studi.gender ? "(M)" : "(F)";
        _response.write(line);
    } else {
        _response.write("No Match");
    }
}

function error(): void {
    alert("Error");
}

function respond(_response: Http.ServerResponse, _text: string): void {
    //console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}

