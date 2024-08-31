document.addEventListener("DOMContentLoaded", function() {
    // Hiển thị hoặc ẩn phần đăng nhập và menu
    const loginContainer = document.getElementById('login-container');
    const menuContainer = document.getElementById('menu-container');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const backToLoginBtn = document.getElementById('back-to-login');
    const submitRegisterBtn = document.getElementById('submit-register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const uploadMusicInput = document.getElementById('upload-music');
    const uploadBtn = document.getElementById('upload-btn');
    const musicList = document.getElementById('music-list');
    const audioPlayer = document.getElementById('audio-player');
    const weatherElement = document.getElementById('weather');

    const DROPBOX_ACCESS_TOKEN = 'YOUR_DROPBOX_ACCESS_TOKEN'; // Thay thế bằng token Dropbox của bạn

    // Hiển thị menu sau khi đăng nhập
    loginBtn.addEventListener('click', function() {
        // Thay thế bằng logic kiểm tra đăng nhập thực tế
        loginContainer.style.display = 'none';
        menuContainer.style.display = 'flex';
    });

    // Chuyển đến phần đăng ký
    registerBtn.addEventListener('click', function() {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('register-section').style.display = 'block';
    });

    // Quay lại phần đăng nhập
    backToLoginBtn.addEventListener('click', function() {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    });

    // Xử lý đăng ký
    submitRegisterBtn.addEventListener('click', function() {
        // Thay thế bằng logic đăng ký thực tế
        loginContainer.style.display = 'none';
        menuContainer.style.display = 'flex';
    });

    // Cập nhật thời gian hiện tại và nhiệt độ
    function updateDateTime() {
        const now = new Date();
        const clock = document.getElementById('clock');
        const date = document.getElementById('date');
        
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        
        date.textContent = now.toLocaleDateString('vi-VN', optionsDate);
        clock.textContent = now.toLocaleTimeString('vi-VN', optionsTime);
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();  // Cập nhật ngay lập tức khi trang được tải

    // Cập nhật thời tiết
    async function updateWeather() {
        const apiKey = 'YOUR_WEATHER_API_KEY'; // Thay thế bằng API key của bạn
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=${apiKey}&units=metric&lang=vi`);
        const data = await response.json();
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        
        weatherElement.textContent = `Nhiệt độ: ${temperature}°C, Thời tiết: ${weatherDescription}`;
    }

    updateWeather();

    // Xử lý tải nhạc lên Dropbox
    uploadBtn.addEventListener('click', async function() {
        const files = uploadMusicInput.files;
        if (files.length === 0) {
            alert('Vui lòng chọn file để tải lên.');
            return;
        }

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': JSON.stringify({
                        path: `/Music/${file.name}`,
                        mode: 'add',
                        autorename: true,
                        mute: false
                    })
                },
                body: file
            });

            if (response.ok) {
                const result = await response.json();
                const link = result.path_display;
                addMusicToList(link, file.name);
            } else {
                alert('Tải nhạc lên thất bại.');
            }
        }
    });

    // Thêm nhạc vào danh sách và tạo liên kết phát
    function addMusicToList(link, name) {
        const listItem = document.createElement('li');
        const playBtn = document.createElement('button');
        playBtn.textContent = `Phát ${name}`;
        playBtn.addEventListener('click', async function() {
            const tempLink = await getTemporaryLink(link);
            audioPlayer.src = tempLink;
            audioPlayer.play();
        });

        listItem.appendChild(playBtn);
        musicList.appendChild(listItem);
    }

    // Lấy liên kết tạm thời từ Dropbox
    async function getTemporaryLink(path) {
        const response = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: path
            })
        });

        const data = await response.json();
        return data.link;
    }

    // Đăng xuất
    logoutBtn.addEventListener('click', function() {
        // Thay thế bằng logic đăng xuất thực tế
        loginContainer.style.display = 'flex';
        menuContainer.style.display = 'none';
    });
});
