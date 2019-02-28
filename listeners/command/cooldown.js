const { Listener } = require('discord-akairo');

module.exports = class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(msg, cmd, time) {
        time = time / 1000;
        return msg.channel.send(`The ${cmd.id} command is on cooldown for ${time.toFixed(1)} more seconds.`);
    }
};