

// Struktur des heterogenen assoziativen Arrays als Datensatz für eine studierende Person

interface Studi {

    name: string;

    firstname: string;

    matrikel: number;

    age: number;

    gender: boolean;

    studiengang: string;

}



// Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist

interface Studis {
    [matrikel: string]: Studi;

}



// Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer

let studiHomoAssoc: Studis = {};


