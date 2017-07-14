var database = (function(){
  // Database Creation ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  var _db = {
    storage: localStorage,
    functions: {},
    helpers: {}
  }

  // Database Helpers :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  _db.helpers.parseJSON = function ( stringJSON , toJSON ) {
    return toJSON ? JSON.parse( stringJSON ) : JSON.stringify( stringJSON );
  }
  
  // Database Functions :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  _db.functions.createStorage = (function createStorage(){
    var months = timeMachine.getAllMonthsOfYear();
    for ( var month = 0 ; month < months.length ; month++) {
      if ( !localStorage[ months[ month ] ] ) {
        console.log('Criado mês com sucesso: ' + months[ month ] );
        _db.storage.setItem( [ months[ month ] ] , null );
      }
    }

    return createStorage;
  })();

  _db.functions.deleteAll = function(){
    _db.storage.clear();
    _db.functions.createStorage()
  }

  _db.functions.deleteMonthData = function ( monthName ) {
    _db.storage[ monthName ] = null;
    return true;
  }

  _db.functions.setMonthData = function ( monthName , data ) {
    _db.storage[ monthName ] = data;
    return _db.storage[ monthName ];
  }

  _db.functions.getMonthData = function ( monthName ) {
    return _db.storage[ monthName ];
  }

  _db.functions.getAllData = function(){
    return _db.storage;
  }

  // Return only functions ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  return _db.functions
})();