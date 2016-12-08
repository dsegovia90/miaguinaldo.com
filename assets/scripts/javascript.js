
// $(document).ready(function() {


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

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	// This function checks for the checkbox value and shows the date in case user has not worked all year.//
	/////////////////////////////////////////////////////////////////////////////////////////////////////////


	function checkedIfWorkedAllYear(){
		if (document.getElementById("completeYear").checked) {
			// document.write("Test if checked is true!");
			document.getElementById("checkBoxText").innerHTML = 'Si';
			document.getElementById("dateDiv").hidden = true;
			document.getElementById("date").removeAttribute("required");
		} else {
			document.getElementById("checkBoxText").innerHTML = 'No';
			document.getElementById("dateDiv").hidden = false;
			document.getElementById("date").setAttribute("required", "");
		}
	}

	////////////////////////////////////////////
	// This function calculates the aguinaldo.//
	////////////////////////////////////////////

	function calcularAguinaldo(){
		var sueldoMensual = document.getElementById("sueldoMensual").value;
		var sueldoDiario = sueldoMensual / 30;
		if (document.getElementById("completeYear").checked) {
			var aguinaldo = sueldoDiario * 15;
			document.getElementById("resultado").innerHTML = "Sueldo Diario es $" + sueldoDiario.toFixed(2) + " y tu Aguinaldo mínimo por ley es de $" + aguinaldo.toFixed(2)
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
			document.getElementById("resultado").innerHTML = "Sueldo Diario es $" + sueldoDiario.toFixed(2) + " y tu Aguinaldo mínimo por ley es de ";
			document.getElementById("resultado-strong").innerHTML = "$" + aguinaldo.toFixed(2).toBold();
		}	

		return false;
	}

// });