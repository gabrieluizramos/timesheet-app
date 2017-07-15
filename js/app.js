var app = (function ( date , day_output , button_enter , button_lunch , button_return , button_exit , button_report ){
  
  'use strict';

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
  // TODO: refactor in save functions
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
    var table = getReportTable(month)
  }

  // TODO: refactor table functions

  function getReportTableHead (month, monthData){

    var thead = document.createElement('thead');
    thead.className = 'report-thead'
    
    var tr = document.createElement('tr');
    tr.className = 'report-row';
    
    var th = document.createElement('th');
    th.className = 'report-cell'
    th.textContent = month;

    tr.appendChild(th);
    thead.appendChild(tr);

    var headCellsType = monthData[Object.keys(monthData)[0]].horarios;
    
    tr = document.createElement('tr');
    tr.className = 'report-row';
    
    for ( var horario in headCellsType ) {
      th = document.createElement('th');
      th.className = 'report-cell';
      th.textContent = horario;
      tr.appendChild(th);
    }

    thead.appendChild(tr);

    return thead;
  }

  function getReportTableBody (monthData) {
    var tbody = document.createElement('tbody');
    tbody.className = 'report-body';

    for ( var day in monthData ) {
      var tr = document.createElement('tr');
      tr.className = 'report-row';

      var td = document.createElement('td');
      td.className = 'report-cell';
      td.textContent = day;

      tr.appendChild(td);

      for ( var conteudo in monthData[day] ) {
        td = document.createElement('td');
        td.className = 'report-cell';

        if ( typeof monthData[day][conteudo] !== 'string' ) {
          for ( var horario in monthData[day][conteudo] ) {

          }
        }
        else {
          td.textContent = monthData[day][conteudo];
        }
      }

      tr.appendChild(td);

      tbody.appendChild(tr);
    }

    return tbody;
  }

  function getReportTable (month) {
    var monthData = database.getMonthData(month);
    
    var table = document.createElement('table');
    table.className = 'report-table';

    table.appendChild(getReportTableHead(month, monthData));
    table.appendChild(getReportTableBody(monthData));

    console.log(table);


    
  }

})(
  form.date,
  form.day_output,
  form.button_enter,
  form.button_lunch,
  form.button_return,
  form.button_exit,
  form.button_report
);
