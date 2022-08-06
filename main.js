//quede min 3015

const tasks=[];
let time=0;
let timer = null;
let timerBreak = null;
let current  = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTask();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(itTask.value !== ' '){
        createTask(itTask.value);
        itTask.value = ' ';
        renderTask();
        
    }
})

function createTask(value){ 

    const newtask ={
        id: (Math.random()* 100).toString(36).slice(3),
        title: value,
        completed: false
    } 
    
    tasks.unshift(newtask);

}

function renderTask(){
    const html = tasks.map((task) => {
        return `
        <div class="task">
            <div class="completed">${
                task.completed 
                ? `<span class="done">Done</span>` 
                : `<button class= "start-button" data-id= "${task.id}">Start</button>`
            } </div>
            <div class="title"> ${task.title} </div>
        </div>
        `;
    });

    const taskContainer = document.querySelector('#tasks');
    taskContainer.innerHTML= html.join("");

    const startButtons = document.querySelectorAll('.task .start-button');
    startButtons.forEach( button => {
        button.addEventListener('click', e =>{
            if(!timer){
                const id= button.getAttribute('data-id');
                startButtonsHandler(id);
                button.textContent='In Progress...'


            }
        });
    });

}
function startButtonsHandler(id){
    time = 5;
    current= id;
    const taskIndex = tasks.findIndex( task => task.id === id);
    
    taskName.textContent= tasks[taskIndex].title;
    renderTime()
    timer= setInterval(()=>{
        timeHandler(id)

    },1000)

}
function timeHandler(id){
    time--
    renderTime()

    if(time===0){
        clearInterval(timer)
        markCompleted(id)
        timer= null
        renderTask()
        startBreak()
    }

}
function renderTime(){
    const timeDiv= document.querySelector('#time #value')
    const minutos= parseInt(time/60)
    const seconds= parseInt(time%60)

    timeDiv.textContent=`${minutos < 10 ? '0' : ''}${minutos}:${seconds < 10 ? '0' : ''}${seconds}`

}

function markCompleted(id){
    const taskIndex = tasks.findIndex( (task) => task.id === id);
    tasks[taskIndex].completed= true
}

function startBreak(){
    time = 5
    taskName.textContent= 'Break'
    renderTime()
    timerBreak = setInterval(()=>{
        timerBreakhandler()
    }, 1000)
}

function timerBreakhandler(){
    time--
    renderTime()

    if(time===0){
        clearInterval(timerBreak)
        current= null
        timer=null
        timerBreak=null
        taskName.textContent=''
        renderTask()

    }
}
