function loginData() {
    removeInputWarnings();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');
    message.textContent = '';
    message.style.color = 'red';
    let hasError = false;

    if (!username) {
        showInputWarning('username', 'กรุณากรอก Username');
        hasError = true;
    }
    if (!password) {
        showInputWarning('password', 'กรุณากรอก Password');
        hasError = true;
    }
    if (hasError) return;

    if (username === 'ppppp' && password === '1234') {
        window.location.href = 'homepage.html';
    } else {
        showInputWarning('username', 'Username หรือ Password ไม่ถูกต้อง');
        showInputWarning('password', 'Username หรือ Password ไม่ถูกต้อง');
        message.textContent = '';
    }
}

function showInputWarning(inputId, text) {
    let input = document.getElementById(inputId);
    let warn = document.createElement('div');
    warn.className = 'input-warning';
    warn.style.color = 'red';
    warn.style.fontSize = '13px';
    warn.style.marginTop = '2px';
    warn.textContent = text;
    input.parentNode.appendChild(warn);
}

function removeInputWarnings() {
    let warns = document.querySelectorAll('.input-warning');
    warns.forEach(w => w.remove());
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
