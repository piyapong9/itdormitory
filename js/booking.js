function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
function updateDormOptions() {
    const gender = document.getElementById('genderSelect').value;
    const type = document.getElementById('typeSelect').value;
    const dormSelect = document.getElementById('dormSelect');
    const roomSelect = document.getElementById('roomSelect');

    dormSelect.innerHTML = '<option value="">-- เลือกหอพัก --</option>';
    roomSelect.innerHTML = '<option value="">-- เลือกห้อง --</option>';

    if (!gender || !type) return;

    let start, end, label;
    if (gender === 'male' && type === 'fan') { start = 1; end = 5; label = 'หอพักชายตึก'; }
    else if (gender === 'male' && type === 'air') { start = 6; end = 10; label = 'หอพักชายตึก'; }
    else if (gender === 'female' && type === 'fan') { start = 11; end = 15; label = 'หอพักหญิงตึก'; }
    else if (gender === 'female' && type === 'air') { start = 16; end = 20; label = 'หอพักหญิงตึก'; }

    for (let i = start; i <= end; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = label + ' ' + i;
        dormSelect.appendChild(opt);
    }
}
function updateRoomOptions() {
    const dormNum = parseInt(document.getElementById('dormSelect').value);
    const roomSelect = document.getElementById('roomSelect');
    roomSelect.innerHTML = '<option value="">-- เลือกห้อง --</option>';

    if (!dormNum) return;

    let capacity;
    if ((dormNum >= 1 && dormNum <= 5) || (dormNum >= 11 && dormNum <= 15)) {
        capacity = 4;
    } else if (dormNum <= 8 || (dormNum >= 16 && dormNum <= 18)) {
        capacity = 3;
    } else {
        capacity = 2;
    }

    for (let i = 1; i <= 16; i++) {
        const roomCode = dormNum + String(i).padStart(2, '0');
        const seed = dormNum * 100 + i;
        const hash = Math.sin(seed) * 10000;
        const rand = hash - Math.floor(hash);
        const occupied = Math.floor(rand * (capacity + 1));
        const vacant = capacity - occupied;
        const isAvailable = vacant > 0;

        const opt = document.createElement('option');
        opt.value = i;
        if (isAvailable) {
            opt.textContent = 'ห้อง ' + roomCode + ' (' + occupied + '/' + capacity + ' ว่าง)';
        } else {
            opt.textContent = 'ห้อง ' + roomCode + ' (เต็ม)';
            opt.disabled = true;
            opt.style.color = '#ccc';
        }
        roomSelect.appendChild(opt);
    }
}
function showInputWarning(inputElem, text) {
    
    const parent = inputElem.parentNode;
    let oldWarn = parent.querySelector('.input-warning');
    if (oldWarn) oldWarn.remove();
    let warn = document.createElement('div');
    warn.className = 'input-warning';
    warn.style.color = 'red';
    warn.style.fontSize = '13px';
    warn.style.marginTop = '2px';
    warn.textContent = text;
    parent.appendChild(warn);
}

function removeInputWarnings() {
    let warns = document.querySelectorAll('.input-warning');
    warns.forEach(w => w.remove());
}

function goToPayment() {
    removeInputWarnings();
    const form = document.querySelector('.booking-form-card');
    const inputs = form.querySelectorAll('input, select');
    let hasError = false;
    inputs.forEach(input => {
        
        let labelElem = input.closest('.form-group, .form-row')?.querySelector('label');
        let label = labelElem ? labelElem.textContent.replace('*', '').trim() : '';
        if (input.hasAttribute('required') || (labelElem && labelElem.innerHTML.includes('required'))) {
            if (!input.value || input.value === '') {
                if (input.tagName.toLowerCase() === 'select') {
                    showInputWarning(input, 'กรุณาเลือก' + (label ? label : 'ข้อมูล'));
                } else {
                    showInputWarning(input, 'กรุณากรอก' + (label ? ' ' + label : 'ข้อมูล'));
                }
                hasError = true;
            }
        }
    });
    
    const dormSelect = document.getElementById('dormSelect');
    const roomSelect = document.getElementById('roomSelect');
    if (dormSelect && !dormSelect.value) {
        showInputWarning(dormSelect, 'กรุณาเลือกหอพัก');
        hasError = true;
    }
    if (roomSelect && !roomSelect.value) {
        showInputWarning(roomSelect, 'กรุณาเลือกห้อง');
        hasError = true;
    }
    if (hasError) return;
    window.location.href = `payment.html?dorm=${dormSelect.value}&room=${roomSelect.value}`;
}
