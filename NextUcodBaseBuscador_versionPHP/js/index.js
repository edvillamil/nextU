/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

function buscarRegistros(){
	$("#divider").html("");
	var url = "./data-1.json";
	var valorBuscado = "";
  
	  $.getJSON( url, function( data ) {
			var items = [];
			$("#divider").append('<div class="lista">');
			$.each( data, function( key, val ) {
				
				// validar ciudad
				var dato = "";
				if( $("#selectCiudad option:selected").val() != '-1' ){	
					if( $("#selectCiudad option:selected").text() ==  val.Ciudad  )
						dato = val;
				}else{
					dato = val;
				}
				
				if( $("#selectTipo option:selected").val() != '-1' ){
					if( dato != "" ){
						if( dato.Tipo != $("#selectTipo option:selected").text() )
							dato = "";
					}else{
						if( val.Tipo == $("#selectTipo option:selected").text() )
							dato = val;
					}				
				}
				
				if( $("#selectCiudad option:selected").val() != '-1' ){
					if( dato != "" ){
						if( dato.Ciudad != $("#selectCiudad option:selected").text() )
							dato = "";
					}				
				}
				
				
				// validar precio
				if( dato != ""){
					var rangoPrecios = $("#rangoPrecio").val().split(";")
					var valor = dato.Precio.replace("$","").replace(",","");
					
					if( valor >= rangoPrecios[0] && valor <= rangoPrecios[1] )
						llenarDato(dato);
				}
				
			
				
		  });	
		  $("#divider").append('</div>');
		  $("#divider").append("<button type='button' name='todos' class='btn-flat waves-effect' id='mostrarTodos'>Mostrar Todos</button>");
		  
		  var list = $(".regis");
		  var numToShow = 3;
		  var button = $("#mostrarTodos");
		  var numInList = list.length;
		  list.hide();
		  if (numInList > numToShow) {
			button.show();
		  }
		  list.slice(0, numToShow).show();

		  button.click(function(){
			  var showing = list.filter(':visible').length;
			  list.slice(showing - 1, showing + numToShow).fadeIn();
			  var nowShowing = list.filter(':visible').length;
			  if (nowShowing >= numInList) {
				button.hide();
			  }
		  });
		  
		  
	});
	
	  
}

function llenarDato(val){
	$("#divider").append('<div class="regis ">'+
												'<table>'+
												'<tr><td><img src="img/home.jpg" alt="Ghome" width="150px" height="150px"></td>'+
												'<td>'+
													'<label class="Direccion">'+ val.Direccion +'</label><br/>'+
													'<label class="Ciudad">'+ val.Ciudad +'</label><br/>'+
													'<label class="Direccion">'+ val.Telefono +'</label><br/>'+
													'<label class="Direccion">'+ val.Codigo_Postal +'</label><br/>'+
													'<label class="Direccion">'+ val.Tipo +'</label><br/>'+
													'<label class="Direccion">'+ val.Precio +'</label><br/>'+
												'</td></tr></table>'+
										 '</div>'
										);
}

function poblarSelect(){
	var url = "./data-1.json";
    
	var arrayTipo = new Array();
	var arrayCiudad = new Array();
	
	$.getJSON( url, function( data ) {
		var items = [];
		$.each( data, function( key, val ) {
			
			// Tipos
			var existe = false
			$.each( arrayTipo, function( tipoIndex, tipoTemp ) {
				if( tipoTemp ==  val.Tipo )
					existe = true;
			});
			
			if( !existe ){
				arrayTipo.push(val.Tipo)
				$("#selectTipo").append("<option value=''>"+val.Tipo+"</option>");
			}				
			
			// Ciudad
			existe = false
			$.each( arrayCiudad, function( tipoIndex, tipoTemp ) {
				if( tipoTemp ==  val.Ciudad )
					existe = true;
			});
			
			if( !existe ){
				$("#selectCiudad").append("<option value=''>"+val.Ciudad+"</option>");
				arrayCiudad.push(val.Ciudad)
			}
			
			
			$("#selectTipo").show();
			$("#selectCiudad").show();
			
		});
		
		
		
		console.log(arrayTipo);
		console.log(arrayCiudad);
	});
	
}

inicializarSlider();
//playVideoOnScroll();


/* FUNCIÓN DOCUMENT.READY */
$(function(){
  //$('#mostrarTodos').click(mostrarTodos);
   
   poblarSelect();
   	
  $( "#formulario" ).submit(function( event ) {
	event.preventDefault();
	buscarRegistros();
	});
  
})