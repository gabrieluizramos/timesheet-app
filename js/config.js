
requirejs.config({
  "baseUrl": "js/modules",
  "paths": {
    "timemachine": "timemachine",
    "database": "database",
    "app": "app"
  }
})

requirejs(['app']);