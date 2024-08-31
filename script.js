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

function createTicket(ticketColor, ticketText){
    let id = shortid();
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
    handleColor();
    handleLock();
    handleRemove(ticketCont, id);
    ticketsArr.push({ticketColor, ticketText, ticketID : id});//naming 3rd columns as ticketID instead of id
}

function handleColor(){

}

function handleLock(){

}

function handleRemove(ticketCont, id){
    ticketCont.addEventListener('click', function(){
        if(!removebtnFlag) return; //if remove button is not active do nothing
        ticketCont.remove(); //when remove button is active and ticket is clicked remove it from dom
        let idxToBeRemoved = getTicketIndex(id); //get the idx to be removed from the array
        ticketsArr.splice(idxToBeRemoved, 1);
    });
}

function getTicketIndex(ticketID){
    let filteredTicketIndex = ticketsArr.findIndex(function(item){
        return item.ticketID === ticketID;
    });
    return filteredTicketIndex;
}