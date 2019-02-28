const { Command, Argument } = require('discord-akairo');

module.exports = class UnloadCommand extends Command {
    constructor() {
        super('unload', {
            aliases: ['unload', 'remove'],
            args: [{
                id: 'module',
                type: Argument.union('command', 'listener', 'commandAlias'),
                prompt: {
                    start: msg => `${msg.author}, what module would you like to unload?`,
                    retry: (msg, args, data) => `${msg.author}, **${data.phrase}** is not a valid module.`
                }
            }],
            clientPermissions: ['SEND_MESSAGES'],
            description: 'Unloads modules. Searches through commands by id, listeners by id, and finally command aliases.',
            ownerOnly: true
        });
    }

    exec(msg, args) {
        let failureMsg = '';

        try {
            args.module.remove();
        } catch(e) {
            failureMsg += `${msg.author}, the ${args.module.constructor.name} module could not be unloaded. **${e}**`;
        } 

        return failureMsg === '' ? msg.channel.send(`${msg.author}, the ${args.module.constructor.name} module has been unloaded.`) 
            : msg.channel.send(failureMsg);
    }
};