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
allPriorityColors.forEach(function(item){
    item.addEventListener('click', function(){
        allPriorityColors.forEach(function(item1){
            item1.classList.remove('active');
        })
        item.classList.add('active');
    })
})