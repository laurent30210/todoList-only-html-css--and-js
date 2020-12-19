/** 
 * TODO
    - CREATE DOM
    - KEEP VALUE INPUT
    - CREATE LIST
    - CREATE TASK
    - INSERT TASK 
    - REFRESH DOM
    - DELETE TASK
*/


const app = {
    count: null,
    tasks: [
        {
        content: 'préparer les courses',
        status: true,
        },
        {
        content: 'acheter de la farine',
        status: false,
        },
        {
        content: 'prendre du lait',
        status: false,
        },
        {
        content: 'récupérer des oeufs',
        status: false,
        }
    ],
    list: null,
    main: document.querySelector('.main'),
    
    init() {
        app.newRender()       
    },    
    createFormInDom() {
        const form = document.createElement('form');
        form.classList.add('form');
        const input = document.createElement('input');
        input.classList.add('form__input');
        input.type = 'text';
        input.placeholder = 'Indiquer votre tâche ici';

        form.addEventListener('submit', app.catchInputValue);
        form.appendChild(input);
        app.main.appendChild(form);
    },
    createCounter() {
        const counterDiv = document.createElement('div');
        counterDiv.classList.add('counter');
        const counterContent = document.createElement('p');
        counterContent.classList.add('counter__content')

        const nbTaskActive = app.tasks.filter((task) => !task.status).length

        if(nbTaskActive === 0) {
            counterContent.textContent = 'Vous n\'avez pas encore de tâche en cours';
        } else if (nbTaskActive === 1) {
            counterContent.textContent = 'Vous avez qu\'une seule tâche en cours';
        } else {
            counterContent.textContent = `Vous avez ${nbTaskActive} tâches en cours`
        }

        counterDiv.appendChild(counterContent);
        app.main.appendChild(counterDiv);
    },
    catchInputValue(event) {
            event.preventDefault();
            let inputValue = event.target[0].value;
            // if empty value
            if(inputValue === ''){
               return;
            }
            // else push inputValue in Array
            app.tasks.push({
                // content 
                content: inputValue,
                // status for unchecked input
                status: false
            })            
            app.newRender();            
    },
    createList() {
        app.list = document.createElement('ul');
        app.list.className = 'list';

        app.main.appendChild(app.list);
        app.tasks.forEach((task, index) => {
            app.createTask(task, index);
        });
        // console.log(app.list);
    },
    onCheckboxChange(event, task) {
        task.status = event.target.checked;
        app.newRender();
    },
    createTask(task, index) {
       
            const content = task.content;
            const status  = task.status;
            // Create LI element
            const taskItem = document.createElement('li');
            taskItem.classList.add('task');
            taskItem.id = index;
            // Create INPUT element
            const inputCheckbox = document.createElement('input');
            inputCheckbox.classList.add('task__input');
            inputCheckbox.type = 'checkbox';
            inputCheckbox.id = index;
            // Create LABEL element
            const label = document.createElement('label');
            label.textContent = content;
            label.setAttribute("for", index);
            label.classList.add('task__label');
            // Create SPAN element
            const trash = document.createElement('span');
            trash.classList.add('task__trash');
            trash.textContent = 'X';

            trash.addEventListener('click', (event) => {
                app.deleteTask(event, index);
            });

            // check status'task -  if true => input checked
            if(status) {
                taskItem.classList.add('task--finished');
                inputCheckbox.checked = true;
            }
            // Add listener forEach input created
            inputCheckbox.addEventListener('change',
              (event) => app.onCheckboxChange(event, task)
            );
            
            taskItem.appendChild(inputCheckbox);
            taskItem.appendChild(label);
            taskItem.appendChild(trash);

            app.list.appendChild(taskItem);
            
    },
    deleteTask(event, index) {
        const target = event.target
        const taskSelected = target.closest('.task');
        // console.log(taskSelected)

        app.tasks.splice(index, 1);
        app.newRender();
    },
    newRender() {
        app.main.innerHTML = '';
        app.createFormInDom();
        app.createCounter();
        app.createList();
    },  
}


document.addEventListener('DOMContentLoaded', app.init);

