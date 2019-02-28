const { Command, Argument } = require('discord-akairo');

module.exports = class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            args: [{
                id: 'module',
                type: Argument.union('command', 'listener', 'commandAlias'),
                prompt: {
                    start: msg => `${msg.author}, what module would you like to reload?`,
                    retry: (msg, args, data) => `${msg.author}, **${data.phrase}** is not a valid module.`
                }
            }],
            clientPermissions: ['SEND_MESSAGES'],
            description: 'Reloads modules. Searches through commands by id, listeners by id, and finally command aliases.',
            ownerOnly: true
        });
    }

    exec(msg, args) {
        let failureMsg = '';

        try {
            args.module.reload();
        } catch(e) {
            failureMsg += `${msg.author}, the ${args.module.constructor.name} module could not be reloaded. **${e}**`;
        } 

        return failureMsg === '' ? msg.channel.send(`${msg.author}, the ${args.module.constructor.name} module has been reloaded.`) 
            : msg.channel.send(failureMsg);
    }
};