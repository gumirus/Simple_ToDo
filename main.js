const todoInput = document.querySelector('.todo__input')
const todoBtn = document.querySelector('.todo__btn')
const todoList = document.querySelector('.todo__list')

// Создаем кастомный алерт
const customAlert = document.createElement('div')
customAlert.className = 'custom-alert'
customAlert.innerHTML = `
  <div class="custom-alert-content">
    <div class="custom-alert-message"></div>
    <button class="custom-alert-close">Хорошо</button>
  </div>
`
document.body.appendChild(customAlert)

// Функция для показа кастомного алерта
function showCustomAlert(message) {
  const alertMessage = customAlert.querySelector('.custom-alert-message')
  alertMessage.textContent = message
  customAlert.style.display = 'flex'

  // Закрытие по клику на кнопку
  const closeBtn = customAlert.querySelector('.custom-alert-close')
  closeBtn.addEventListener('click', function () {
    customAlert.style.display = 'none'
    todoInput.focus()
  })

  // Закрытие по клику вне окна
  customAlert.addEventListener('click', function (e) {
    if (e.target === customAlert) {
      customAlert.style.display = 'none'
      todoInput.focus()
    }
  })
}

todoBtn.addEventListener('click', addTask)

function addTask() {
  if (todoInput.value.trim() === '') {
    showCustomAlert('Введите текст')
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
