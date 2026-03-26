function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
function filterRooms() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('filterType').value;
    const genderFilter = document.getElementById('filterGender').value;

    const cards = document.querySelectorAll('.dorm-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matchText = input === '' || text.includes(input);
        const matchType = typeFilter === 'all' || card.dataset.type === typeFilter;
        const matchGender = genderFilter === 'all' || card.dataset.gender === genderFilter;
        card.style.display = (matchText && matchType && matchGender) ? 'flex' : 'none';
    });
}

function openModal(dormNum, dormName) {
    const modal = document.getElementById('roomModal');
    const title = document.getElementById('modalTitle');
    const grid = document.getElementById('modalRoomGrid');

    title.textContent = dormName;
    grid.innerHTML = '';

    // คำนวณ capacity ตามตึก
    let capacity;
    if ((dormNum >= 1 && dormNum <= 5) || (dormNum >= 11 && dormNum <= 15)) {
        capacity = 4;
    } else if (dormNum <= 8 || (dormNum >= 16 && dormNum <= 18)) {
        capacity = 3;
    } else {
        capacity = 2;
    }

    // สร้าง 16 ห้อง ใช้ seeded random เพื่อให้ข้อมูลตรงกันทั้งระบบ
    for (let i = 1; i <= 16; i++) {
        const seed = dormNum * 100 + i;
        const hash = Math.sin(seed) * 10000;
        const rand = hash - Math.floor(hash);
        const occupied = Math.floor(rand * (capacity + 1));
        const vacant = capacity - occupied;
        const isAvailable = vacant > 0;
        const roomCard = document.createElement('div');
        roomCard.className = 'modal-room-card ' + (isAvailable ? 'available' : 'full');

        roomCard.innerHTML = `
            <div class="modal-room-number">ห้อง ${dormNum}${String(i).padStart(2, '0')}</div>
            <div class="modal-room-status ${isAvailable ? 'status-available' : 'status-full'}">
                <i class="fa-solid ${isAvailable ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                ${isAvailable ? 'ว่าง ' + occupied + '/' + capacity : 'เต็ม ' + capacity + '/' + capacity}
            </div>
            ${isAvailable
                ? `<a href="roomdetail.html?dorm=${dormNum}&room=${i}" class="modal-room-btn">เลือก <i class="fa-solid fa-chevron-right"></i></a>`
                : `<span class="modal-room-btn disabled">เต็ม</span>`
            }
        `;
        grid.appendChild(roomCard);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    if (event.target === document.getElementById('roomModal')) {
        closeModalDirect();
    }
}

function closeModalDirect() {
    const modal = document.getElementById('roomModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
