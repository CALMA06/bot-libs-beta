const { Listener } = require('discord-akairo');

module.exports = class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingpermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    exec(msg, cmd, type, missing) {
        return msg.channel.send(`Cannot run the ${cmd.id} command; the ${type} is missing the following permissions: ${missing.join(', ')}.`);
    }
};