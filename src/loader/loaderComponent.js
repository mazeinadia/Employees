function loaderController() {
    let ctrl = this;
}

app.component('loader', {
    templateUrl: 'src/loader/loader.html',
    controller: loaderController
});


app.directive('loading', function ($compile) {
   return {
       restrict: 'A',
       scope: {
           loading: '@'
       },
       link: function (scope, element, attributes) {
           scope.$watch('loading', function (value) {
               log('loader ' + value);
               if (value === 'true') {
                   //show
                   element.append('<loader>');
                   $compile(element.contents())(scope)
               }else {
                   //hide
                   let child = element.children()[0];
                   if (child){
                       child.remove();
                       $compile(element.contents())(scope)
                   }
               }
           })
       }
   }
});