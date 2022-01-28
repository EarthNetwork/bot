import { Signale } from 'signale';
import * as Express from 'express';
const _importDynamic = new Function("modulePath", "return import(modulePath)");
import {join} from 'path';
let discordClient;


async function fetch(...args) {
    const { default: fetch } = await _importDynamic("node-fetch");
    return fetch(...args);
}

// Modules
const pool = require("./pool")
//constantes
const logger = new Signale({ scope: "Express" });
const app = new Express();

//render engine
app.engine('html', require("ejs").renderFile)
app.use("/assets", Express.static(__dirname + "/../../verifier/assets"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// GET /verify/id
app.get('/verify/:verifyId?', (req, res) => {
    if (!req.params.verifyId) return res.sendFile(join(__dirname, '../../verifier/html/invalide.html'));
    if (!pool.isValidLink(req.params.verifyId)) return res.sendFile(join(__dirname, '../../verifier/html/invalide.html'));
    res.render(join(__dirname, '../../verifier/html/verify.html'), { publicKey: process.env.PUBLIC_KEY });
});

// POST /verify/id
app.post('/verify/:verifyId?', async (req, res) => {
    if (!req.body || !req.body['h-captcha-response']) return res.sendFile(join(__dirname, '../../verifier/assets/html/invalide.html'));

    const response = await fetch(`https://hcaptcha.com/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body['h-captcha-response']}`,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    if (!response.success) return res.sendFile(join(__dirname, '../../verifier/html/captchaInvalide.html'));
    if (!pool.isValidLink(req.params.verifyId)) return res.sendFile(join(__dirname, '../../verifier/html/invalide.html'));
    addRole(pool.getDiscordId(req.params.verifyId));
    pool.removeLink(req.params.verifyId);
    res.sendFile(join(__dirname, '../../verifier/html/fini.html'));
});
app.all('*', (req, res) => res.redirect(302, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'))

async function addRole(userId) {
    console.log(userId)
    const guild = await discordClient.guilds.fetch(process.env.GUILD_ID);
    const member = await guild.members.fetch(userId);
    const role = await guild.roles.fetch(process.env.ROLE_ID);
    await member.roles.add(role);
    logger.info("Added role to " + member.user.tag);
}
function main(client) {
    discordClient = client;
    app.listen(8008, logger.info(`Écoute sur le port 8008`));
}

module.exports = {
    run: main
}
