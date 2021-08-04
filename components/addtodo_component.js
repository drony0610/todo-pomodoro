const addTodoInput = document.querySelector('.addTodoInput')
const menuBody = document.querySelector('.addTodoContainer')
const addTodoTitle = document.querySelector('.addTodoTitle')

//Прячет меню
const hideMenu = () => {
   menuBody.classList.remove('showSideMenu')
   addTodoInput.classList.remove('emptyValue')
}
// Функция, открывающая боковое меню
// key нужен для того, чтобы определять с каким статусом открывать меню - добавление таска или же редактирование таска
// taskTitle нужен для подсказки пользователю имени текущего изменяемого таска
const showMenu = (key,taskTitle) => {
    if( key === "add"){
        addTodoTitle.innerHTML = "Добавить задачу"
        // Переключатель двух кнопок. Вынужденная мере, чтобы не было конфликта слушателей  с разными функциями 
        // на одной кнопке. Для этого сделал 2 кнопки
        document.querySelector(".confirmTodo").style.display = "block"
        document.querySelector(".confirmTodoEdit").style.display = "none"
        addTodoInput.placeholder = ''
    }else if(key === "edit"){
        addTodoTitle.innerHTML = "Редактировать задачу"
        document.querySelector(".confirmTodo").style.display = "none"
        document.querySelector(".confirmTodoEdit").style.display = "block"
        addTodoInput.placeholder = taskTitle
    }
    menuBody.classList.add('showSideMenu')
}

//Добавляем тудуайтем
const addTodo = (callback)=>{
    if(addTodoInput.value != ""){
        // собираем объект айтема туду
          let todoData = {
              // id генерируется на основе длины массива внутри стораджа
              id: JSON.parse(localStorage.getItem('todos')).length,
              title: addTodoInput.value,
              completeState:false,
          }
          // Получаем данные из стораджа и добавляем айтем (тут запрос к БД в будущем)
          // Если локал сторадж не пустой
          if(localStorage.getItem('todos').length != 0 ){
              const data =  JSON.parse(localStorage.getItem('todos'))
              data.push(todoData)
              localStorage.setItem('todos', JSON.stringify(data))
              callback()
          }else{
              // Если локал сторадж пустой
              const arr = []
              arr.push(todoData)
              localStorage.setItem('todos', [JSON.stringify(arr)])
          }
          hideMenu()
        
      // Проверка инпута, если ничего не написано то подсветить ошибку пользователю
      }else{
          addTodoInput.classList.add('emptyValue')
          addTodoInput.placeholder = 'введите таск'
      }
      addTodoInput.value = ""
      
}
// Изменяем наш айтем берем валуе из инпута и забираем id из невидимого контейнера в котором id запушила функция todoIеmsAction
// запрашиваем из стораджа массив элементов находим нужный по id и меняем тайтл и пушим в сторадж обновленный массив
// так же меняем тайтл нашему DOM элементу через innerHTML
// TODO логичней здесь сделать так, чтобы менялся title сразу в сторадже а потом при нажатии кнопки загрузить обновленные данные и запушить в лист
const editTodo = () =>{
    if(addTodoInput.value != ""){
        const element = document.querySelector('.editDataContainer')
        const items = document.querySelectorAll('.toDoItem')
        const id = parseInt(element.innerHTML)
        items[id].querySelector('.text').innerHTML = addTodoInput.value
        const todos = JSON.parse(localStorage.getItem('todos')) 
        todos[id].title = addTodoInput.value
        localStorage.setItem('todos', JSON.stringify(todos))
         // Обнуляем инпут и прячем боковое меню
        addTodoInput.value = ''
        hideMenu()
       }
}

// Кнопка отмены в боковом меню, если не хочет редактировать или добавлять таск
const cancelTodo = () =>{
    addTodoInput.value = ""
    hideMenu()
}


export {hideMenu,showMenu,addTodo,cancelTodo,editTodo}