import { addTodo, cancelTodo, editTodo, showMenu } from "./components/addtodo_component.js";
import { appendLoader, removeLoader } from "./components/loader.js";
import {createTimer, initTimer} from "./components/pomodoro_component.js";
import { addTaskTypeToStorage, deleteType, openMenuTaskType, selectTypeHandler, setTaskTypesFromStorage} from "./components/task-type_component.js";
import {setTodoFromStorage,clearList, todoIеmsAction}  from "./components/todo_list_component.js";
import './sass/main.scss'

//Loader
appendLoader()
if(localStorage.getItem('todos') === null){
    localStorage.setItem('todos',JSON.stringify([]))
}
if(localStorage.getItem('types') === null){
    localStorage.setItem('types',JSON.stringify([]))
}

window.onload = () => {
    //Remove loader
    setTimeout(removeLoader,500)
    
    document.querySelector('.appContainer').style.visibility = "visible"
    document.querySelector('.addTodoContainer').style.visibility = "visible"
    document.querySelector('.taskTypeDialog').style.visibility = "visible"

    //Обработчик выбора типа задачи для помодоро
    selectTypeHandler(createTimer)

    //Кнопки приложения
    const addTodoConfirm = document.querySelector(".confirmTodo")
    const addTodoCancel =  document.querySelector(".cancelTodo")
    const editTodoConfirm = document.querySelector(".confirmTodoEdit")
    const addBtn = document.querySelector('.addBtn')
    const deleteAllBtn = document.querySelector('.deleteBtn')
   

    //Контейнер списка дел
    const todoList = document.querySelector('.todoList')
    todoList.addEventListener('click',(event)=>{todoIеmsAction(event,setTodoFromStorage)})
    
    //Функции для кнопок
    addTodoCancel.addEventListener('click',()=>{cancelTodo()})
    addTodoConfirm .addEventListener('click',()=>{addTodo(setTodoFromStorage)})
    editTodoConfirm.addEventListener('click', ()=>{editTodo()})
    addBtn.addEventListener('click',()=>{showMenu("add")})
    deleteAllBtn.addEventListener('click',()=>{clearList(setTodoFromStorage)})

    
    // Заполняем список тудушек при запуске
    if(localStorage.getItem('todos').length != 0){
        setTodoFromStorage()
    }
    // Заполняем список типов помодоро при запуске
    if(localStorage.getItem('types').length != 0){
        setTaskTypesFromStorage()
    }

    //Таймер - старт
    const startButton = document.querySelector('.startBtn')
    startButton.addEventListener('click', ()=>{
      initTimer('start')
    })
    //Таймер - стоп
    const stopButton = document.querySelector('.stopBtn')
    stopButton.addEventListener('click', ()=>{
        initTimer('stop')
    })
  
    //Открыть или скрыть
    const taskTypeBtn = document.querySelector('.taskType')
    taskTypeBtn.addEventListener('click',()=>{
        openMenuTaskType()
    })
    const taskTypeBack = document.querySelector('.taskTypeMenuClose')
    taskTypeBack.addEventListener('click',()=>{
        openMenuTaskType()
    })

    //Добавить новый вид таска для помодоро
    const addTaskType = document.querySelector('.addTaskTypeBtn')
    addTaskType.addEventListener('click',()=>{
        addTaskTypeToStorage(setTaskTypesFromStorage)
    })

    //Удалить тип таска для помодоро
    const taskTypesList = document.querySelector('.taskTypeList')
    taskTypesList.addEventListener('click',(e)=>{
       deleteType(e.target)
    })
   }
