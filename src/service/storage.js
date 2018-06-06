app.factory('storage', function () {
   let factory = {};

   factory.testBrowser = function () {
       try {
           let storage = window[type],
               x = '__storage_test__';
           storage.setItem(x, x);
           storage.removeItem(x);
           return true;
       }
       catch(e) {
           return e instanceof DOMException && (
                   // everything except Firefox
               e.code === 22 ||
               // Firefox
               e.code === 1014 ||
               // test name field too, because code might not be present
               // everything except Firefox
               e.name === 'QuotaExceededError' ||
               // Firefox
               e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
               // acknowledge QuotaExceededError only if there's something already stored
               storage.length !== 0;
       }
   };

   factory.setTestData = function() {
      for (let i = 0; i < EMPLOYEES.length; i++) {
          this.addEntity('employee' + EMPLOYEES[i].phone, EMPLOYEES[i])
      }
      for (let i = 0; i < DEPARTMENTS.length; i++) {
          this.addEntity('department' + DEPARTMENTS[i].name, DEPARTMENTS[i])
      }
      for (let i = 0; i < POSITIONS.length; i++) {
          this.addEntity('position'+POSITIONS[i].name, POSITIONS[i])
      }
   };

   factory.getEntity = function (key) {
       return JSON.parse(localStorage.getItem(key));
   };

   factory.addEntity = function (key, entity) {
       localStorage.setItem(key, JSON.stringify(entity));
   };

   factory.deleteEntity = function (key) {
       localStorage.removeItem(key);
   };

   factory.clear = function () {
       localStorage.clear();
   };

   factory.getAllEntities = function () {
       let values = [],
           keys = Object.keys(localStorage),
           i = keys.length;

       while ( i-- ) {
           values.push( this.getEntity(keys[i]) );
       }

       let time_ms = new Date().getTime();
       while (new Date().getTime() < time_ms + 3000) {}

       return values;
   };

   factory.getAllEntitiesOneType = function (type) {
       let values = [],
           keys = Object.keys(localStorage),
           i = keys.length;
       while ( i-- ) {
           if (keys[i].includes(type)) {
               values.push( this.getEntity(keys[i]) );
           }
       }

       //let time_ms = new Date().getTime();
       //while (new Date().getTime() < time_ms + 1000) {}
       if (type === 'department') {
           values = listToTree(values);
       }
       return values;
   };

   return factory;
});

function listToTree(list) {
    let tree = getRange(undefined);

    function getRange(parentName) {
        let range = [];
        let listLen = list.length;
        for (let counter = 0; counter < listLen; counter++){
            if(list[counter].parent === parentName) {
                const elem = list[counter].name;
                list.splice(counter, 1);
                listLen--;
                range.push({
                    parent: parentName,
                    name: elem,
                    children: getRange(elem)
                    });
                listLen = list.length;
                counter--;
            }
        }
        return range;
    }
    return tree;
}