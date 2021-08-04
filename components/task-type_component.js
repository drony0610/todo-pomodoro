import { hideMenu } from "./addtodo_component"

// Создание объекта для хранения в базе
const taskType = (data) => { 
    return {
        id: data.id,
        title: data.title ,
        time: 0,
        color: data.color || "#c9c9c9",
    }
}
// Рендер типов для таймера помодоро
const renderTypes = (data) =>{
   return(
    `<li class="typeItem" data-id="${data.id}" style = "
    background: radial-gradient(54.23% 235.86% at 100.14% 96.75%, rgba(11, 11, 11, 0.41) 0%, rgba(255, 255, 255, 0) 100%), 
    radial-gradient(48.09% 276.32% at 0% 11.04%, rgba(255, 255, 255, 0.36) 0%, rgba(238, 238, 238, 0) 100%),
     ${data.color};" onclick =  >${data.title}
    <span class="deleteTypeBtn"></span></li>`
   )
}
// Функция открывает и закрывает боковое меню
const openMenuTaskType = () =>{
   const menu =  document.querySelector('.taskTypeDialog')
   if(menu.classList.contains('taskTypeHidden')){
    menu.classList.remove('taskTypeHidden')
   }else{
    menu.classList.add('taskTypeHidden')
   }
}
// Получаем из хранилища айтемы и заливаем их внутрь контейнера с рендером html кода
const setTaskTypesFromStorage = ()=>{
    if(localStorage.getItem('types') === null ) {
        const arr = []
        localStorage.setItem('types', [JSON.stringify(arr)])
    }
    const types = JSON.parse(localStorage.getItem('types')) 
    const typesContainer = document.querySelector('.taskTypeList')
    typesContainer.innerHTML = types.map(e=>renderTypes(e)).join('\n')
   
}

// Добавляем в сторадж
const addTaskTypeToStorage = (callback = null) =>{
    // если инпут не пуст то собираем объект и пушим его в сторадж
   if(document.querySelector('.addTasktypeInput').value != ''){
        const inputResult = document.querySelector('.addTasktypeInput').value
        // функция taskType возвращает готовый объект "taskType" c параметрами по умолчанию или нашими
        const typeData = taskType({
            id: JSON.parse(localStorage.getItem('types')).length,
            title:inputResult,
            color:colorGenerator()
        })
        // если сторадж не пустой, то парсим старые данные, в массив и пушим новый элемент в этот массив
        if(localStorage.getItem('types').length != 0 ){
            const data = JSON.parse(localStorage.getItem('types'))
            data.push(typeData)
            localStorage.setItem('types',JSON.stringify(data))
            // ререндер интерфейса, чтобы список показал добавленный айтем
            callback()
        }else{
             // Если локал сторадж пустой
             const arr = []
             arr.push(typeData)
             localStorage.setItem('todos', [JSON.stringify(arr)])
        }
    
    }   
   

}

//Генератор цветов для фона при создании элемента
const colorGenerator = () => {
    const basicColors = [
        "#E8D06D",
        "#96ceb4",
        "#ff6f69",
        "#e35d6a",
        "#fa7e1e",
        "#d62976",
        "#4f5bd5",
        "#962fbf",
        "#243447",
        "#9867c5",
        "#e39ff6",
        "#6773cf",
        "#65d5ba",
        "#F36E12",
    ]
    const randomColorId = Math.floor(Math.random()*(basicColors.length))
    return basicColors[randomColorId]
}


// Удаление типа работы для помодоро
const deleteType = (target) =>{
    if(target.classList.contains('deleteTypeBtn')){
        // забираем id у родителя из датасета и удаляыем по нему элемент
        const parentId = target.parentElement.dataset.id
        const data = JSON.parse(localStorage.getItem('types'))
        data.splice(parentId,1)
        // перезаписываем id самих объектов внутри стороаджа иначе при удалении элемент будет 0 , а внутри объекта id - 1
        data.map((i,j)=>{
            i.id = j
        })
        //заливаем новый массив в сторадж и обновляем ui
        localStorage.setItem('types', JSON.stringify(data))
        setTaskTypesFromStorage()
    }
}
// Обработчик выбранного элемента для проброса в объект в базе и измененеия текста внутри помодоро таймера
const selectTypeHandler = (callback) =>{
    document.querySelector('.taskTypeList').addEventListener('click',(event)=>{
        if(event.target.classList.contains('typeItem')){
            const typeId = event.target.dataset.id
            //очищаем innerHtml от лишнего текста и внутренних тегов
            const typeTitle = event.target.innerHTML.substring(0,event.target.innerHTML.indexOf('\n'))
            const data = JSON.parse(localStorage.getItem('timerSettings'))
            const newData = {...data, task:typeTitle,taskId:typeId}
            console.log(newData)
            localStorage.setItem('timerSettings',JSON.stringify(newData))
            //Повторяемый код. Такая же строчка есть в функции updateUi в pomodoro
          
            document.querySelector('.taskText').innerHTML = newData.task
        }
        callback()
        if(event.target.classList.contains('typeItem')){
            openMenuTaskType()
        }
      
        
    })
}


export {openMenuTaskType,addTaskTypeToStorage,setTaskTypesFromStorage,selectTypeHandler,deleteType}
