
	////////////////////////////////////////////////////////////
	// Waits for page to load and calls setDateMaxMin Function//
	////////////////////////////////////////////////////////////

	window.onload = function() {
  	setDateMaxMin();
	};



	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// This function creates constraints so the user can only select a date between the first day of this year and today.//
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function setDateMaxMin(){ 

		if (window.location.href.match('index.html') != null || window.location.href.match('') != null) {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			 if(dd<10){
			        dd='0'+dd
			    } 
			    if(mm<10){
			        mm='0'+mm
			    } 

			today = yyyy+'-'+mm+'-'+dd;
			document.getElementById("date").setAttribute("max",today);

			var firstDay = new Date();
			firstDay = yyyy +'-01-01';
			document.getElementById("date").setAttribute("min", firstDay);
		}
	}



	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// This function checks for the button value and makes date attribute required accordingly and changes button color and inner HTML.//
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function buttonSwitchLeft() {
		document.getElementById("btn-worked-yes").setAttribute("class", "btn btn-primary btn-worked active");
		document.getElementById("btn-worked-no").setAttribute("class", "btn btn-primary btn-worked");
		document.getElementById("date").removeAttribute("required");
		$("#date-div").collapse('hide');
		return false;				
	}

	function buttonSwitchRight() {
		document.getElementById("btn-worked-no").setAttribute("class", "btn btn-primary btn-worked active");
		document.getElementById("btn-worked-yes").setAttribute("class", "btn btn-primary btn-worked");
		document.getElementById("date").setAttribute("required", "");		
		$("#date-div").collapse('show');
		return false;				
	}

		   




	function checkedIfWorkedAllYear(){

		if ($( "#date-div" ).is( ":hidden" )) {
			return false;
		} else {
			return false;
		}
	}

	////////////////////////////////////////////
	// This function calculates the aguinaldo.//
	////////////////////////////////////////////

	function calcularAguinaldo(){
		var sueldoMensual = document.getElementById("sueldoMensual").value;
		var sueldoDiario = sueldoMensual / 30;
		if ($( "#date-div" ).is( ":hidden" )) {
			var aguinaldo = sueldoDiario * 15;
		} else {
			var startedWorking = document.getElementById("date").value.split("-");
			console.log(startedWorking);

			var userStartedDate = new Date(startedWorking[0], startedWorking[1]-1, startedWorking[2]);
			console.log("Fecha de inicio: "+userStartedDate);

			var nextJanuaryFirst = new Date(startedWorking[0], 00, 01);
			nextJanuaryFirst.setFullYear(nextJanuaryFirst.getFullYear()+1);
			console.log("Next January 1st: "+nextJanuaryFirst);

			var daysWorkedInThisYear = (nextJanuaryFirst-userStartedDate)/86400000;
			console.log("Días trabajados en el año: "+daysWorkedInThisYear);

			var firstDayOfTheYear = new Date(startedWorking[0],00,01);
			console.log("First Day of the Current Year: "+firstDayOfTheYear);

			var daysInThisYear = (nextJanuaryFirst-firstDayOfTheYear)/86400000;
			console.log("Days in Current Year: "+daysInThisYear);
		
			var aguinaldo = (15/daysInThisYear*daysWorkedInThisYear*sueldoDiario);
      
		}	
			// document.getElementById("h-resultado").innerHTML = "$" + aguinaldo.toFixed(2);
			document.getElementById("p-resultado").innerHTML = "Sueldo Diario es $" + sueldoDiario.toFixed(2) + " y tu Aguinaldo mínimo por ley es de <u><strong>$" + aguinaldo.toFixed(2) + "</strong></u> antes de impuestos y deducciones.";
      $("#result-jumbotron").collapse('show');

		return false;
	}