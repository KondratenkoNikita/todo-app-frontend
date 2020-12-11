import './app.scss';

(() => {
const port = `5000`;
const host = `http://localhost:`;
const url = `${host}${port}`;
const urlAdd = `${url}/todo/add`;
const urlGetAll = `${url}/`;
const urlPut = `${url}/todo`;
const urlDelete = `${url}/todo`;

const closeIconClass = 'closeIcon'
const listHTML = document.getElementsByClassName('list')[0];
const inputHTML = document.getElementsByClassName('input')[0];
const closeIconHTML = document.querySelectorAll('close');
let todos = [];

const render = (list) => {
  const sortList = list.sort((a, b) => b.todo_id - a.todo_id);
  listHTML.innerHTML = '';
  const listTodo = sortList.map(({ todo_id, description }) => (
    `<div class="item" id=${todo_id}>
      <i class="far fa-check-circle doneIcon"></i>
        <input
          class="text disabledInput"
          value="${description}"
        />
      <i class="far fa-times-circle ${closeIconClass}"></i>
    </div>`
  ));

  listHTML.innerHTML += listTodo;
}

const addTodoByEnter = async (e = {}) => {
  const value = inputHTML.value;
  const { charCode = 0 } = e;
  if (charCode === 13 && value.trim() !== '') {
    await response('post', urlAdd, value.trim(), null);
    inputHTML.value = '';
  }
}

const deleteTodo = async (e) => {
  if (e.target.className.indexOf(closeIconClass) !== -1) {
    const id = e.toElement.closest('.item').id;
    await response('delete', urlDelete, null, id);
  }
};

const editTodo = (e) => {
  if (e.target.className.indexOf('item') !== -1) {
    const childNodes = e.toElement.childNodes;
    const id = e.toElement.closest('.item').id;
    const childNodesArray = Array.prototype.slice.call(childNodes);
    const currentInput = childNodesArray.find((item) => item.localName === 'input');
    currentInput.classList.remove('disabledInput');
    currentInput.select();
    currentInput.onkeypress = (e) => {
      if (e.charCode === 13) {
        response('put', urlPut, currentInput.value, id);
      }
    };
  }
};

document.addEventListener('keypress', (e) => addTodoByEnter(e));
document.addEventListener('click', (e) => deleteTodo(e));
document.addEventListener('dblclick', (e) => editTodo(e));

const response = async function foo(method, url, text, id) {
  const currentURL = id ? `${url}/${id}` : url;
  try {
    const res = await fetch(currentURL, {
      method,
      body: text && JSON.stringify({description: text}), 
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });
    if (method === 'get') {
      todos = await res.json();
      render(todos);
      return;
    };
    if (method === 'put'|| method === 'delete' || method === 'post') {
      await foo('get', urlGetAll, null, null);
      }
  } catch (e) {
    console.log(e);
  }
};

response('get', urlGetAll, null, null);
})()
