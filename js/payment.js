
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

const params = new URLSearchParams(window.location.search);
const dormNum = parseInt(params.get('dorm')) || 1;
const roomNum = parseInt(params.get('room')) || 1;

let dormNameText, dormType, price, duration;
if (dormNum >= 1 && dormNum <= 5) {
    dormNameText = 'หอพักชายตึก ' + dormNum;
    dormType = 'พัดลม';
    price = '฿2,000 บาท/เทอม';
    duration = '1 ภาคเรียน (3 เดือน)';
} else if (dormNum >= 6 && dormNum <= 10) {
    dormNameText = 'หอพักชายตึก ' + dormNum;
    dormType = 'แอร์';
    price = '฿2,000 บาท/เดือน';
    duration = '1 ภาคเรียน (3 เดือน)';
} else if (dormNum >= 11 && dormNum <= 15) {
    dormNameText = 'หอพักหญิงตึก ' + dormNum;
    dormType = 'พัดลม';
    price = '฿2,000 บาท/เทอม';
    duration = '1 ภาคเรียน (3 เดือน)';
} else {
    dormNameText = 'หอพักหญิงตึก ' + dormNum;
    dormType = 'แอร์';
    price = '฿2,000 บาท/เดือน';
    duration = '1 ภาคเรียน (3 เดือน)';
}

const roomCode = dormNum + String(roomNum).padStart(2, '0');
document.getElementById('payDormName').textContent = dormNameText;
document.getElementById('payRoomNumber').textContent = roomCode;
document.getElementById('payDormType').textContent = dormType;
document.getElementById('payDuration').textContent = duration;
document.getElementById('payTotal').textContent = price;

function showFileName(input) {
    if (input.files.length > 0) {
        document.getElementById('fileName').textContent = 'ไฟล์ที่เลือก: ' + input.files[0].name;
    }
}
function submitPayment() {
    document.getElementById('successModal').style.display = 'flex';
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

function validatePaymentForm() {
    removeInputWarnings();
    const form = document.querySelector('.payment-form');
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
    return !hasError;
}
