

$(document).ready(function () {

    // Se captura el evento del click sobre el botón de buscar
    $("#btnBuscarHeroe").click(function (e) { 
        e.preventDefault();

        const idHeroe = $("#numeroIngresado").val();

        // con el número ingresado se hace la búsqueda en el API de SuperHero.  No se valida el valor ingresado, debería hacerse
        $.ajax({

            type: "get",
            url: "https://superheroapi.com/api.php/10158496830855945/" + idHeroe,
            data: "application/json",

            success: function (datosHeroe) {

                //Si la búsqueda es exitosa se procede a colectar los datos del héroe
                console.log(1, "Success");

                const urlImagen = datosHeroe.image.url;
                const nombreHeroe = datosHeroe.name;
                const conexionesHeroe = datosHeroe.connections["group-affiliation"];
                const editorHeroe = datosHeroe.biography.publisher;
                const ocupacionHeroe = datosHeroe.work.occupation;
                const publicadoHeroe = datosHeroe.biography["first-appearance"];
                const alturaHeroe = datosHeroe.appearance.height;
                const pesoHeroe = datosHeroe.appearance.weight;
                const aliasHeroe = datosHeroe.biography.aliases


                // y se colocan en sus respectivos sitios en la página
                $("#imagenHeroe").attr("src", urlImagen);
                $("#heroeEncontrado").text("Heroe Encontrado");
                $("#nombreHeroe").html("<strong>Nombre:</strong> " + nombreHeroe);
                $("#ocupacionHeroe").html("<strong>Ocupación:</strong> " + ocupacionHeroe);
                $("#aliasHeroe").html("<strong>Alias:</strong> " + aliasHeroe);
                $("#conexionesHeroe").html("<strong>Conexiones:</strong> " + conexionesHeroe);
                $("#alturaHeroe").html("<strong>Altura:</strong> " + alturaHeroe);
                $("#pesoHeroe").html("<strong>Peso:</strong> " + pesoHeroe);
                $("#publicadoPor").html("<strong>Publicado por:</strong> " + editorHeroe);
                $("#primeraAparicion").html("<strong>Primera aparición:</strong> " + publicadoHeroe);


                // Ahora, para construir el gráfico de habiliaddes, se leen estas y se verifican que sean un número, en caso de no serlo, se pone un cero
                // Se construye un arreglo de objetos para pasarlo al gráfico
                let estadisticasHeroe = [];
                estadisticasHeroe.push({ label: "Inteligencia", y: isNaN(parseInt(datosHeroe.powerstats.intelligence)) ? 0 : parseInt(datosHeroe.powerstats.intelligence) });
                estadisticasHeroe.push({ label: "Fuerza",       y: isNaN(parseInt(datosHeroe.powerstats.strength)) ? 0 : parseInt(datosHeroe.powerstats.strength) });
                estadisticasHeroe.push({ label: "Velocidad",    y: isNaN(parseInt(datosHeroe.powerstats.speed)) ? 0 : parseInt(datosHeroe.powerstats.speed) });
                estadisticasHeroe.push({ label: "Resistencia",  y: isNaN(parseInt(datosHeroe.powerstats.durability)) ? 0 : parseInt(datosHeroe.powerstats.durability) });
                estadisticasHeroe.push({ label: "Poder",        y: isNaN(parseInt(datosHeroe.powerstats.power)) ? 0 : parseInt(datosHeroe.powerstats.power) });
                estadisticasHeroe.push({ label: "Combate",      y: isNaN(parseInt(datosHeroe.powerstats.combat)) ? 0 : parseInt(datosHeroe.powerstats.combat) });


                // Se crea un objeto con las características que tendrá el gráfico.  Esto es tomado de CanvasJS
                let objetoChart = {
                    exportEnabled: true,
                    animationEnabled: true,
                    title:{
                        text: "Estadísticas de " + nombreHeroe
                    },
                    axisX: {
                        title: "Tipo"
                    },
                    axisY: {
                        title: "Valor",
                    },
                    toolTip: {
                        shared: true
                    },
                    data: [{
                        type: "pie",
                        dataPoints: estadisticasHeroe
                    }]
                };

                // Se declara el gráfico y se renderiza en el sitio correspondiente
                let chart = new CanvasJS.Chart("areaGrafico", objetoChart);
                chart.render();


            },


            error: function (request, status, error) {
                console.log(1, "error");
                alert(error)
            }

        });



    });

});


