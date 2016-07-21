# ToDoMVC之AngularJS学习

标签（空格分隔）： AngularJS

---

#1. 引言
[ToDoMVC](http://todomvc.com/)是采用很多套MV* 框架来实现来实现一个固定规范的JavaScript Web App，从而方便我们对不同的框架进行学习和比较。

* 框架概述：
    - CSS：ToDoMVC为我们提供了index.css和base.css两个css文件，所以本程序并不需要编写CSS代码。
    - HTML：整个应用包含三个部分：header、main和footer。header提供表单输入，main显示、编辑、删除事项，footer主要显示统计信息。
    ```html
        <section id="todoapp">
            <header id="header">...
            </header>
            <section id="main">...
            </section>
            <footer id="footer">...
            </footer>
        </section>
    ```
        上述代码都写在`<script type="text/ng-template" id="todomvc-index.html">`作为一个模板输出。

    - JavaScript：AngularJS采用ngRoute作为App的路由系统。
        - todoCtrl.js 编写主要的业务逻辑，
        - toStorage.js 编写与localStorage交互的逻辑，主要包含增删改除，
        - todoEscape.js 编写监听ESC键取消编辑的指令，
        - todoFocus.js 编写获取焦点的指令。


##具体需求：
### No todos

When there are no todos, `#main` and `#footer` should be hidden.

### New todo

New todos are entered in the input at the top of the app. The input element should be focused when the page is loaded, preferably by using the `autofocus` input attribute. Pressing Enter creates the todo, appends it to the todo list, and clears the input. Make sure to `.trim()` the input and then check that it's not empty before creating a new todo.

在新增任务的表单中增加`ng-submit="addTodo()"`，并且在$scope中绑定函数
```javascript
<!-- 新增任务 -->
<form id="todo-form" ng-submit="addTodo()">
    <input type="text" id="new-todo" placeholder="待办事项" ng-model="newTodo" autofocus>
</form>

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
```

### Mark all as complete

This checkbox toggles all the todos to the same state as itself. Make sure to clear the checked state after the "Clear completed" button is clicked. The "Mark all as complete" checkbox should also be updated when single todo items are checked/unchecked. Eg. When all the todos are checked it should also get checked.

在checkbox中绑定`ng-model="allChecked"`，并且绑定click函数`ng-click="markAll(allChecked)"`
```javascript
<!-- 全选/全不选 任务 -->
<input type="checkbox" id="toggle-all" ng-click="markAll(allChecked)" ng-model="allChecked">

$scope.markAll = function(allChecked) {
        var length = todos.length;

        for (var i = 0; i < length; i++) {
            todos[i].completed = allChecked;
            store.put(todos[i],i);
        }
    };
```
### Item

A todo item has three possible interactions:

1. Clicking the checkbox marks the todo as complete by updating its `completed` value and toggling the class `completed` on its parent `<li>`

2. Double-clicking the `<label>` activates editing mode, by toggling the `.editing` class on its `<li>`

3. Hovering over the todo shows the remove button (`.destroy`)

```javascript
 <li ng-repeat="todo in todos track by $index" ng-class="{completed: todo.completed, editing:todo == editTodo}">
    <div class="view">
        <input type="checkbox" class="toggle" ng-model="todo.completed">
        <label ng-dblclick="showEdit(todo)">{{todo.title}}</label>
        <!-- 删除任务 -->
        <button class="destroy" ng-click="deleteTodo($index)"></button>
    </div>
    <!-- 编辑任务 -->
    <form>
        <input type="text" class="edit">
    </form>
</li>

$scope.deleteTodo = function(index) {
    store.delete(index);
};

$scope.showEdit = function (todo) {
    $scope.editTodo = todo;
}
```

### Editing

When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title, which should be focused (`.focus()`). The edit should be saved on both blur and enter, and the `editing` class should be removed. Make sure to `.trim()` the input and then check that it's not empty. If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.
    
####双击后input自动获取焦点：
定义一个指令
```javascript
<input type="text" class="edit" ng-blur="saveEdit(todo)" ng-model = "todo.title" index="{{$index}}" todo-focus = "todo === editTodo" todo-escape="revertEdit(todo)">

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
```
**<font color=red>但是不明白，为什么focus事件需要放在$timeout中？</font>**

####按住ESC键撤销编辑：

```javascript
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

$scope.revertEdit = function(todo){
    angular.extend(todo, $scope.orginTodo);
    $scope.editTodo = null;
};
```
### Counter

Displays the number of active todos in a pluralized form. Make sure the number is wrapped by a `<strong>` tag. Also make sure to pluralize the `item` word correctly: `0 items`, `1 item`, `2 items`. Example: **2** items left

### Clear completed button

Removes completed todos when clicked. Should be hidden when there are no completed todos.
清除完成项：
```javascript
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
```
>重点在于使用filter过滤出未完成的list

### Persistence

Your app should dynamically persist the todos to localStorage. If the framework has capabilities for persisting data (e.g. Backbone.sync), use that. Otherwise, use vanilla localStorage. If possible, use the keys `id`, `title`, `completed` for each item. Make sure to use this format for the localStorage name: `todos-[framework]`. Editing mode should not be persisted.

把调用localStorage的功能写在服务中，主要包含增删改查等功能。
```javascript
//注册服务
todomvc.factory('localStorage', ['$q', function($q) {

    var STORAGE_ID = 'myStorage';
    ...
}]);
```

页面加载时从localStorage中读取事项：
```javascript
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
```


### Routing

Routing is required for all implementations. If supported by the framework, use its built-in capabilities. Otherwise, use the  [Flatiron Director](https://github.com/flatiron/director) routing library located in the `/assets` folder. The following routes should be implemented: `#/` (all - default), `#/active` and `#/completed` (`#!/` is also allowed). When the route changes, the todo list should be filtered on a model level and the `selected` class on the filter links should be toggled. When an item is updated while in a filtered state, it should be updated accordingly. E.g. if the filter is `Active` and the item is checked, it should be hidden. Make sure the active filter is persisted on reload.




