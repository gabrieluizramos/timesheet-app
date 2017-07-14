var database = (function(){
  
  'use strict';

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
    if ( !_db.storage.length ) {
      for ( var month = 0 ; month < months.length ; month++) {
        if ( !localStorage[ months[ month ] ] ) {
          _db.storage.setItem( [ months[ month ] ] , null );
        }
      }
      console.log('[ Timesheet | Database ] created months');
    }
    console.log('[ Timesheet | Database ] ready');
    return createStorage;
  })();

  _db.functions.drop = function(){
    _db.storage.clear();
    console.log('[ Timesheet | Database ] cleared');

    _db.functions.createStorage()
  }

  _db.functions.deleteMonthData = function ( monthName ) {
    _db.storage[ monthName ] = null;
    return true;
  }

  _db.functions.setMonthData = function ( monthName , data ) {
     _db.storage[ monthName ] = _db.helpers.parseJSON( data );
    return true;
  }

  _db.functions.getMonthData = function ( monthName ) {
    return _db.helpers.parseJSON( _db.storage[ monthName ] , true );
  }

  _db.functions.getDataByDayAndMonth = function ( monthName , day ) {
    return _db.helpers.parseJSON( _db.storage[ monthName ] , true )[ day ];
  }

  _db.functions.getAllData = function(){
    return _db.storage;
  }

  // Return only functions ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  return _db.functions
})();