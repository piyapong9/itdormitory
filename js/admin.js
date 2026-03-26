function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
function searchBookings() {
    const input = document.getElementById('searchTable').value.toLowerCase();
    const rows = document.querySelectorAll('#bookingTable tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    });
}
function filterStatus(status) {
    const rows = document.querySelectorAll('#bookingTable tr');
    rows.forEach(row => {
        if (status === 'all' || row.dataset.status === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

const studentData = {
    1: {
        id: 'S001', name: 'นายสมชาย ใจดี', faculty: 'คณะวิศวกรรมศาสตร์',
        phone: '081-234-5678', email: 'somchai@email.com',
        dorm: 'หอพักชายพัดลม ตึก 1', room: '101', type: 'พัดลม',
        bookDate: '28 ก.พ. 69', price: '฿2,000 บาท/เทอม',
        payMethod: 'โอนผ่านธนาคาร', payDate: '28 ก.พ. 69', payStatus: 'ชำระเงินแล้ว'
    },
    2: {
        id: 'S002', name: 'นางสาวสมหญิง รักเรียน', faculty: 'คณะศิลปศาสตร์และวิทยาศาสตร์',
        phone: '082-345-6789', email: 'somying@email.com',
        dorm: 'หอพักหญิงพัดลม ตึก 11', room: '1102', type: 'พัดลม',
        bookDate: '1 มี.ค. 69', price: '฿2,000 บาท/เทอม',
        payMethod: '-', payDate: '-', payStatus: 'รอดำเนินการ'
    },
    3: {
        id: 'S003', name: 'นายประวิทย์ เก่งมาก', faculty: 'คณะเกษตร',
        phone: '083-456-7890', email: 'prawit@email.com',
        dorm: 'หอพักชายแอร์ ตึก 6', room: '601', type: 'แอร์',
        bookDate: '1 มี.ค. 69', price: '฿2,000 บาท/เดือน',
        payMethod: '-', payDate: '-', payStatus: 'รอดำเนินการ'
    },
    4: {
        id: 'S004', name: 'นางสาววรรณา สดใส', faculty: 'คณะศึกษาศาสตร์และพัฒนศาสตร์',
        phone: '084-567-8901', email: 'wanna@email.com',
        dorm: 'หอพักหญิงพัดลม ตึก 11', room: '1101', type: 'พัดลม',
        bookDate: '25 ก.พ. 69', price: '฿2,000 บาท/เทอม',
        payMethod: 'โอนผ่านธนาคาร', payDate: '25 ก.พ. 69', payStatus: 'ชำระเงินแล้ว'
    },
    5: {
        id: 'S005', name: 'นายณัฐพล ขยันดี', faculty: 'คณะอุตสาหกรรมบริการ',
        phone: '085-678-9012', email: 'nattapon@email.com',
        dorm: 'หอพักชายแอร์ ตึก 6', room: '602', type: 'แอร์',
        bookDate: '20 ก.พ. 69', price: '฿2,000 บาท/เดือน',
        payMethod: 'โอนผ่านธนาคาร', payDate: '20 ก.พ. 69', payStatus: 'ชำระเงินแล้ว'
    },
    6: {
        id: 'S006', name: 'นางสาวกมลชนก สวยงาม', faculty: 'คณะสัตวแพทยศาสตร์',
        phone: '086-789-0123', email: 'kamonchon@email.com',
        dorm: 'หอพักหญิงแอร์ ตึก 16', room: '1602', type: 'แอร์',
        bookDate: '2 มี.ค. 69', price: '฿2,000 บาท/เดือน',
        payMethod: '-', payDate: '-', payStatus: 'รอดำเนินการ'
    }
};

function viewDetail(id) {
    const s = studentData[id];
    if (!s) return;
    const isPaid = s.payStatus === 'ชำระเงินแล้ว';
    const badgeClass = isPaid ? 'paid' : 'pending';
    let html = `
        <h3 class="modal-section-title"><i class="fa-solid fa-id-card"></i> ข้อมูลนักศึกษา</h3>
        <div class="modal-row"><span>รหัสนักศึกษา:</span><span>${s.id}</span></div>
        <div class="modal-row"><span>ชื่อ-นามสกุล:</span><span>${s.name}</span></div>
        <div class="modal-row"><span>คณะ:</span><span>${s.faculty}</span></div>
        <div class="modal-row"><span>เบอร์โทร:</span><span>${s.phone}</span></div>
        <div class="modal-row"><span>อีเมล:</span><span>${s.email}</span></div>
        <h3 class="modal-section-title"><i class="fa-solid fa-building"></i> ข้อมูลการจอง</h3>
        <div class="modal-row"><span>หอพัก:</span><span>${s.dorm}</span></div>
        <div class="modal-row"><span>เลขห้อง:</span><span>${s.room}</span></div>
        <div class="modal-row"><span>ประเภท:</span><span>${s.type}</span></div>
        <div class="modal-row"><span>วันที่จอง:</span><span>${s.bookDate}</span></div>
        <div class="modal-row"><span>ยอดชำระ:</span><span class="price">${s.price}</span></div>
        <h3 class="modal-section-title"><i class="fa-solid fa-credit-card"></i> ข้อมูลการชำระเงิน</h3>
        <div class="modal-row"><span>ช่องทางชำระ:</span><span>${s.payMethod}</span></div>
        <div class="modal-row"><span>วันที่ชำระ:</span><span>${s.payDate}</span></div>
        <div class="modal-row"><span>สถานะ:</span><span class="badge ${badgeClass}" style="font-size:14px">${s.payStatus}</span></div>
    `;
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('detailModal').style.display = 'flex';
}

function approveBooking(btn) {
    const row = btn.closest('tr');
    if (row.dataset.status !== 'paid') {
        alert('สามารถอนุมัติได้เฉพาะรายการที่ชำระเงินแล้วเท่านั้น');
        return;
    }
    row.dataset.status = 'approved';
    const badge = row.querySelector('.badge');
    badge.className = 'badge approved clickable';
    badge.textContent = 'อนุมัติแล้ว';
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = '<span style="color:#A66518;font-weight:bold;font-size:14px"><i class="fa-solid fa-circle-check"></i> อนุมัติแล้ว</span>';
}

function rejectBooking(btn) {
    const row = btn.closest('tr');
    if (row.dataset.status !== 'paid') {
        alert('สามารถดำเนินการได้เฉพาะรายการที่ชำระเงินแล้วเท่านั้น');
        return;
    }
    if (!confirm('ต้องการไม่อนุมัติรายการนี้ใช่หรือไม่?')) return;
    row.dataset.status = 'rejected';
    const badge = row.querySelector('.badge');
    badge.className = 'badge rejected clickable';
    badge.textContent = 'ไม่อนุมัติ';
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = '<span style="color:#721c24;font-weight:bold;font-size:14px"><i class="fa-solid fa-circle-xmark"></i> ไม่อนุมัติ</span>';
}

function approveAllPaid() {
    const rows = document.querySelectorAll('#bookingTable tr[data-status="paid"]');
    if (rows.length === 0) {
        alert('ไม่มีรายการที่ชำระเงินแล้วรอการอนุมัติ');
        return;
    }
    if (!confirm(`ต้องการอนุมัติทั้งหมด ${rows.length} รายการใช่หรือไม่?`)) return;
    rows.forEach(row => {
        row.dataset.status = 'approved';
        const badge = row.querySelector('.badge');
        badge.className = 'badge approved clickable';
        badge.textContent = 'อนุมัติแล้ว';
        const actionCell = row.querySelector('td:last-child');
        actionCell.innerHTML = '<span style="color:#A66518;font-weight:bold;font-size:14px"><i class="fa-solid fa-circle-check"></i> อนุมัติแล้ว</span>';
    });
}

function closeModal() {
    document.getElementById('detailModal').style.display = 'none';
}
