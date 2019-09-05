//variables globales
let button = $("button");
let left = $("#leftR");
let start = $("#startR");
let filament = $("#filamentR");
let end = $("#endR");
let right = $("#rightR");
//array vacio para la sección de filaments, ya que necesitamos dos loops anidados.
var arrFilaments = [];

//funciones
button.click(function () {//busca palabra en la api y devuelve resultados
    $(".info").html("");//límpia los textbox al generar una nueva búsqueda
    var word = $("input").val();
    let lang = $("select").val();

    if (word.length != 0) {
        $.get(`https://api.gavagai.se/v3/lexicon/${lang}/${word}?apiKey=3acdef1f01cbceb88b132158abd466da`,
            (data) => {
                // console.log(data)
                //LEFT
                data.leftSideNeighbours.forEach(element => {
                    left.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);//permite seleccionar la respuesta
                });
                //START
                data.startsWithWords.forEach(element => {
                    start.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);
                });
                //FILAMENTS
                data.semanticallySimilarWordFilaments.forEach(element => {
                    element.words.forEach(loopA => arrFilaments.push(loopA.word))
                });
                arrFilaments = arrFilaments.slice(0, 10)
                arrFilaments.forEach(elements => {
                    filament.append(`<p onclick="getInfo(this.textContent)">${elements}</p>`);
                });
                //END
                data.endsWithWords.forEach(element => {
                    end.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);
                });
                //RIGHT
                data.rightSideNeighbours.forEach(element => {
                    right.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);
                });

            });
    } else {
        console.log("Vacio")
    };
});

function getInfo(intercambio) {//permite selecionar una palabra de las que nos ha devuelto la API y generar una nueva búsqueda.
    $("input").val(intercambio)
    var word = intercambio;
    $(".info").html("");
    let lang = $("select").val();

    if (word.length != 0) {
        $.get(`https://api.gavagai.se/v3/lexicon/${lang}/${word}?apiKey=3acdef1f01cbceb88b132158abd466da`,
            (data) => {
                console.log(data)
                //LEFT
                data.leftSideNeighbours.forEach(element => {
                    left.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);
                });
                //START
                data.startsWithWords.forEach(element => {
                    start.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);
                });
                //FILAMENTS
                data.semanticallySimilarWordFilaments.forEach(element => {
                    element.words.forEach(loopA => arrFilaments.push(loopA.word))
                });
                arrFilaments = arrFilaments.slice(0, 10)
                arrFilaments.forEach(elements => {
                    filament.append(`<p onclick="getInfo(this.textContent)">${elements}</p>`);
                });
                //END
                data.endsWithWords.forEach(element => {
                    end.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);
                });
                //RIGHT
                data.rightSideNeighbours.forEach(element => {
                    right.append(`<p onclick="getInfo(this.textContent)">${element.word}</p>`);
                });

            });
    } else {
        console.log("Vacio")
    };
}

