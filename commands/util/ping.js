const { Command } = require('discord-akairo');
const { oneLine } = require('common-tags');

module.exports = class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            clientPermissions: ['SEND_MESSAGES'],
            description: oneLine`This command measures (in milliseconds) how long it takes the bot to receive your
            message and respond back to it.`
        });
    }

    async exec(msg) {
        const pingMsg = await msg.channel.send('Hello?');
    
        return pingMsg.edit(`${msg.author.tag}, your ping is ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.`);
    }
};