const { Command, Argument } = require('discord-akairo');
const fs = require('fs');
const path = require('path');

module.exports = class LoadCommand extends Command {
    constructor() {
        super('load', {
            aliases: ['load'],
            args: [{
                id: 'filepath',
                type: Argument.validate('string', str => fs.existsSync(path.join(__dirname, '../..', `${str}.js`))),
                prompt: {
                    start: msg => `${msg.author}, what is the filepath of the module you want to load?`,
                    retry: (msg, args, data) => `${msg.author}, **${data.phrase}** is not a valid filepath. Try again.`
                }
            }],
            clientPermissions: ['SEND_MESSAGES'],
            description: 'Loads modules into their proper handler.',
            ownerOnly: true
        });
    }

    exec(msg, args) {
        const filepathSplit = args.filepath.split('/');

        const handler = filepathSplit[0] === 'commands' ? this.handler : this.client.listenerHandler;

        let failureMsg = '';

        try {
            handler.load(path.join(__dirname, '../..', `${args.filepath}.js`));
        } catch(e) {
            failureMsg += `${msg.author}, the module at filepath **${args.filepath}.js** could not be loaded. **${e}**`;
        }

        return failureMsg === '' 
            ? msg.channel.send(`${msg.author}, the ${handler.modules.get(filepathSplit[2]).constructor.name} module has been loaded.`) 
            : msg.channel.send(failureMsg);
    }
};