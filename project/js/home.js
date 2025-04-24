// cho 2 nút sắp xếp chuyển màu
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Bỏ class 'active' khỏi tất cả các nút
        filterButtons.forEach(b => b.classList.remove('active'));

        // Thêm class 'active' vào nút được bấm
        btn.classList.add('active');
    });
});
