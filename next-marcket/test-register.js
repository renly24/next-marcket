const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

(async () => {
    const res = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'テストユーザー',
            email: 'testuser@gmail.com',
            password: 'testpass123'
        })
    });
    const data = await res.json();
    console.log(data);
})(); 