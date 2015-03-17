$.validator.messages,{
	required:"Este campo es obligatorio.",
	remote:"Por favor, este dato ya existe en la BD.",
	email:"Por favor, escribe una direcciÃ³n de correo vÃ¡lida.",
	url:"Por favor, escribe una URL vÃ¡lida.",
	date:"Por favor, escribe una fecha vÃ¡lida.",
	dateISO:"Por favor, escribe una fecha (ISO) vÃ¡lida.",
	number:"Por favor, escribe un nÃºmero vÃ¡lido.",
	digits:"Por favor, escribe sÃ³lo dÃ­gitos.",
	creditcard:"Por favor, escribe un nÃºmero de tarjeta vÃ¡lido.",
	equalTo:"Por favor, escribe el mismo valor de arriba.",
	extension:"Por favor, escribe un valor con una extensiÃ³n aceptada.",
	maxlength:
		$.validator.format("Por favor, no escribas mÃ¡s de {0} caracteres."),
	minlength:
		$.validator.format("Por favor, no escribas menos de {0} caracteres."),
	rangelength:
		$.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
	range:
		$.validator.format("Por favor, escribe un valor entre {0} y {1}."),
	max:
		$.validator.format("Por favor, escribe un valor menor o igual a {0}."),
	min:
		$.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
	nifES:"Por favor, escribe un NIF vÃ¡lido.",
	nieES:"Por favor, escribe un NIE vÃ¡lido.",
	cifES:"Por favor, escribe un CIF vÃ¡lido."}),
	$.validator.addMethod("lettersonly",
		function(a,b){
			return this.optional(b)||/^[a-z\s\Ã±\Ã‘]+$/i.test(a)},
			"Solo letras por favor");

	var idDoctor;

$(document).ready(
	function(){
		function a(){
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"php/listar_tarifas.php",
				async:!1,
				error:function(){
				},
				success:function(a){
					$("#clinicas2").empty(),
					$.each(a,function(){
						$("#clinicas2").append(
							$("<option ></option>").val(this.id_clinica).html(this.nombre))})},complete:{}})}

function b(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"php/listar_tarifas.php",
		async:!1,
		error:function(){
		},
		success:function(a){
			$("#clinicas").empty(),
			$.each(a,function(){
				$("#clinicas").append(
					$("<option ></option>").val(this.id_clinica).html(this.nombre))
			})
		},
		complete:{
		}
	})
}

$("#miTabla").DataTable({
	processing:!0,
	serverSide:!0,
	ajax:"php/cargar_vclinicas_mejor.php",
	language:{
		sProcessing:"Procesando...",
		sLengthMenu:"Mostrar _MENU_ registros",
		sZeroRecords:"No se encontraron resultados",
		sEmptyTable:"NingÃºn dato disponible en esta tabla",
		sInfo:"Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		sInfoEmpty:"Mostrando registros del 0 al 0 de un total de 0 registros",
		sInfoFiltered:"(filtrado de un total de _MAX_ registros)",
		sInfoPostFix:"",
		sSearch:"Buscar:",
		sUrl:"",
		sInfoThousands:",",
		sLoadingRecords:"Cargando...",
		oPaginate:{
			sFirst:"Primero",
			sLast:"Ãšltimo",
			sNext:"Siguiente",
			sPrevious:"Anterior"
		},
		oAria:{
			sSortAscending:": Activar para ordenar la columna de manera ascendente",
			sSortDescending:": Activar para ordenar la columna de manera descendente"
		},
		columns:[{
			data:"nombre"
		},{
			data:"numcolegiado"
		},{
			data:"nombreClinica",
			render:function(a){
				return"<li>"+a+"</li><br>"
			}
		},{
			data:"idClinica",visible:!1
		},{
			data:"idDoctor",
			render:function(a){
				return'<a class="btn btn-primary editarbtn" href=http://localhost/php/modificar_clinica.php?id_doctor='+a+'>Editar</a><a data-toggle="modal" data-target="#basicModal"  class="btn btn-warning borrarbtn" >Borrar</a>'}}]});

$("#miTabla").on("click",".editarbtn",function(a){
	a.preventDefault(),
	$("#tabla").fadeOut(100),
	$("#formulario").fadeIn(100);
	var d=$(this).parents("tr")[0],
	e=c.row(d).data();
	$("#idDoctor").val(e.idDoctor),
	$("#nombre").val(e.nombre),
	$("#numcolegiado").val(e.numcolegiado),
	$("#clinicas").val(e.nombreClinica),
	b();
	var f=e.idClinica;
	f=f.split(","),
	$("#clinicas").val(f)
}),






$("#miTabla").on("click",".borrarbtn",function(){
	var a=$(this).parents("tr")[0],
	b=c.row(a).data();
	idDoctor=b.idDoctor})








$("#basicModal").on("click","#confBorrar",function(){$.ajax({type:"POST",dataType:"json",url:"php/borrar_doctor.php",data:{id_doctor:idDoctor},error:function(){$.growl({icon:"glyphicon glyphicon-remove",message:"Error al borrar!"},{type:"danger"})},success:function(){var a=$("#miTabla").dataTable({bRetrieve:!0});a.fnDraw(),$.growl({icon:"glyphicon glyphicon-remove",message:"Borrado realizado con exito!"},{type:"success"})},complete:{}}),$("#tabla").fadeIn(100)}),



$("#formEditar").validate({rules:{nombre:{required:!0,lettersonly:!0},numcolegiado:{required:!0,digits:!0},clinicas:{required:!0}},submitHandler:function(){idDoctor=$("#idDoctor").val(),nombre=$("#nombre").val(),numcolegiado=$("#numcolegiado").val(),id_clinica=$("#clinicas").val(),$.ajax({type:"POST",dataType:"json",url:"php/modificar_clinica.php",data:{idDoctor:idDoctor,nombre:nombre,numcolegiado:numcolegiado,id_clinica:id_clinica},error:function(){$.growl({icon:"glyphicon glyphicon-remove",message:"Error al editar!"},{type:"danger"})},success:function(a){var b=$("#miTabla").dataTable({bRetrieve:!0});b.fnDraw(),0==a[0].estado?$.growl({icon:"glyphicon glyphicon-ok",message:"Doctor editado correctamente!"},{type:"success"}):$.growl({icon:"glyphicon glyphicon-remove",message:"Error al editar el doctor!"},{type:"danger"})},complete:{}}),$("#tabla").fadeIn(100),$("#formulario").fadeOut(100)}})









,$("#formCrear").validate({rules:{nombreNuevo:{required:!0,lettersonly:!0},numcolegiadoNuevo:{required:!0,digits:!0},clinicas2:{required:!0}},submitHandler:function(){nombreNuevo=$("#nombreNuevo").val(),numcolegiadoNuevo=$("#numcolegiadoNuevo").val(),clinicas2=$("#clinicas2").val(),$.ajax({type:"POST",dataType:"json",url:"php/crear_doctor.php",data:{nombreNuevo:nombreNuevo,numcolegiadoNuevo:numcolegiadoNuevo,clinicas2:clinicas2},error:function(){$.growl({icon:"glyphicon glyphicon-remove",message:"Error al aÃ±adir el doctor!"},{type:"danger"})},success:function(a){var b=$("#miTabla").dataTable({bRetrieve:!0});b.fnDraw(),0==a[0].estado?$.growl({icon:"glyphicon glyphicon-ok",message:"Doctor aÃ±adido correctamente!"},{
			type:"success"
			});
			}else{
			$.growl({
				icon:"glyphicon glyphicon-remove",
				message:"Error al aÃ±adir el doctor!"
			},{		
				type:"danger"
			});
		},	
		complete:{
		}
	});
	$("#formularioCrear").fadeOut(100);
	$("#tabla").fadeIn(100);
	}
});













$("#creaDoc").click(function(b){
	b.preventDefault();
	$("#tabla").fadeOut(100);
	$("#formularioCrear").fadeIn(100);
		a();
	})
});