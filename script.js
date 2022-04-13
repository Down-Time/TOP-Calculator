var num1=null, num2=null, funcActive=0, answer, clearNext, clearRequired=false

function operate(num1, num2, operator){
    return {
        43:sum(num1,num2),
        45:difference(num1,num2),
        42:product(num1,num2),
        47:quotient(num1,num2)
    }[operator];  
}


const sum= (num1, num2)=>Number(num1)+Number(num2);

const difference=(num1,num2)=>Number(num1)-Number(num2);

const product=(num1, num2)=>Number(num1)*Number(num2);

const quotient=(num1, num2)=>{
        if (num2!=0){
        return Number(num1)/Number(num2);
    } else{
        clearRequired=true;
        return 'Div By 0 Error';
    }};



function userInput(input){
    
    let char=String.fromCharCode(input);
    let displayValue=document.querySelector('.display').textContent;
    let entryNotNumber=isNaN(displayValue)

    
    if((input==47 || input==42 || input==45 || input==43) && !clearRequired){
        if (funcActive==0 && !clearRequired){
            num1=displayValue;
            funcActive=input;
            document.querySelector('.display').textContent='';
        }
        else{
            num2=displayValue;
            num1=operate(num1, num2, funcActive);
            funcActive=input;
            document.querySelector('.display').textContent=num1;
            clearNext=true;
        }
    } else if(input==61 && !clearRequired){
        if (funcActive!=0){

                num2=displayValue;
                num1=(operate(num1, num2, funcActive));
                funcActive=0;
                clearNext=true;
                document.querySelector('.display').textContent=num1;
        }
        
    } else if (input==127){
            num1=null;
            num2=null;
            funcActive=0;
            clearNext=false;
            clearRequired=false
            document.querySelector('.display').textContent='';
            
    } else if((!(char.includes('.')) || !(displayValue.includes('.'))) && !clearRequired) {
        if (clearNext){
            document.querySelector('.display').textContent=char;
            clearNext=false;
        } else{
            document.querySelector('.display').textContent+=char;
        }
    }

}

function keyPress(e){

    const userKey={
        49:49,
        50:50,
        51:51,
        52:52,
        53:53,
        54:54,
        55:55,
        56:56,
        57:57,
        48:48, //zero
        47:47, //division
        42:42,  //multiplication
        45:45,  //subtraction
        43: 43,  //addition
        61: 61,  //equal or enter
        13: 61,
        46: 46 //.decimal point
    }[e.keyCode]

    document.querySelector(`.key[data-key="${userKey}"]`).classList.add('clicked')

    if (userKey>0){
        userInput(userKey);
    }
    
}

function mouseClick(e){
    e.target.classList.add('clicked');

    userInput(e.target.dataset.key);
}

function removeTransition(e){

    e.target.classList.remove('clicked');
  }

window.addEventListener('keypress', keyPress);

const keys = document.querySelectorAll('.key');
keys.forEach(key=>key.addEventListener('mouseup', mouseClick));
keys.forEach(key=>key.addEventListener('transitionend',removeTransition));