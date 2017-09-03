
// Set the function when page loads to put a unit values in input fields
$(document).ready(function(){
	$.get("data/json_file.json", function(data){
		EURRSD = data.result.eur.kup;
		EURUSD = data.result.eur.kup / data.result.usd.pro;
		RSDEUR = data.result.eur.pro;
		USDEUR = data.result.usd.kup / data.result.eur.pro;
		RSDUSD = data.result.usd.pro;
		USDRSD = data.result.usd.kup;
		$(".convertFrom").val("1");
		$(".convertTo").val(EURRSD);
	});	
});


// Set the function when click on Reset button. 
// Put default values in input fields and starting options in select fields.
$(".buttonReset").click(function(){
	$(".convertFrom").val("1");
	$(".convertTo").val(EURRSD);
	$(".fromSelection").val("EUR");
	$(".toSelection").val("RSD");
	$('.error-message').css("visibility", "hidden");
});

// Disable same options in a selection fields
$(".same-excluded").change(function() {
  var $other = $(".same-excluded").not(this);
  $(this).children("option").each(function() {
    $other.find("[value='" + this.value + "']").prop('disabled', this.selected);
  });
});

// Clear values from input fields if a select field is on focus
if($(".fromSelection").focus() || $(".toSelection").focus()) {
	$(".convertFrom").val("");
	$(".convertTo").val("");
}

			
$(".convertFrom").on({
	// When left input field get focus - clear it.
	focus: function() {
		$(".convertFrom").val("");
		$('.error-message').css("visibility", "hidden");
		if($(".fromSelection").val() == "EUR" && $(".toSelection").val() == "RSD") {
			$(".convertTo").val("");
		} else if($(".fromSelection").val() == "EUR" && $(".toSelection").val() == "USD") {
			$(".convertTo").val("");
		} else if($(".fromSelection").val() == "RSD" && $(".toSelection").val() == "EUR") {
			$(".convertTo").val("");
		} else if($(".fromSelection").val() == "USD" && $(".toSelection").val() == "EUR") {
			$(".convertTo").val("");
		} else if($(".fromSelection").val() == "RSD" && $(".toSelection").val() == "USD") {
			$(".convertTo").val("");
		} else if($(".fromSelection").val() == "USD" && $(".toSelection").val() == "RSD") {
			$(".convertTo").val("");
		} else{
			alert("Something is wrong!");
		}	
	}, 
	// When key was rellased in left input field, 
	//calculate the right input field, and if it is necesserly, view the error message
	keyup: function() {
		if($.isNumeric( $('.convertFrom').val())) {			
			$.get("data/json_file.json", function newrequest(data){
				EURRSD = data.result.eur.kup;
				EURUSD = data.result.eur.kup / data.result.usd.pro;
				RSDEUR = data.result.eur.pro;
				USDEUR = data.result.usd.kup / data.result.eur.pro;
				RSDUSD = data.result.usd.pro;
				USDRSD = data.result.usd.kup; 
			});
			$('.error-message').css("visibility", "hidden");
			if($(".fromSelection").val() == "EUR" && $(".toSelection").val() == "RSD") {
				var num1 = parseFloat($(".convertFrom").val() * EURRSD);
				$(".convertTo").val(num1.toFixed(2));				
			} else if($(".fromSelection").val() == "EUR" && $(".toSelection").val() == "USD") {
				var num2 = parseFloat($(".convertFrom").val() * EURUSD);
				$(".convertTo").val(num2.toFixed(2));
			} else if($(".fromSelection").val() == "RSD" && $(".toSelection").val() == "EUR") {
				var num3 = parseFloat($(".convertFrom").val() * RSDEUR);
				$(".convertTo").val(num3.toFixed(2));				
			} else if($(".fromSelection").val() == "USD" && $(".toSelection").val() == "EUR") {
				var num4 = parseFloat($(".convertFrom").val() * USDEUR);
				$(".convertTo").val(num4.toFixed(2));				
			} else if($(".fromSelection").val() == "RSD" && $(".toSelection").val() == "USD") {
				var num5 = parseFloat($(".convertFrom").val() * RSDUSD);
				$(".convertTo").val(num5.toFixed(2));				
			} else if($(".fromSelection").val() == "USD" && $(".toSelection").val() == "RSD") {
				var num6 = parseFloat($(".convertFrom").val() * USDRSD);
				$(".convertTo").val(num6.toFixed(2));				
			} else{
				alert("Something is wrong!");
			}			
		}	
		else{
	 		$('.convertTo').val('');
			$('.error-message').css("visibility", "visible");
	 	}
	}
});


// Change a state of input field and select field from left with state from right
$(".image").click(function(){
	var lTransInput, lTransSelect, rTransInput, rTransSelect;
	// Take values from a left & right input field and left & right select field and store in variables
	lTransInput = $(".convertFrom").val();
	rTransInput = $(".convertTo").val();
	lTransSelect = $(".fromSelection").val();
	rTransSelect = $(".toSelection").val();
	// Delete values from input fields and select fields, so we could put new ones
	$(".convertFrom").val("");
	$(".convertTo").val("");
	$(".fromSelection").val("");
	$(".toSelection").val("");
	// Put new values in input fields
	$(".convertFrom").val(rTransInput);
	$(".convertTo").val(lTransInput);
	// Put new values in select fields depending on a values from oposite side
	if(lTransSelect == "EUR" && rTransSelect == "RSD") {
		$(".fromSelection").val("RSD");
		$(".toSelection").val("EUR");
	} else if(lTransSelect == "EUR" && rTransSelect == "USD") {
		$(".fromSelection").val("USD");
		$(".toSelection").val("EUR");
	} else if(lTransSelect == "RSD" && rTransSelect == "EUR") {
		$(".fromSelection").val("EUR");
		$(".toSelection").val("RSD");
	} else if(lTransSelect == "USD" && rTransSelect == "EUR") {
		$(".fromSelection").val("EUR");
		$(".toSelection").val("USD");
	} else if(lTransSelect == "RSD" && rTransSelect == "USD") {
		$(".fromSelection").val("USD");
		$(".toSelection").val("RSD");
	} else if(lTransSelect == "USD" && rTransSelect == "RSD") {
		$(".fromSelection").val("RSD");
		$(".toSelection").val("USD");
	} else{
		alert("Something is wrong!");
	}	
});