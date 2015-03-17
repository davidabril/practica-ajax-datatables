       $('#formCrear').validate({
                        rules: {
                             nombreNuevo: {
                                required: true,
                                lettersonly: true 
                               },
                        numcolegiadoNuevo: {
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
               url: 'php/crear_doctor.php',
               //lo más cómodo sería mandar los datos mediante 
               //var data = $( "form" ).serialize();
               //pero como el php tiene otros nombres de variables, lo dejo así
               //estos son los datos que queremos actualizar, en json:
               data: {
                   nombreNuevo: nombreNuevo,
                   numcolegiadoNuevo: numcolegiadoNuevo,
                   clinicas2: clinicas2
                   
               },/*}).done(function (data) {
    alert("bieeeeeeeeeeen");
}).fail(function(data){
                  alert("errorrrrrr");
               });*/

               
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                    
                    
                   // $('#edicionerr').slideDown(2000).slideUp(2000);

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
                 // alert("ok");
              //  $('#edicionok').slideDown(2000).slideUp(2000);
                /*muestro growl*/
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
                   //si queremos hacer algo al terminar la petición ajax

               }
           });
          $('#formularioCrear').fadeOut(100);
          $('#tabla').fadeIn(100);
       
        }
                       
   });