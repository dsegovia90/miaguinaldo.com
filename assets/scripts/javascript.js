
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

		if (window.location.href.match('index.html') != null || window.location.href.match('')) {
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
			//document.write("Test if checked is true!");
			document.getElementById("checkBoxText").innerHTML = 'Si';
			document.getElementById("dateDiv").hidden = true;
		} else {
			document.getElementById("checkBoxText").innerHTML = 'No';
			document.getElementById("dateDiv").hidden = false;

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
			console.log(userStartedDate);

			var userNextMonth = new Date(startedWorking[0], startedWorking[1], 01);
			console.log(userNextMonth);

			var daysDifference = (userNextMonth-userStartedDate)/86400000;
			console.log("Días del primer mes de trabajo: "+daysDifference);

			var completeMonthsWorked = 12 - startedWorking[1];
			console.log("Meses completos trabajdos: "+completeMonthsWorked);

			if (daysDifference > 30) {
				daysDifference = 30;
				console.log("Días del primer mes de trabajo > a 30 por lo que se toma como 30.");
			}

			var aguinaldo = (1.25 * completeMonthsWorked + 0.0416667 * daysDifference)*sueldoDiario;
			document.getElementById("resultado").innerHTML = "Sueldo Diario es $" + sueldoDiario.toFixed(2) + " y tu Aguinaldo mínimo por ley es de $" + aguinaldo.toFixed(2);
		}	

		return false;
	}

// });