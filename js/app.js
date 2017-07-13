var app = (function ( form , date , button_reset , button_enter , button_lunch , button_return , button_exit ){
  
  button_reset.onclick = (function formReset(){
    form.reset();
    var today = timeMachine.getFullDate();
    today = today.split('/');
    today = today[2] + '-' + today[1] + '-' + today[0];
    form.date.value = today;
    
    return formReset;
  })();

  button_enter.onclick = function getEnter () {
    console.log(date.value);
  };

})(
  form,
  form.date,
  form.button_reset,
  form.button_enter,
  form.button_lunch,
  form.button_return,
  form.button_exit
);
