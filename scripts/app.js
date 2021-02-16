function eventListener() {
    const newBudgetForm = document.getElementById('newBudgetForm');
    const newExpenseForm = document.getElementById('newExpenseForm');
    const expenseList = document.getElementById('expenseList');

    newBudgetForm.addEventListener('submit', function(event) {
        event.preventDefault();
        newBudgetHandler(event);
    });

    newExpenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        newExpenseHandler(event);
    });

    // expenseListDelete.addEventListener('click', function(event) {
    //     deleteExpenseHandler(this.dataset.id);
    // });
}

function newBudgetHandler(event) {
    const input = document.getElementById('changeBudgetInput');
    const weeklyBudgetText = document.getElementById('weeklyBudgetText');
    const validator = document.getElementById('changeBudgetValidator');
    if(input.value) {
        weeklyBudgetText.innerText = input.value;
        validator.classList.remove('display');
        input.value = null;
        handleBalance();
    }else {
        validator.innerText = 'Add your budget amount';
        validator.classList.add('display');
    }
}

function newExpenseHandler(event) {
    const titleInput = document.getElementById('newExpenseTitle');
    const valueInput = document.getElementById('newExpenseValue');
    const expensesText = document.getElementById('expensesText');
    const titleValidator = document.getElementById('newTitleValidator');
    const valueValidator = document.getElementById('newValueValidator');
    if(titleInput.value && valueInput.value) {
        expensesText.innerText = parseInt(expensesText.innerText) + parseInt(valueInput.value);
        valueValidator.classList.remove('display');
        titleValidator.classList.remove('display')
        handleBalance();
        addExpenseToList(titleInput.value, valueInput.value);
        titleInput.value = null;
        valueInput.value = null;
    }else {
        if(titleInput.value) {
            titleValidator.classList.remove('display');
            valueValidator.innerText = 'Add the expense amount';
            valueValidator.classList.add('display');
        }else if(valueInput.value) {
            valueValidator.classList.remove('display');
            titleValidator.innerText = 'Add the expense title';
            titleValidator.classList.add('display');
        }else {
            titleValidator.innerText = 'Add the expense title';
            titleValidator.classList.add('display');
            valueValidator.innerText = 'Add the expense amount';
            valueValidator.classList.add('display');
        }
    }
}

function deleteExpenseHandler(deleteButton, value) {
    const expensesText = document.getElementById('expensesText');
    deleteButton.parentNode.parentNode.remove();
    expensesText.innerText = parseInt(expensesText.innerText) - parseInt(value);
    handleBalance();
}

function deleteAll() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    const expensesText = document.getElementById('expensesText');
    const weeklyBudgetText = document.getElementById('weeklyBudgetText');
    const balanceText = document.getElementById('balanceText');
    expensesText.innerText = 0;
    weeklyBudgetText.innerText = 0;
    balanceText.innerText = 0;
}

function addExpenseToList(title, amount) {
    const expenseList = document.getElementById('expenseList');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const icon = document.createElement('i');
    const a = document.createElement('a');

    icon.classList.add('fas');
    icon.classList.add('fa-trash-alt');
    icon.classList.add('red-icon');
    a.appendChild(icon);
    a.classList.add('cursor-pointer');
    a.dataset.value = amount;
    a.addEventListener('click', function(event) {
        deleteExpenseHandler(this, this.dataset.value);
    });
    td1.innerText = title;
    td2.innerText = amount;
    td3.appendChild(a);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    expenseList.appendChild(tr);
}

function handleBalance(event) {
    const expensesText = document.getElementById('expensesText');
    const weeklyBudgetText = document.getElementById('weeklyBudgetText');
    const balanceText = document.getElementById('balanceText');
    balanceText.innerText = (parseInt(weeklyBudgetText.innerText) - parseInt(expensesText.innerText));
}

document.addEventListener('DOMContentLoaded', () => {
    eventListener();
});