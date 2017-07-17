var app = (function ( date , day_output , button_enter , button_lunch , button_return , button_exit , button_report , report_container ){
  
  'use strict';

  var tableTemplate = '<table class="report-table"><thead class="report-header"><tr class="report-row"><th class="report-cell" colspan="6">[#mes#]</th></tr><tr class="report-row"><th class="report-cell">#</th><th class="report-cell">dia</th><th class="report-cell">entrada</th><th class="report-cell">almoço</th><th class="report-cell">retorno</th><th class="report-cell">saída</th></tr></thead><tbody class="report-body">[#table-body#]</tbody></table>';

  var tableRowtemplate = '<tr class="report-row"><td class="report-cell">[#dia#]</td><td class="report-cell">[#dia-semana#]</td><td class="report-cell">[#entrada#]</td><td class="report-cell">[#almoco#]</td><td class="report-cell">[#retorno#]</td><td class="report-cell">[#saida#]</td></tr>';

  (function appInit(){
    var today = timeMachine.getFullDate();
    date.value = today;
    day_output.innerHTML = timeMachine.getWeekDay().replace('-feira', '');
  })();

  function _getNow(){
    timeMachine.reboot();

    return {
      monthName: timeMachine.getMonth(),
      time: timeMachine.getTime(),
      day: timeMachine.getDay(),
      weekDay: timeMachine.getWeekDay()
    };
  }

  // TODO: refactor in save functions for better performance
  button_enter.onclick = function saveEntry () {

    var month = _getNow().monthName;
    var entryTime = _getNow().time;
    var day = _getNow().day;
    var weekDay = _getNow().weekDay;

    var entryData = {
      [day]: {
        diaDaSemana: weekDay,
        horarios: {
          entrada: entryTime
        }
      }
    };
    
    console.log( '[ Timesheet | Entry ] status: ' + database.setMonthData(month, entryData) );
  };

  button_lunch.onclick = function saveLunch () {
    var month = _getNow().monthName;
    var lunchTime = _getNow().time;
    var day = _getNow().day;
    
    var lunchData = database.getMonthData(month);
    lunchData[day].horarios.almoco = lunchTime;

    console.log( '[ Timesheet | Lunch ] status: ' + database.setMonthData(month, lunchData) );    
  };

  button_return.onclick = function saveReturn () {
    var month = _getNow().monthName;
    var returnTime = _getNow().time;
    var day = _getNow().day;
    
    var returnData = database.getMonthData(month);
    returnData[day].horarios.retorno = returnTime;

    console.log( '[ Timesheet | Return ] status: ' + database.setMonthData(month, returnData) );    
  };

  button_exit.onclick = function saveExit () {
    var month = _getNow().monthName;
    var exitTime = _getNow().time;
    var day = _getNow().day;
    
    var exitData = database.getMonthData(month);
    exitData[day].horarios.saida = exitTime;

   console.log( '[ Timesheet | Exit ] status: ' + database.setMonthData(month, exitData) );    
  };

  button_report.onclick = function () {
    var month = _getNow().monthName
    report_container.innerHTML = getReportTable(month);
  }

  function getReportTable (month) {
    var table = tableTemplate;
    table = table.replace( '[#mes#]' , month );

    var monthData = database.getMonthData(month);
    var allRows = '';
    for ( var day in monthData ) {
      var newRow = tableRowtemplate;
      newRow = newRow.replace( '[#dia#]' , day );
      newRow = newRow.replace( '[#dia-semana#]' , monthData[day].diaDaSemana );
      newRow = newRow.replace( '[#entrada#]' , monthData[day].horarios.entrada );
      newRow = newRow.replace( '[#almoco#]' , monthData[day].horarios.almoco );
      newRow = newRow.replace( '[#retorno#]' , monthData[day].horarios.retorno );
      newRow = newRow.replace( '[#saida#]' , monthData[day].horarios.saida );

      allRows += newRow;
    }

    table = table.replace( '[#table-body#]' , allRows );

    return table;
  }

})(
  form.date,
  form.day_output,
  form.button_enter,
  form.button_lunch,
  form.button_return,
  form.button_exit,
  form.button_report,
  report_container
);
