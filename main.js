const todoInput = document.querySelector('.todo__input')
const todoBtn = document.querySelector('.todo__btn')
const todoList = document.querySelector('.todo__list')

todoBtn.addEventListener('click', function () {
  addTask()
})

function addTask() {
  if (todoInput.value === '') {
    alert('Введите текст')
  } else {
    let li = document.createElement('li')
    li.innerHTML = todoInput.value
    todoList.appendChild(li)
    let span = document.createElement('span')
    span.innerHTML = '\u00d7'
    li.appendChild(span)
  }
  todoInput.value = ''
  saveData()
}

todoList.addEventListener('click', function (e) {
  const taskItem = e.target.closest('li')
  if (!taskItem) return

  if (e.target.tagName === 'SPAN') {
    taskItem.remove()
  } else {
    taskItem.classList.toggle('checked')
  }

  saveData()
})

function saveData() {
  localStorage.setItem('data', todoList.innerHTML)
}

function showData() {
  todoList.innerHTML = localStorage.getItem('data')
}

showData()
