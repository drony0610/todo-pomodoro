// TODO сделать удаление типов таска 
let timerSettings
let repeatCounts
let minutes, workTime, longBreak, shortBreak, taskName,taskId
let isWork = true
let minutesInterval
let secondsInterval
const saveSettingsBtn = document.querySelector('.saveSettings')
const checkbox =  document.getElementById('timerSettingsBtn')
const settingsContainer = document.querySelector('.advancedSettings')
// Обновление данных в таймере (чисел в таймере и инпутов в настройках)
const updateTimerUi = (data) =>{
    document.querySelector('.taskText').innerHTML = data.task
    document.querySelector('.repeatTimesCounter').innerHTML = data.repeat
    document.querySelector('.minutes').innerHTML = data.work
    document.querySelector('.seconds').innerHTML = "00"
    document.querySelector('.work_inp').value = data.work
    document.querySelector('.short_b_inp').value = data.short_b
    // document.querySelector('.long_b_inp').value = data.longBreak
    document.querySelector('.repeat_inp').value = data.repeat
}

//Очистка инпута при клике на него
const clearInputWhenFocus = () =>{
    document.querySelectorAll('.settingsInput').forEach((e)=>{
        e.addEventListener('click',(event)=>{
             event.target.value = ""
        })
    })
}
clearInputWhenFocus()


//Таймер - применить настройки
saveSettingsBtn.addEventListener('click',()=>{
    const storageData = JSON.parse(localStorage.getItem('timerSettings'))
    const inputs = document.querySelectorAll('.settingsInput')
    inputs.forEach((e)=>{
        if(e.value.length == 0){
            console.log("пустые инпуты примут значение по умолчанию")
        }
    })
    //делаем spread для queryselectorAll, чтобы трансформировать nodeList в Array
      let data  = [...document.querySelectorAll('.settingsInput')].map((e,i) => {
        return {[e.dataset.setting_type]:e.value || null}
     })
      //приводим массив объектов к единому объекту
      data = Object.assign({},...data)
     // Cливаем вместе новую дату таймера и старую дату из стораджа,
     const newData = {...data, task:storageData.task, taskId:storageData.taskId}
     console.log(storageData)
     localStorage.setItem('timerSettings',JSON.stringify(newData))
     // собираем данные для таймера в объект и обновляем
     createTimer()
     updateTimerUi(timerSettings)
     
})
 
//дата для таймера
const createTimer = (data = {}) => {
    if(localStorage.getItem('timerSettings') != null){
        data = JSON.parse(localStorage.getItem('timerSettings'))
    }
    timerSettings = {
        work: parseInt(data.work) || 25,
        long_b: parseInt(data.long_b) || 15,
        short_b:parseInt(data.short_b) || 3,
        repeat: parseInt(data.repeat) || 4,
        task: data.task || 'Выбрать таск',
        taskId: parseInt(data.taskId),
    }
    if(localStorage.getItem('timerSettings') === null){
        localStorage.setItem('timerSettings',JSON.stringify(timerSettings))
    }
    
    

    // updateTimerUi(timerSettings)

    workTime = timerSettings.work
    repeatCounts = timerSettings. repeat
    longBreak = timerSettings.long_b
    shortBreak = timerSettings.short_b
    taskName = timerSettings.task
    taskId = timerSettings.taskId
}



createTimer()
updateTimerUi(timerSettings)


const initTimer = (stage) => {

    // Пороверка интервала. Если нету, то включить иначе - очистить интервал ( остановить )
    if (stage == 'start') {

        // деактивация кнопки на время таймера
        document.querySelector('.startBtn').disabled = true
        document.querySelector('.startBtn').style.width = 0
        document.querySelector('.startBtn').style.marginRight = 0
        //---------------------

        // заполнение стартовых данных таймера в состоянии  работа/отдых
        document.querySelector('.repeatTimesCounter').innerHTML = repeatCounts
        if (isWork == true) {
            minutes = workTime
            document.querySelector('.taskText').innerHTML = taskName
            
            console.log(minutes, "work", isWork, taskName,taskId)
        } else {
            minutes = shortBreak
            console.log(minutes, "rest", isWork,taskName,taskId)
          
            document.querySelector('.taskText').innerHTML = "Отдых"
        }


        minutes = minutes - 1
        document.querySelector('.minutes').innerHTML = minutes

        let seconds = 59
        document.querySelector('.seconds').innerHTML = seconds


        // таймер на минуты
        const minutesTimer = () => {
            minutes = minutes - 1
            document.querySelector('.minutes').innerHTML = minutes
            if (minutes == 0) {
                minutes = 0
            }
        }
        // таймер на секунды
        const secondsTimer = () => {
            if (seconds == 60) {
                document.querySelector('.seconds').innerHTML = '00'
            }
            seconds = seconds - 1
            document.querySelector('.seconds').innerHTML = seconds

            if (seconds < 10) {
                document.querySelector('.seconds').innerHTML = `0${seconds}`
            }
            // Проверка состояния таймера и переключение на отдых или работу. Уменьшение кол-ва кругов таймера
            if (seconds <= 0) {
                if (minutes <= 0) {
                    clearInterval(secondsInterval)
                    clearInterval(minutesInterval)
                    isWork = !isWork
                    if (repeatCounts != 0) {
                        initTimer('start')
                    }else{
                        document.querySelector('.startBtn').disabled = false
                        document.querySelector('.startBtn').style.width = '45%'
                        document.querySelector('.startBtn').style.marginRight = "10%"
                    }
                    document.querySelector('.repeatTimesCounter').innerHTML = repeatCounts
                    
                    if (isWork == false) {
                        --repeatCounts

                    }
                }
                seconds = 60
            }
        }

        minutesInterval = setInterval(minutesTimer, 60000);
        secondsInterval = setInterval(secondsTimer, 1000);

    }
     else if (stage == "stop"){
        clearInterval(minutesInterval)
        clearInterval(secondsInterval)
        document.querySelector('.startBtn').disabled = false
        document.querySelector('.startBtn').style.width = '45%'
        document.querySelector('.startBtn').style.marginRight = "10%"
        isWork = true
        updateTimerUi(timerSettings)
    }
}


const hideSettings=()=>{
  
   if(checkbox.checked === true){
        settingsContainer.classList.remove('hideSettings')
   
    
   }else{
        settingsContainer.classList.add('hideSettings')
     
     
   }
}
hideSettings()
checkbox.addEventListener('click',()=>{
    hideSettings()
})

export {
    initTimer,
    createTimer
}