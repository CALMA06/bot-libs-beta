const { Listener } = require('discord-akairo');

module.exports = class CommandBlockedListener extends Listener {
    constructor() {
        super('commandblocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    exec(msg, cmd, reason) {
        switch(reason) {
        case 'owner':
            reason = 'you are not an owner of this bot';
            break;
        case 'guild':
            reason = 'it can only be used in a server';
            break;
        case 'dm':
            reason = 'it can only be used in a DM';
            break;
        }

        return msg.channel.send(`Cannot run the ${cmd.id} command because ${reason}.`);
    }
};