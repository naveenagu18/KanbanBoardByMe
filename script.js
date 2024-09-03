let addbtn = document.querySelector('.add-btn');
let modalcont = document.querySelector('.modal-cont');
let addbtnFlag = false;
addbtn.addEventListener('click', function(){
    addbtnFlag = !addbtnFlag;
    if(addbtnFlag === true){
        modalcont.style.display = 'flex';        
    }
    else{
        modalcont.style.display = 'none';
    }
})

let removebtn = document.querySelector('.remove-btn');
let removebtnFlag = false;
removebtn.addEventListener('click', function(){
    removebtnFlag = !removebtnFlag;
    if(removebtnFlag === true){
        alert('Remove button activated');
        removebtn.style.color = 'red';        
    }
    else{
        removebtn.style.color = 'white';
    }
})

let allPriorityColors = document.querySelectorAll('.priority-color');
let activeColorClass = 'black';
allPriorityColors.forEach(function(item){
    item.addEventListener('click', function(){
        allPriorityColors.forEach(function(item1){
            item1.classList.remove('active');
        })
        item.classList.add('active');
        activeColorClass = item.classList[0]; //because we added colors as 1st class in html
    })
})

let mainContainer = document.querySelector('.main-cont');
let textAreacont = document.querySelector('.textArea-cont');
modalcont.addEventListener('keydown', function(e){
    console.log(e.key);
    if(e.key === 'Enter'){
        createTicket(activeColorClass, textAreacont.value)
        textAreacont.value = '';
        addbtnFlag = false;
        modalcont.style.display = 'none';
    }
})

let ticketsArr = [];

function createTicket(ticketColor, ticketText, ticketID){
    let id = ticketID || shortid();
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute('class','ticket-cont');
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">${id}</div>
    <div class="ticket-area">${ticketText}</div>
    <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
    </div>
    `;
    mainContainer.appendChild(ticketCont);
    handleLock(ticketCont, id);
    handleRemove(ticketCont, id);
    if(!ticketID){
        ticketsArr.push({ticketColor, ticketText, ticketID : id});//naming 3rd columns as ticketID instead of id
        localStorage.setItem('tickets', JSON.stringify(ticketsArr));
    }
}

function handleLock(ticketCont, id){
    let ticketLock = ticketCont.querySelector('.ticket-lock');
    let ticketLockIcon = ticketLock.children[0];
    let ticketTextArea = ticketCont.querySelector('.ticket-area');
    ticketLockIcon.addEventListener('click', function(){
        if(ticketLockIcon.classList.contains('fa-lock')){
            ticketLockIcon.classList.remove('fa-lock');
            ticketLockIcon.classList.add('fa-lock-open');
            ticketTextArea.setAttribute('contenteditable', true);
        }
        else{
            ticketLockIcon.classList.remove('fa-lock-open');
            ticketLockIcon.classList.add('fa-lock');
            ticketTextArea.setAttribute('contenteditable', false);
            //add updated text while closing the lock
            let ticketIndex = getTicketIndex(id);
            ticketsArr[ticketIndex].ticketText = ticketTextArea.innerText;
            localStorage.setItem('tickets', JSON.stringify(ticketsArr));
        }
    });
}

function handleRemove(ticketCont, id){
    ticketCont.addEventListener('click', function(){
        if(!removebtnFlag) return; //if remove button is not active do nothing
        ticketCont.remove(); //when remove button is active and ticket is clicked remove it from dom
        let idxToBeRemoved = getTicketIndex(id); //get the idx to be removed from the array
        ticketsArr.splice(idxToBeRemoved, 1);
        localStorage.setItem('tickets', JSON.stringify(ticketsArr));
    });
}

function getTicketIndex(ticketID){
    let filteredTicketIndex = ticketsArr.findIndex(function(item){
        return item.ticketID === ticketID;
    });
    return filteredTicketIndex;
}

let toolBoxColors = document.querySelectorAll('.color');

toolBoxColors.forEach(function(item){
    item.addEventListener('click', function(){
        let selectedItemColor = item.classList[0];
        let filteredTickets = ticketsArr.filter(function(item){
            return selectedItemColor === item.ticketColor;
        });
        let allTickets = document.querySelectorAll('.ticket-cont');
        allTickets.forEach(function(item){
            if(item.children[0].classList[1] != selectedItemColor){
                item.style.display = 'none';
            }
            else{
                item.style.display = 'block';
            }
        })
    })

    item.addEventListener('dblclick', function(){
        let allTickets = document.querySelectorAll('.ticket-cont');
        allTickets.forEach(function(item){
            item.style.display = 'block';
        })
    })
});

if(localStorage.getItem('tickets')){
    ticketsArr = JSON.parse(localStorage.getItem('tickets'));
    ticketsArr.forEach(function(item){
        createTicket(item.ticketColor, item.ticketText, item.ticketID);
    })
}