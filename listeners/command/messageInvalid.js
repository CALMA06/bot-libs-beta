const { Listener } = require('discord-akairo');

module.exports = class MessageInvalidListener extends Listener {
    constructor() {
        super('messageinvalid', {
            emitter: 'commandHandler',
            event: 'messageInvalid'
        });
    }

    exec(msg) {
        if (msg.content.startsWith(this.client.commandHandler.prefix)) return msg.react('❓');

        return;
    }
};