document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://your-backend-url/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = 'index.html'; // เปลี่ยนเส้นทางไปยังหน้าเว็บหลังเข้าสู่ระบบสำเร็จ
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error(error);
        alert('Login failed. Please try again.');
    }
});

