 'use strict';
   $(document).ready(function() {
       var miTabla = $('#miTabla').DataTable({
            "columnDefs": [
                {
                    "targets": [ 0, 3 ],
                    "visible": false,
                    "searchable":  false
                },
                {
                    "targets": [ 5, 6 ],
                    "orderable": false
                }
            ],
           'processing': true,
           'serverSide': true,
           'ajax': 'php/cargar_vdoctores.php',
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           },
           'columns': [{
               'data': 'id_doctor'
           }, {
               'data': 'nombre_doctor'
           }, {
               'data': 'numcolegiado'
           }, {
               'data': 'id_clinica'
           }, {
               'data': 'id_clinica',               
               'render': function(data) {
$.ajax({
    url: 'http://localhost/practica-ajax-datatables/app/php/cargar_clinicas.php',    
    // Si todo va bien muestra la salida (previamente formateada en php) en localidad
    success: function(output) {
        $("#clinicas").html(output);
    },
    // Si no va bien muestra el error
    error: function (xhr, ajaxOptions, thrownError) {
        $('#clinicas').val(aData.nombre_clinica);
        alert(xhr.status + " "+ thrownError);
}});
                   return '';
               }
           }, {
               'data': 'id_clinica',               
               'render': function(data) {
                   return '<a class="btn btn-primary editarbtn" href=http://localhost/php/editar.php?id_clinica=' + data + '>Editar</a>';
               }
           }, {
               'data': 'id_clinica',               
               'render': function(data) {
                   return '<a class="btn btn-warning borrarbtn" href=http://localhost/php/borrar.php?id_clinica=' + data + '>Borrar</a>';
               }
           }]
       });

       $('#miTabla').on('click', '.editarbtn', function(e) {
          e.preventDefault();
          $('#tabla').fadeOut(100);
          $('#formulario').fadeIn(100);
          var nRow = $(this).parents('tr')[0];
          var aData = miTabla.row(nRow).data();
          // Carga todas las clinicas en el select
          $.ajax({
              url: 'http://localhost/practica-ajax-datatables/app/php/cargar_clinicas.php',    
              // Si todo va bien muestra la salida (previamente formateada en php) en localidad
              success: function(output) {
                  $("#clinicas").html(output);
              },
              // Si no va bien muestra el error
              error: function (xhr, ajaxOptions, thrownError) {
                  $('#clinicas').val(aData.nombre_clinica);
                  alert(xhr.status + " "+ thrownError);
          }});
          $('#nombre').val(aData.nombre_doctor);
          $('#numColegiado').val(aData.numcolegiado);
          /*$('#clinicas').val(aData.id_clinica);*/
       });

       $('#miTabla').on('click', '.borrarbtn', function(e) {
           e.preventDefault();
           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           var idClinica = aData.idClinica;

           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/borrar_clinica.php',
               data: {
                   id_clinica: idClinica
               },
               error: function(xhr, status, error) {
                   alert("Ha entrado en error");
               },
               success: function(data) {
                   miTabla.fnDraw();
               },
               complete: {
               }
           });
       });
        $('#close').click(function(e) {
           $('#miTabla').fadeIn(100);
           $('#formulario').fadeOut(100);

       });
        
       $('#enviar').click(function(e) {
           /*e.preventDefault();
           idClinica = $('#idClinica').val();
           nombre = $('#nombre').val();
           localidad = $('#localidad').val();
           provincia = $('#provincia').val();
           direccion = $('#direccion').val();
           cif = $('#cif').val();
           cp = $('#cp').val();
           id_tarifa = $('#id_tarifa').val();

           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/modificar_clinica.php',
               //lo más cómodo sería mandar los datos mediante 
               //var data = $( "form" ).serialize();
               //pero como el php tiene otros nombres de variables, lo dejo así
               //estos son los datos que queremos actualizar, en json:
               data: {
                   id_clinica: idClinica,
                   nombre: nombre,
                   localidad: localidad,
                   provincia: provincia,
                   direccion: direccion,
                   cp: cp,
                   id_tarifa: id_tarifa,
                   cif: cif
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
               },
               success: function(data) {
                  var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                  $mitabla.fnDraw();
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });*/

           $('#miTabla').fadeIn(100);
           $('#formulario').fadeOut(100);

       });


       /*Cargamos los datos para las tarifas:*/
     /*  function cargarTarifas() {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/listar_tarifas.php',
               async: false,
               //estos son los datos que queremos actualizar, en json:
               // {parametro1: valor1, parametro2, valor2, ….}
               //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
               },
               success: function(data) {
                   $('#id_tarifa').empty();
                   $.each(data, function() {
                       $('#id_tarifa').append(
                           $('<option></option>').val(this.id_tarifa).html(this.nombre)
                       );
                   });
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
       }
       cargarTarifas();*/
   });
