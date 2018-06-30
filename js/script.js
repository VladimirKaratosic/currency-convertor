var $fromSelection = $(".fromSelection");
var $toSelection = $(".toSelection");
var $convertFrom = $(".convertFrom");
var $convertTo = $(".convertTo");

// Set the function when page loads to put a unit values in input fields
$(document).ready(function(){
	$.get("data/json_file.json", function(data){
		EURRSD = data.result.eur.kup;
		EURUSD = data.result.eur.kup / data.result.usd.pro;
		RSDEUR = data.result.eur.pro;
		USDEUR = data.result.usd.kup / data.result.eur.pro;
		RSDUSD = data.result.usd.pro;
		USDRSD = data.result.usd.kup;
		$convertFrom.val("1");
		$convertTo.val(EURRSD);
	});

	
	$fromSelection.children("[value='RSD']").prop('disabled', true);
	$toSelection.children("[value='EUR']").prop('disabled', true);	
	
});


// Set the function when click on Reset button. 
// Put default values in input fields and starting options in select fields.
$(".buttonReset").click(function(){
	$(".fromSelection option").prop("disabled", false);
	$(".toSelection option").prop("disabled", false);
	$convertFrom.val("1");
	$convertTo.val(EURRSD);
	$fromSelection.val("EUR");
	$toSelection.val("RSD");
	$('.error-message').css("visibility", "hidden");
	$(".fromSelection option[value = 'RSD']").prop("disabled", true);
	$(".toSelection option[value = 'EUR']").prop("disabled", true);
});


// Change the values between input boxes and change the values between select elements
if($(".image").on()) {	
	$(".image").mousedown(function() {
		$(".fromSelection option").prop("disabled", false);
		$(".toSelection option").prop("disabled", false);

		lTransInput = $convertFrom.val();
		rTransInput = $convertTo.val();
		lTransSelect = $fromSelection.val();
		rTransSelect = $toSelection.val();
		// Delete values from input fields and select fields, so we could put new ones
		$convertFrom.val("");
		$convertTo.val("");
		$fromSelection.val("");
		$toSelection.val("");
		// Put new values in input fields
		$convertFrom.val(rTransInput);
		$convertTo.val(lTransInput);
		// Put new values in select fields depending on a values from oposite side
		if(lTransSelect == "EUR" && rTransSelect == "RSD") {
			$fromSelection.val("RSD");
			$toSelection.val("EUR");
			$(".fromSelection option[value = 'EUR']").prop("disabled", true);
			$(".toSelection option[value = 'RSD']").prop("disabled", true);
		} else if(lTransSelect == "EUR" && rTransSelect == "USD") {
			$fromSelection.val("USD");
			$toSelection.val("EUR");
			$(".fromSelection option[value = 'EUR']").prop("disabled", true);
			$(".toSelection option[value = 'USD']").prop("disabled", true);
		} else if(lTransSelect == "RSD" && rTransSelect == "EUR") {
			$fromSelection.val("EUR");
			$toSelection.val("RSD");
			$(".fromSelection option[value = 'RSD']").prop("disabled", true);
			$(".toSelection option[value = 'EUR']").prop("disabled", true);
		} else if(lTransSelect == "USD" && rTransSelect == "EUR") {
			$fromSelection.val("EUR");
			$toSelection.val("USD");
			$(".fromSelection option[value = 'USD']").prop("disabled", true);
			$(".toSelection option[value = 'EUR']").prop("disabled", true);
		} else if(lTransSelect == "RSD" && rTransSelect == "USD") {
			$fromSelection.val("USD");
			$toSelection.val("RSD");
			$(".fromSelection option[value = 'RSD']").prop("disabled", true);
			$(".toSelection option[value = 'USD']").prop("disabled", true);
		} else if(lTransSelect == "USD" && rTransSelect == "RSD") {
			$fromSelection.val("RSD");
			$toSelection.val("USD");
			$(".fromSelection option[value = 'USD']").prop("disabled", true);
			$(".toSelection option[value = 'RSD']").prop("disabled", true);
		} else{
			console.log("Something is wrong in $('.image').on()!");
		}	
	});	
} 


// Disable same options in a selection fields
$(".same-excluded").change(function() {
  var $other = $(".same-excluded").not(this);
  $(this).children("option").each(function() {
    $other.find("[value='" + this.value + "']").prop('disabled', this.selected);
  });
});


// Clear values from input fields if a select field is on focus
$fromSelection.change(function() {
	$convertFrom.val("");
	$convertTo.val("");
});
$toSelection.change(function() {
	$convertFrom.val("");
	$convertTo.val("");
});


			
$convertFrom.on({
	// When left input field get focus - clear it.
	focus: function() {
		$convertFrom.val("");
		$convertTo.val("");
		$('.error-message').css("visibility", "hidden");		
	}, 
	// When key was rellased in left input field, 
	//calculate the right input field, and if it is necesserly, view the error message
	keyup: function() {
		if($.isNumeric( $convertFrom.val())) {			
			$.get("data/json_file.json", function newrequest(data){
				var EURRSD = data.result.eur.kup;
				var EURUSD = data.result.eur.kup / data.result.usd.pro;
				var RSDEUR = data.result.eur.pro;
				var USDEUR = data.result.usd.kup / data.result.eur.pro;
				var RSDUSD = data.result.usd.pro;
				var USDRSD = data.result.usd.kup; 
			});
			$('.error-message').css("visibility", "hidden");
			if($fromSelection.val() == "EUR" && $toSelection.val() == "RSD") {
				var num1 = parseFloat($convertFrom.val() * EURRSD);
				$convertTo.val(num1.toFixed(2));				
			} else if($fromSelection.val() == "EUR" && $toSelection.val() == "USD") {
				var num2 = parseFloat($convertFrom.val() * EURUSD);
				$convertTo.val(num2.toFixed(2));
			} else if($fromSelection.val() == "RSD" && $toSelection.val() == "EUR") {
				var num3 = parseFloat($convertFrom.val() / RSDEUR);
				$convertTo.val(num3.toFixed(2));				
			} else if($fromSelection.val() == "USD" && $toSelection.val() == "EUR") {
				var num4 = parseFloat($convertFrom.val() * USDEUR);
				$convertTo.val(num4.toFixed(2));				
			} else if($fromSelection.val() == "RSD" && $toSelection.val() == "USD") {
				var num5 = parseFloat($convertFrom.val() / RSDUSD);
				$convertTo.val(num5.toFixed(2));				
			} else if($fromSelection.val() == "USD" && $toSelection.val() == "RSD") {
				var num6 = parseFloat($convertFrom.val() * USDRSD);
				$convertTo.val(num6.toFixed(2));				
			} else{
				console.log("Something is wrong in $convertFrom.on");
			}			
		}	
		else{
	 		// $convertTo.val('');
			$('.error-message').css("visibility", "visible");
	 	}
	}
});
