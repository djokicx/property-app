// need to add a bunch of js libraries. Example did it in front end
// it is the commented code below

// <!-- Adding HTML5.js -->
//     <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.2/html5shiv.js"></script>
        
        
//     <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
//     <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js"></script>
//     <script type="text/javascript" src="http://malsup.github.io/jquery.form.js"></script>
//     <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.js"></script>
        
//     <!-- Setting the stripe publishable key.-->
//     <script>Stripe.setPublishableKey("<your-stripe-publishable-key>");</script> 


// Setting the error class and error element for form validation.
jQuery.validator.setDefaults({
    errorClass: "text-danger",
    errorElement: "small"
});

// Call back function for stripe response.
function stripeResponseHandler(status, response) {
    if (response.error) {
    // Re-enable the submit button
        $('.submit-button').removeAttr("disabled");
        // Show the errors on the form
        stripeErrorDisplayHandler(response);
        $('.subscribe_process').hide();
    } else {
        var form = $("#subscribe-form");
        // Getting token from the response json.
        var token = response['id'];
        // insert the token into the form so it gets submitted to the server
        if ($("input[name='stripeToken']").length == 1) {
            $("input[name='stripeToken']").val(token);
        } else {
            form.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
        }
        var options = {
            // post-submit callback when error returns
            error: subscribeErrorHandler, 
            // post-submit callback when success returns
            success: subscribeResponseHandler, 
            complete: function() {
                $('.subscribe_process').hide()
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json'
        };
        // Doing AJAX form submit to your server.
        form.ajaxSubmit(options);
        return false;
    }
}
            
// Handling and displaying error during form submit.
function subscribeErrorHandler(jqXHR, textStatus, errorThrown) {
    try{
        var resp = JSON.parse(jqXHR.responseText);
        if ('error_param' in resp) {
            var errorMap = {};
            var errParam = resp.error_param;
            var errMsg = resp.error_msg;
            errorMap[errParam] = errMsg;
            $("#subscribe-form").validate().showErrors(errorMap);
        } else {
            var errMsg = resp.error_msg;
            $(".alert-danger").show().text(errMsg);
        }
    } catch(err) {
        $(".alert-danger").show().text("Error while processing your request");
    }
}
            
// Forward to thank you page after receiving success response.
function subscribeResponseHandler(responseJSON) {
    window.location.replace(responseJSON.forward);
}
            
// Handling the error from stripe server due to invalid credit card credentials.
function stripeErrorDisplayHandler(response) {
    //Card field map - the keys are taken from error param values sent from stripe 
    //                 and the values are error class name in the form.
    var errorMap = {"number": "card-number",
    "cvc": "card-cvc",
    "exp_month": "card-expiry-month",
    "exp_year": "card-expiry-year"
    };
//Check if param exist in error
    if (response.error.param) {
        var paramClassName = errorMap[response.error.param];
        if (paramClassName) {
            //Display error in found class
            $('.' + paramClassName)
            .parents('.form-group')
            .find('.text-danger')
            .text(response.error.message).show();
        } else {
            $(".alert-danger").show().text(response.error.message);
        }
    } else {
        $(".alert-danger").show().text(response.error.message);
    }
}


$(document).ready(function() {
    $("#subscribe-form").validate({
        rules: {
            zip_code: {number: true},
            phone: {number: true}
        }
    });
    function formValidationCheck(form) {
                    // Checking form has passed the validation.
        if (!$(form).valid()) {
            return false;
        }
        $(".alert-danger").hide();
        $('.subscribe_process').show();
    }
                
    $("#subscribe-form").on('submit', function(e) {
        // form validation
        formValidationCheck(this);
        if(!$(this).valid()){
            return false;
        }
        // Disable the submit button to prevent repeated clicks and form submit
        $('.submit-button').attr("disabled", "disabled");
        // createToken returns immediately - the supplied callback 
        // submits the form if there are no errors
        Stripe.createToken({
            number: $('.card-number').val(),
            cvc: $('.card-cvc').val(),
            exp_month: $('.card-expiry-month').val(),
            exp_year: $('.card-expiry-year').val()
        }, stripeResponseHandler);
        return false; // submit from callback
    });
                
});