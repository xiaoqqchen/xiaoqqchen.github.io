var todomvc = angular.module('todomvc', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        var config = {
            templateUrl: "todomvc-index.html",
            controller: "TodoCtrl",
            resolve: {
                store: function(localStorage) {
                    localStorage.get();
                    return localStorage;
                }
            }
        };

        $routeProvider.when('/', config)
            .when("/:status", config);
    }]);

//注册服务
todomvc.factory('localStorage', ['$q', function($q) {

    var STORAGE_ID = 'myStorage';

    //增删改查
    var store = {
        todos: [],

        _saveLocalStorage: function(newTodo) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(newTodo));
        },

        _getLocalStrorage: function() {
            return JSON.parse(localStorage.getItem(STORAGE_ID));
        },

        //清除完成任务
        clearCompleted: function() {
            var deferred = $q.defer();

            var incompleteTodos = store.todos.filter(function(todo){
                return !todo.completed;
            });

            angular.copy(incompleteTodos,store.todos);
            store._saveLocalStorage(store.todos);

            return deferred.promise;
        },

        //插入新增任务
        insert: function(todo) {
            var deferred = $q.defer();

            store.todos.push(todo);
            store._saveLocalStorage(store.todos);

            deferred.resolve(store.todos);

            return deferred.promise;
        },

        //从localStorage中获取数据
        get: function() {
            var deferred = $q.defer();

            angular.copy(store._getLocalStrorage(), store.todos);

            deferred.resolve(store.todos);
            return deferred.promise;
        },

        //删除localStorage中对应的数据
        delete: function(todo) {
            var deferred = $q.defer();

            var index = store.todos.indexOf(todo);
            store.todos.splice(index, 1);
            store._saveLocalStorage(store.todos);

            deferred.resolve(store.todos);
            return deferred.promise;

        },

        //修改任务事项
        put: function(todo, index) {
            var deferred = $q.defer();

            store.todos[index] = todo;
            store._saveLocalStorage(store.todos);

            deferred.resolve(store.todos);
            return deferred.promise;
        }
    };

    return store;
}]);




todomvc.controller('TodoCtrl', function($scope, $routeParams, $filter, store) {
    var todos = $scope.todos = store.todos;

    $scope.newTodo = '';
    $scope.editTodo = null; //{}

    $scope.$watch('todos',function(){
        $scope.todoCount = todos.length;
    },true);

    //增加任务
    $scope.addTodo = function() {
        var newTodo = {
            title: $scope.newTodo.trim(),
            completed: false
        };

        if (newTodo.title == "") {
            return;
        }

        $scope.saving = true;
        store.insert(newTodo).then(function() {
            $scope.newTodo = "";
            console.log(arguments[0]);
            return arguments[0];
        }).finally(function() {
            $scope.saving = false;
        });
    };

    $scope.deleteTodo = function(index) {
        store.delete(index);
    };

    $scope.markAll = function(allChecked) {
        var length = todos.length;

        for (var i = 0; i < length; i++) {
            todos[i].completed = allChecked;
            store.put(todos[i], i);
        }
    };

    $scope.showEdit = function(todo) {
        $scope.editTodo = todo;
        $scope.orginTodo = angular.extend({}, todo);
    };

    $scope.saveEdit = function(todo) {

        todo.title = todo.title.trim();

        store[todo.title ? "put" : "delete"](todo)
            .then(function success() {
                $scope.editTodo = null;
            });

    };

    $scope.revertEdit = function(todo){
        angular.extend(todo, $scope.orginTodo);
        $scope.editTodo = null;
    };

    $scope.clearCompleted = function(){
        store.clearCompleted();
    };
});

todomvc.directive('todoFocus', function($timeout) {
    // Runs during compile
    return function($scope, iElm, iAttrs, controller) {

        $scope.$watch(iAttrs.todoFocus, function(isEdit) {
            if (isEdit) {
                //iElm[0].focus();
                $timeout(function() {
                    iElm[0].focus();
                }, 0);

            }
        })
    };
});

//指令监听ESC按键
todomvc.directive('todoEscape', function() {
    var ESCAPE_KEY = 27;

    return function($scope, elem, attrs) {
        elem.bind('keydown',function(event){
            if(event.keyCode === ESCAPE_KEY){
                $scope.$apply(attrs.todoEscape);
            }
        }); 
    }
});
