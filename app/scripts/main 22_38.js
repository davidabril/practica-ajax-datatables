'use strict';

// Metodo especial de validacion para España, con acentos y ñ
$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[áéíóúÁÉÍÓÚA-Za-zñÑ ]+$/i.test(value);
}, "Solo letras por favor");

// Declaracion inicial de variables, pequeña trampa porque mas abajo daba error
var idDoctor;
var nombre;
var numcolegiado;
var id_clinica;

$(document).ready(function() {   
var miTabla = $('#miTabla').DataTable({
    //Ocultamos columnas
  "columnDefs": [
      {
          "targets": [ 3 ],
          "visible": false,
          "searchable":  false
      },
      {
          "targets": [ 4 , 5 ],
          "orderable": false
      }
  ],
  'processing': true,
  'serverSide': true,
  'ajax': 'php/cargar_vdoctores_clinicas.php',
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
      'data': 'nombre'
    }, {
      'data': 'numcolegiado'
    }, { 
      'data': 'nombreClinica',
        'render': function(data) {
        return '<li>' + data + '</li><br>';
    }
    }, {
      'data': 'idClinica'
  }, {
      'data': 'idDoctor',
      'render': function(data) {
      /*Boton para editar el doctor*/
      return '<a class="btn btn-primary editarbtn" >Editar</a>';   
    }
  },{
      'data': 'idDoctor',
      'render': function(data) {
      /*Boton para borrar el doctor*/
      return '<a class="btn btn-warning borrarbtn" data-toggle="modal" data-target="#modalBorrarDoctor" >Borrar</a>';   
    }
  }]
});

  /* 
    Ocultamos la tabla y mostramos el formulario 
    de edicion para doctores, mostrando los valores del 
    doctor seleccionado (id, nombre, nº colegiado y clinicas)
  */
  $('#miTabla').on('click', '.editarbtn', function(e) {
    e.preventDefault();
    $('#tabla').fadeOut(100);
    $('#formularioEditarDoctor').fadeIn(100);
    var nRow = $(this).parents('tr')[0];
    var aData = miTabla.row(nRow).data();
    $('#idDoctor').val(aData.idDoctor);
    $('#nombre').val(aData.nombre);
    $('#numcolegiado').val(aData.numcolegiado);
    $('#clinicas').val(aData.nombreClinica);
    // Llamamos a la funcion que busca las clinicas y las añade al select
    listarClinicas();
    // Seleccionamos y separamos las clinicas de la vista
    var str = aData.idClinica;
    str = str.split(",");
    // Añadimos las clinicas del doctor al select como selected
    $('#clinicas').val(str);  
  });

  // Boton borrar que carga el doctor que va a ser borrado por la ventana modal 
  $('#miTabla').on('click', '.borrarbtn', function(e) {
    var nRow = $(this).parents('tr')[0];
    var aData = miTabla.row(nRow).data();
    idDoctor = aData.idDoctor;
  });

  /*
    Boton de confirmacion en la ventana modal, realiza la peticion
    ajax para borrar al doctor con la id seleccionada al darle al 
    boton borrar y muestra un growl con el resultado
  */
  $('#modalBorrarDoctor').on('click','#borrarDoctor',function(e){
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'php/borrar_doctor.php',
      data: {
         id_doctor: idDoctor
      },
      error: function(xhr, status, error) {
        // Si da error al borrar
        $.growl({
          icon: "glyphicon glyphicon-remove",
          message: " Error, no se puede borrar el doctor"
        },{
          type: "danger"
        });
      },
      success: function(data) {
        // Si no da error actualizamos datatables
        var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
        // y volvemos a mostrar el resultado
        $mitabla.fnDraw();
        $.growl({
          icon: "glyphicon glyphicon-remove",
          message: " Exito, doctor borrado"
        },{
          type: "success"
        });
      },
      complete: {
      }
    });
    // Volvemos a mostrar datatables
    $('#tabla').fadeIn(100);
  });

  /*
    Validacion del formulario para editar el doctor siguiendo 
    las indicaciones del ejercicio en github, si los datos son 
    correctos procede a editar el doctor segun los parametros 
    al darle al boton editarbtn.
    Muestra el growl correspondiente segun como valla el ajax
  */
  $('#editarDoctor').validate({
    rules:  
    {
      nombre: {
        required: true,
        lettersonly: true 
      },
      numcolegiado: {
        digits: true
      },
      clinicas:{
        required:true
      }
    },
    submitHandler: function() {
      idDoctor = $('#idDoctor').val();
      nombre = $('#nombre').val();
      numcolegiado = $('#numcolegiado').val();
      id_clinica = $('#clinicas').val();
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'php/editar_doctor.php',
        data: {
           idDoctor: idDoctor,
           nombre: nombre,
           numcolegiado: numcolegiado,
           id_clinica:id_clinica
        },
        error: function(xhr, status, error) {
          $.growl({         
            icon: "glyphicon glyphicon-remove",
            message: " Error, no se puede editar el doctor"
          },{
            type: "danger"
          });
        },
        success: function(data) {
          // Si no da error actualizamos datatables
          var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
          // y volvemos a mostrar el resultado
          $mitabla.fnDraw();
          // Si todo fue bien (no dio un error mysql_errno)
          if(data[0].estado==0){
            $.growl({
              icon: "glyphicon glyphicon-ok",
              message: " Exito, doctor editado"
            },{
              type: "success"
            });
          }else{
            $.growl({                
              icon: "glyphicon glyphicon-remove",
              message: " Error, no se puede editar el doctor"
            },{
              type: "danger"
            });
          }
        },
          complete: {
          }
        });
        /*
           Ocultamos el formulario para editar el doctor
           y volvemos a mostrar datatables
        */
        $('#formularioEditarDoctor').fadeOut(100);
        $('#tabla').fadeIn(100);
      }
  });

        
$('#crearDoctor').validate({
    rules: {
         nombreNuevo: {
            required: true,
            lettersonly: true 
           },
    numcolegiadoNuevo: {
            required: true,
            digits: true
    },
    clinicas2:{
      required:true
    }
    },
    submitHandler: function() {
      var nombreNuevo = $('#nombreNuevo').val();
      var numcolegiadoNuevo = $('#numcolegiadoNuevo').val();
      var clinicas2 = $('#clinicas2').val();
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'php/nuevo_doctor.php',
        //lo más cómodo sería mandar los datos mediante 
        //var data = $( "form" ).serialize();
        //pero como el php tiene otros nombres de variables, lo dejo así
        //estos son los datos que queremos actualizar, en json:
        data: {
           nombreNuevo: nombreNuevo,
           numcolegiadoNuevo: numcolegiadoNuevo,
           clinicas2: clinicas2 
        },
        error: function(xhr, status, error) {
          $.growl({
            icon: "glyphicon glyphicon-remove",
            message: "Error al añadir el doctor!"
          },{
            type: "danger"
          });
        },
        success: function(data) {
          var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
          $mitabla.fnDraw();
          if(data[0].estado==0){
            $.growl({
              icon: "glyphicon glyphicon-ok",
              message: "Doctor añadido correctamente!"
            },{
              type: "success"
            });
          }else{
            $.growl({
                icon: "glyphicon glyphicon-remove",
                message: "Error al añadir el doctor!"
              },{
                type: "danger"
            });
          }
        },
          complete: {
       }
     });
    /*
       Ocultamos el formulario para editar el doctor
       y volvemos a mostrar datatables
    */
    $('#formularioCrearDoctor').fadeOut(100);
    $('#tabla').fadeIn(100);

  }
                 
  });

//R
  /*boton añadir doctor,oculto tabla para mostrar form*/
  $('#creaDoc').click(function(e) {
    e.preventDefault();
    $('#tabla').fadeOut(100);
    $('#formularioCrearDoctor').fadeIn(100);
    $('#nombreNuevo').val("");
    $('#numcolegiadoNuevo').val("");
    listarClinicas();
  });

//
 /*Cargamos los datos para las tarifas:*/
  function listarClinicas() {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'php/listar_clinicas.php',
      async: false,
      //estos son los datos que queremos actualizar, en json:
      // {parametro1: valor1, parametro2, valor2, ….}
      //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
      error: function(xhr, status, error) {
         //mostraríamos alguna ventana de alerta con el error
      },
      success: function(data) {
         $('#clinicas2').empty();
         $.each(data, function() {
             $('#clinicas2').append(
                 $('<option ></option>').val(this.id_clinica).html(this.nombre)
             );
         });
         $('#clinicas').empty();
         $.each(data, function() {
           $('#clinicas').append(
               $('<option ></option>').val(this.id_clinica).html(this.nombre)
           );
        });
      },
      complete: {
      }
    });
  }

//boton enviar del formulario de editar
/*
       $('#enviar').click(function(e) {
           e.preventDefault();
           idDoctor = $('#idDoctor').val();
           nombre = $('#nombre').val();
           numcolegiado = $('#numcolegiado').val();
           id_clinica = $('#clinicas').val();
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/modificar_clinica.php',
               //lo más cómodo sería mandar los datos mediante 
               //var data = $( "form" ).serialize();
               //pero como el php tiene otros nombres de variables, lo dejo así
               //estos son los datos que queremos actualizar, en json:
               data: {
                   idDoctor: idDoctor,
                   nombre: nombre,
                   numcolegiado: numcolegiado,
                   id_clinica:id_clinica
                   
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                    //alert(error);
                    //alert(xhr);
                    //alert(status);
                   // $('#edicionerr').slideDown(2000).slideUp(2000);
                    $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al editar!"
                },{
                  type: "danger"
                });
               },
               success: function(data) {
                  var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                  $mitabla.fnDraw();
                 // alert("ok");
              //  $('#edicionok').slideDown(2000).slideUp(2000);
               
               
                 if(data[0].estado==0){
                 $.growl({
                  
                  icon: "glyphicon glyphicon-ok",
                  message: "Doctor editado correctamente!"
                },{
                  type: "success"
                });
               }else{
                 $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al editar el doctor!"
                },{
                  type: "danger"
                });
               }
               },
               complete: {
               }
           });
           $('#tabla').fadeIn(100);
           $('#formulario').fadeOut(100);
            //$("#edicion").fadeOut(100);
       });
   */
    

          
       
   });
    

   /* En http://www.datatables.net/reference/option/ hemos encontrado la ayuda necesaria
   para utilizar el API de datatables para el render de los botones */
   /* Para renderizar los botones según bootstrap, la url es esta: 
   http://getbootstrap.com/css/#buttons
   */
