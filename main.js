function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleBtn = document.getElementById('toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.textContent = '😈'; // Đổi icon mắt thành mắt bị gạch chéo
    } else {
        passwordField.type = 'password';
        toggleBtn.textContent = '😇'; // Đổi lại icon mắt
    }
}

// Thêm các chức năng JavaScript khác ở đây
