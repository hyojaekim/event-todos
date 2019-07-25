const TODOAPP = (function () {
    'use strict';

    const todoTemplate =
        "<li>"+
            "<div class=\"view\">"+
                "<input class=\"toggle\" type=\"checkbox\">"+
                "<label class='label'>{{todoTitle}}</label>"+
                "<button class=\"destroy\"></button>"+
            "</div>"+
            "<input class=\"edit\" value=\"{{todoTitle}}\">"+
        "</li>";

    const todoItemTemplate = Handlebars.compile(todoTemplate);

    //todo 컨트롤러에 각 이벤트에 해당하는 이벤트 리스너를 등록해야한다.
    const TodoController = function () {
        const todoService = new TodoService()

        const addTodo = function () {
            const todoTitle = document.getElementById('new-todo-title')
            todoTitle.addEventListener('keydown', todoService.add)
        }

        //todo 리스트 앞의 체크박스를 클릭했을 떄 완료된 표시를 해줘야 한다.
        const completeTodo = function () {
            const todoList = document.getElementById('todo-list')
            todoList.addEventListener('click', (event) => {
                if (event.target.classList.contains('toggle')) {
                    todoService.complete(event);
                }
            })
        };

        //todo 리스트에서 x버튼을 눌렀을 때 삭제 할 수 있어야 한다.
        const deleteTodo = function () {
            const todoList = document.getElementById('todo-list');
            todoList.addEventListener('click', (event) => {
                if (event.target.classList.contains('destroy')) {
                    todoService.deleteTodo(event);
                }
            })
        };

        //todo 리스트의 타이틀을 변경할 수 있어야 한다.
        const updateTodo = function () {
            const todoList = document.getElementById('todo-list')
            todoList.addEventListener('dblclick', (event) => {
                if (event.target.classList.contains('label')) {
                    todoService.updateTodo(event);
                }
            })

            todoList.addEventListener('keydown', todoService.updateExcute)
        }

        const init = function () {
            addTodo()
            completeTodo()
            deleteTodo()
            updateTodo()
        }

        return {
            init: init
        }
    }


    const TodoService = function () {
        const todoAdd = function (event) {
            const todoTitle = event.target.value;
            const todoList = document.getElementById('todo-list');
            if(event.which === 13 && todoTitle !== '') {
                todoList.insertAdjacentHTML('beforeend', todoItemTemplate({"todoTitle": todoTitle}));
                event.target.value = ''
            }
        };

        const todoComplete = function (event) {
            const checkbox = event.target;
            checkbox.checked ? checkbox.parentElement.parentElement.classList.add('completed') :
                checkbox.parentElement.parentElement.classList.remove('completed');
        };

        const deleteTodo = function (event) {
            const deleteCheckbox = event.target;
            deleteCheckbox.parentElement.parentElement.remove();
        }

        const updateTodo = function (event) {
            event.target.closest("li").classList.add('editing')
        }

        const updateExcute = function (event) {
            if (event.which === 13) {
                const content = event.target.value;
                event.target.closest('li').classList.remove('editing');
                event.target.parentElement.getElementsByClassName('label')[0].innerHTML = content;
            }

            if (event.which === 27) {
                event.target.value = event.target.parentElement.getElementsByClassName('label')[0].innerHTML;
                event.target.closest('li').classList.remove('editing');

            }
        }

        return {
            add:todoAdd,
            complete:todoComplete,
            deleteTodo:deleteTodo,
            updateTodo:updateTodo,
            updateExcute:updateExcute
        }
    }

    const init = function () {
        const todoController = new TodoController()
        todoController.init()
    };

    return {
        init: init,
    };
})();

TODOAPP.init();
