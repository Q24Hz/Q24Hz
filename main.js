function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleBtn = document.getElementById('toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.textContent = '😈'; // Đổi biểu tượng mắt
    } else {
        passwordField.type = 'password';
        toggleBtn.textContent = '😇'; // Đổi lại biểu tượng mắt
    }
}

function toggleRegisterPasswordVisibility() {
    const passwordField = document.getElementById('register-password');
    const toggleBtn = document.getElementById('toggle-register-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.textContent = '😈'; // Đổi biểu tượng mắt
    } else {
        passwordField.type = 'password';
        toggleBtn.textContent = '😇'; // Đổi lại biểu tượng mắt
    }
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Lấy thông tin đăng nhập từ localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('menu-container').style.display = 'flex';
        startClock(); // Bắt đầu đồng hồ
    } else {
        alert('Không có dữ liệu tải hoặc tài khoản của bạn chưa được đăng kí');
    }
}

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Lưu thông tin đăng ký vào localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Đăng Kí Thành Công!');
    showLogin();
}

function showRegister() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

function logout() {
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
}

function startClock() {
    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        clockElement.textContent = now;
    }

    updateClock();
    setInterval(updateClock, 1000);
}
