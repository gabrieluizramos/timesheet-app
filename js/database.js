var database = (function(){
  var db = openDatabase('Timesheet', '1.0' , 'Datbase for Timesheet front-end app', 2 * 1024 * 1024 , function(){
    console.log('Database opened');
  });

  (function createTables(db){
    db.transaction(function(tx){
      tx.executeSql('INSERT INTO ( CREATE TABLE IF NOT EXISTS tb_meses ( id INTEGER PRIMARY KEY, nm_mes VARCHAR(50) ) VALUES ( "Janeiro" ), ( "Fevereiro" ), ( "Março" ), ( "Abril" ), ( "Maio" ), ( "Junho" ), ( "Julho" ), ( "Agosto" ), ( "Setembro" ), ( "Outubro" ), ( "Novembro" ), ( "Dezembro" );');
    });
  })(db);

  function _droptable ( table ) {
     db.transaction(function(tx){
      tx.executeSql('DROP TABLE ' + table);
     });
  }
  

  function _executeSQL (query, callback) {
    db.transaction(function(tx){
      tx.executeSql(query);
    });
  }

  return {
    executeSQL: _executeSQL,
    droptable: _droptable
  }
})();