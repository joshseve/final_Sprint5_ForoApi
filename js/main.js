// Conectando con la API
var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

// Creando la Plantilla General
var plantillaEntrada = '<tr data-id=__id__>' +
		'<td>__tema__</td>' +
		'<td>__autor__</td>' +
		'<td>' +
		'<span data-toggle="modal" data-target="#modal-inf" class="glyphicon glyphicon-eye-open"></span>' +
		'<span class="glyphicon glyphicon-pencil"></span>' +
		'<span class="glyphicon glyphicon-remove"></span>' +
		'</td>'+
		'</tr>'

// Creando la Plantilla de Iconos
var plantillaIconos=  '<td>' +
          '<span class="glyphicon glyphicon-eye-open"></span>' +
					'        .        ' +
          '<span class="glyphicon glyphicon-pencil"></span>'+
					'        .        ' +
          '<span class="glyphicon glyphicon-remove"></span>'+
        	'</td>';

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTemas();
  $("#add-form").submit(agregarTema);
};

var cargarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(crearTema);
  });
}

var crearTema = function (tema) {
  var tema = autor.name;
  var id=tema=tema._id;
  var $tr = $("<tr />");
  $tr.attr("data-id", id);

  var $autorTd = $("<td />");
  $autorTd.text(autor);
  $tr.append($autorTd);
  $tr.append(plantillaIconos);
  $tasksList.append($tr);
};

var agregarTema = function (e) {
  e.preventDefault();
  var autor = $("#autor-tema").val();
  $.post(api.url, {
    name: autor
  }, function (tema) {
    crearTema(tema);
    $("#myModal").modal("hide");
  });
};

var borrarTema=function(){
  //obtener el valor del id con DOM
  var id=$(this).parents("tr").data('id');
  $.ajax({
    url:api.url+id,
    type:"DELETE",
    success: function(data){

			cargarTemas();
    }
  });

  $(this).parents("tr").remove();
}

var infoTemas = function () {
	var idTema =  $(this).parents("tr").data('id');
	var urlID = api.url + idTema;

	$.getJSON(urlID,function(response){

		var autor = response.name;
		var id = response._id;

		mostrarInfoTemas(autor, id);
	});
};

var mostrarInfoTema = function (autor, id) {
	$("#name").text(autor);
 	$("#id").text(id);
}

//Intentando el filtrado, pero desconfigure la entrada de Temas!!!
var filtrarTemas = function (e) {
    e.preventDefault();
    var criterioBusqueda = $("#search").val().toLowerCase();
    var temasFiltrados = temas.filter(function (temas) {
        return temas.autor.toLowerCase().indexOf(criterioBusqueda) >= 0;
    });
    mostrarTemas(temasFiltrados);
};


$(document).on("click", ".glyphicon-eye-open", infoTemas);
//agrego el "on" que tiene el evento click, en la clase del icon Borrar, haciendo lo que diga Borrar Tema.
$(document).on("click", ".glyphicon-remove", borrarTema);

//Cargando la pagina
$(document).ready(cargarPagina);
