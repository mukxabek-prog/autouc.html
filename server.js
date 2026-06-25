const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const bot = new Telegraf('BOT_TOKEN_SHU_YERGA'); // BotFather bergan token
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // HTML faylni ko'rsatish uchun

// "Ma'lumotlar bazasi" (Vaqtincha)
let usersDB = {}; 

// Bot orqali Web App ni yuborish
bot.start((ctx) => {
    const userId = ctx.from.id;
    if (!usersDB[userId]) {
        usersDB[userId] = { balance: 1000 }; // Yangi foydalanuvchiga 1000 token
    }
    
    ctx.reply('Xush kelibsiz! Tokenlar bilan oʻynash uchun pastdagi tugmani bosing:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "O'yinni boshlash", web_app: { url: 'SAYTINGIZ_URL_MANZILI' } }]
            ]
        }
    });
});

// Sayt uchun API: Balansni olish
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = usersDB[userId] || { balance: 0 };
    res.json(user);
});

// Sayt uchun API: O'yin mantiqi
app.post('/api/play', (req, res) => {
    const { userId, bet } = req.body;
    if (!usersDB[userId] || usersDB[userId].balance < bet) {
        return res.status(400).json({ error: "Mablag' yetarli emas" });
    }

    const win = Math.random() > 0.5; // 50/50 yutish ehtimoli
    if (win) {
        usersDB[userId].balance += bet;
    } else {
        usersDB[userId].balance -= bet;
    }

    res.json({ balance: usersDB[userId].balance, win });
});

bot.launch();
app.listen(3000, () => console.log('Server 3000-portda ishladi'));
