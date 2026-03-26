function submitData() {
    removeInputWarnings();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');
    message.textContent = '';
    message.style.color = 'red';
    let hasError = false;

    if (!name) { hasError = true; showInputWarning('name', 'กรุณากรอกชื่อ-นามสกุล'); }
    if (!email) { hasError = true; showInputWarning('email', 'กรุณากรอกอีเมล'); }
    if (!tel) { hasError = true; showInputWarning('tel', 'กรุณากรอกเบอร์โทร'); }
    if (!username) { hasError = true; showInputWarning('username', 'กรุณากรอก Username'); }
    if (!password) { hasError = true; showInputWarning('password', 'กรุณากรอก Password'); }

    if (hasError) {
        message.textContent = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        return;
    }
    message.style.color = 'green';
    message.textContent = 'สมัครสมาชิกสำเร็จ!';
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
