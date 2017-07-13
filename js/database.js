var database = (function(){
  var db = openDatabase('db_timesheet', '1.0' , 'Datbase for t front-end app', 2 * 1024 * 1024 , function(){
    console.log('Database opened');
  });

  (function createTables(db){
    // creation working
    // TODO: validate if exists a creation and insert unique query with IF NOT EXISTS statement
    db.transaction(function ( tx ) {
      tx.executeSql('CREATE TABLE tb_meses ( id INTEGER PRIMARY KEY, nm_mes VARCHAR(50) );');
      tx.executeSql('INSERT INTO tb_meses ( nm_mes ) VALUES ( "Janeiro" ), ( "Fevereiro" ), ( "Março" ), ( "Abril" ), ( "Maio" ), ( "Junho" ), ( "Julho" ), ( "Agosto" ), ( "Setembro" ), ( "Outubro" ), ( "Novembro" ), ( "Dezembro" );');
    });
  })(db);

  function _dropTable ( table ) {
     db.transaction(function ( tx ) {
      tx.executeSql('DROP TABLE ' + table);
     });
  }
  

  function _executeQuery (query, callback) {
    db.transaction(function ( tx ) {
      tx.executeSql(query);
    });
  }

  function _dropDatabase () {
    db.transaction(function ( tx ) {
      tx.executeSql('DROP DATABASE db_timesheet');
    });
  }

  return {
    executeQuery: _executeQuery,
    dropTable: _dropTable,
    dropDatabase: _dropDatabase
  }
})();