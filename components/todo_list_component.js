import { addTaskFromMenu, editTodo, showMenu } from "./addtodo_component"
// const addBtn = document.querySelector('.addBtn')
// const deleteAllBtn = document.querySelector('.deleteBtn')

//Рендерим айтемы
const renderTodoItem = (data) => {
    return(
        `<div class="toDoItem ${data.completeState ? "completed" : ""}">
        <p class="text">${data.title}</p>
        <img class = "edit" src = "img/edit-ic.svg" data-id = "${data.id}">
        <input type="checkbox"  ${ data.completeState ? "checked" : ""} class = "completeToggler" data-id = "${data.id}">
        </div>`
    )
}
//Очищаем список и  обновляем DOM через коллбек
const clearList = (callback) =>{
    localStorage.setItem('todos', JSON.stringify(new Array()))
    callback()
}
//Грузим список из хранилища
const setTodoFromStorage = () =>{
    if(localStorage.getItem('todos') === null ) {
        const arr = []
        localStorage.setItem('todos', [JSON.stringify(arr)])
    }
    const todos = JSON.parse(localStorage.getItem('todos')) 
    const todoListContainer = document.querySelector('.todoList')
    todoListContainer.innerHTML = todos.map(e=>renderTodoItem(e)).join('\n')
    completeTodo()
}

// Редактирование и выполнение таска
const todoIеmsAction = (event) =>{
    // Редактируем таск - получаем информацию и id из кликнутого элемента
    // Помещаем айди в невидимый контейнер на боковом меню (пока так)
    // TODO найти решение данного функционала без костыля в виде невидимого контейнера для id (через асинк или промис) 
    if(event.target.classList.contains('edit')){
       const elementId = event.target.dataset.id
       let title = event.target.parentElement.querySelector('.text').innerHTML
       showMenu('edit',title)
       document.querySelector('.editDataContainer').innerHTML = elementId
    }
}   

const completeTodo = ()=>{
    const completeTodoCheckboxes = document.querySelectorAll('.completeToggler')
    completeTodoCheckboxes.forEach((e)=>{
        e.addEventListener('click',(event)=>{
           
            const id = event.target.dataset.id
            if(event.target.checked === true){
                document.querySelectorAll('.toDoItem')[id].classList.add('completed')
                let todos = JSON.parse(localStorage.getItem('todos'))
                todos[id].completeState = true
                localStorage.setItem('todos',JSON.stringify(todos))
                
            }else{
                document.querySelectorAll('.toDoItem')[id].classList.remove('completed')
                let todos = JSON.parse(localStorage.getItem('todos'))
                todos[id].completeState = false
                localStorage.setItem('todos',JSON.stringify(todos))
             
            }
        })
    })
}

export {renderTodoItem,clearList,setTodoFromStorage,todoIеmsAction}