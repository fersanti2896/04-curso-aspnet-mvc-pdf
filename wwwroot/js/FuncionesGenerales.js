
function envioGenericos( controlador, modelo, callback ) {
    $.ajax({
        type: 'POST',
        url: controlador,
        data: modelo,
        async: false,
        cache: false,
        success: function (resultado) {
            // Obtengo el tipo de dato del argumento callback
            tipoCallback = typeof (callback);

            if (tipoCallback === "function") {
                // Ejecuta la función callback teniendo como arg lo que respondio el server(resultado)
                callback(resultado);
            } else {
                $("#" + callback).html(resultado);
            }
        },
        error: function (errorHTML) {
            alert(controlador + ":" + JSON.stringify(errorHTML));
        },
        complete: function () {
        }
    });
}

function SetupDescarga() {
    $("#descargaPDF").click(function () {
        html2canvas($("#myChart"), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL("image/png");
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 5, 20);

                var nombrePDF = document.getElementById("panel").getAttribute("data-pdf");
                var tituloGrafica = document.getElementById("panel").getAttribute("data-title");

                doc.text(30, 20, tituloGrafica);
                doc.save(nombrePDF);
            }
        })
    })
}