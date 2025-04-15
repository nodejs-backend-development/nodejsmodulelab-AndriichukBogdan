const http = require('http');

const server = http.createServer((req, res) => {
    const cookies = req.headers.cookie || '';

    const parseCookies = cookieString => {
        return cookieString.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
        }, {});
    };

    const parsedCookies = parseCookies(cookies);
    const userInfo = parsedCookies.user_info;

    let responseData = {};

    if (userInfo === 'user1') {
        responseData = {
            id: 1,
            firstName: 'Leanne',
            lastName: 'Graham',
        };
    } else {
        responseData = {};
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));
});

server.listen(3000, () => {
    console.log('Сервер запущено на http://localhost:3000');
});
