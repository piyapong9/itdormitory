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
let dormNameText, dormType, capacity, price;
if (dormNum >= 1 && dormNum <= 5) {
    dormNameText = 'หอพักชายตึก ' + dormNum;
    dormType = 'พัดลม';
    capacity = 4;
    price = '฿2,000/เทอม';
} else if (dormNum >= 6 && dormNum <= 10) {
    dormNameText = 'หอพักชายตึก ' + dormNum;
    dormType = 'แอร์';
    capacity = dormNum <= 8 ? 3 : 2;
    price = '฿2,000/เดือน';
} else if (dormNum >= 11 && dormNum <= 15) {
    dormNameText = 'หอพักหญิงตึก ' + dormNum;
    dormType = 'พัดลม';
    capacity = 4;
    price = '฿2,000/เทอม';
} else {
    dormNameText = 'หอพักหญิงตึก ' + dormNum;
    dormType = 'แอร์';
    capacity = dormNum <= 18 ? 3 : 2;
    price = '฿2,000/เดือน';
}
const roomCode = dormNum + String(roomNum).padStart(2, '0');
const seed = dormNum * 100 + roomNum;
const hash = Math.sin(seed) * 10000;
const rand = hash - Math.floor(hash);
const occupied = Math.floor(rand * (capacity + 1));
const vacant = capacity - occupied;
const isAvailable = vacant > 0;
const vacancy = occupied + '/' + capacity;
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('roomName').textContent = dormNameText;
    document.getElementById('roomNumber').textContent = roomCode;
    document.getElementById('dormType').textContent = dormType;
    document.getElementById('dormPrice').textContent = price;
    document.title = 'ห้อง ' + roomCode + ' - ' + dormNameText;
    document.getElementById('btnBooking').href = 'payment.html?dorm=' + dormNum + '&room=' + roomNum;
    const badge = document.getElementById('statusBadge');
    if (isAvailable) {
        badge.textContent = 'ว่าง ' + vacancy;
        badge.className = 'status-badge available';
    } else {
        badge.textContent = 'เต็ม ' + capacity + '/' + capacity;
        badge.className = 'status-badge unavailable';
        document.getElementById('btnBooking').style.display = 'none';
    }
    if (dormType === 'แอร์') {
        document.getElementById('mainImg').src = 'https://dorm.kku.ac.th/wp-content/uploads/2023/04/110776.jpg';
    } else {
        document.getElementById('mainImg').src = 'https://dorm.op.swu.ac.th/Portals/22/BlockBuilderImages/10817/12.jpg';
    }
});
