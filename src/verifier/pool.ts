import {Signale} from "signale";
import * as crypto from "crypto";

const logger = new Signale({ scope: 'Pool' });
let linkPool = [] as Array<any>;

function createLink(discordId) {
    const linkId = crypto.randomBytes(4).toString('hex');
    linkPool.push({
        discordId: discordId,
        linkId: linkId
    });
    setTimeout(function() {
        if (isValidLink(linkId)) removeLink(linkId);
    }, 900000);
    logger.info('Created new link ID:', linkId);
    return linkId;
}

function isValidLink(linkId) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].linkId == linkId) return true;
    return false;
}

function removeLink(linkId) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].linkId == linkId) delete linkPool[i];
    linkPool = linkPool.filter(n => n);
}

function getDiscordId(linkId) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].linkId == linkId) return linkPool[i].discordId;
    return false;
}

module.exports = {
    isValidLink,
    removeLink,
    createLink,
    getDiscordId
};