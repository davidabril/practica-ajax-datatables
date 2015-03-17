

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