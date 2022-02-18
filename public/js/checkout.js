var Stripe = Stripe('pk_test_51KUE6ySIReiC7K1bbO4gAnrn63av180SLmZeIpfoA4UXUfu7h5ZtoHN32rwb9SbvO7pGFiauLk2qwGCsH3eMpw2d00oXiFJbiI');
var $form = $('#checkout-form')

$form.submit(async(event)=>{
    event.preventDefault()
    console.log('at 6')
    $form.find('button').prop('disabled', true)
    try {
        const token = await Stripe.card.createToken({
            card: {
              number: '4242424242424242',
              exp_month: 2,
              exp_year: 2023,
              cvc: '314',
            },
          });
          $form.append($('<input type="hidden" name="stripeToken" />').val(token));
          // and submit
          $form.get(0).submit();
    } catch (error) {
        console.log(error)
    }
})

function stripeResponseHandler(status, response) {
    console.log('at 20')
    if (response.error) {
      // Show the errors on the form
      $('#charge-errors').text(response.error.message);
      $('#charge-errors').removeClass('d-none');
      $form.find('button').prop('disabled', false);
    } else {
      // token contains id, last4, and card type
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $form.get(0).submit();
    }
  };

//   $('#card-number').val()
//   $('#card-cvc').val()
//   $('#card-expiry-month').val()
//   $('#card-expiry-year').val()
//   $('#card-name').val()

// Stripe.card.createToken({
//     number: '4242424242424242',
//     cvc: '212' ,
//     exp_month: 2 ,
//     exp_year: 2021 ,
//     name: 'abc' ,
// }, stripeResponseHandler)
// console.log('at 15')

// const create = async(event) =>{
//     event.preventDefault()
//     console.log('at 6')
//     $form.find('button').prop('disabled', true)
//     const token = await stripe.tokens.create({
//         card: {
//           number: '4242424242424242',
//           exp_month: 2,
//           exp_year: 2023,
//           cvc: '314',
//         },
//       });
//       $form.append($('<input type="hidden" name="stripeToken" />').val(token));
//       // and submit
//       $form.get(0).submit();
// }

// $form.submit