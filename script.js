// 获取DOM元素
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 加载保存的任务
let tasks = [];

// 加载本地存储的任务
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
}

// 保存任务到本地存储
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 渲染任务列表
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.flex = '1';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.className = 'delete-btn';
        
        // 切换完成状态
        li.addEventListener('click', (e) => {
            if (e.target !== deleteBtn) {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            }
        });
        
        // 删除任务
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// 添加新任务
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({
            text: text,
            completed: false
        });
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }
}

// 绑定事件
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 初始化
loadTasks();