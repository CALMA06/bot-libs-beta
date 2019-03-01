const { Command } = require('discord-akairo');
const splitMessage = require('discord.js').Util.splitMessage;
const { oneLine } = require('common-tags');

module.exports = class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: oneLine`Provides info about the bot\'s commands. Optionally, you can specify a command to get information about;
            otherwise a list of all commands that you have access to will be DM\'d to you.`,
            channel: 'guild',
            args: [{
                id: 'command',
                type: str => {

                    return this.handler.modules.has(str) ? str 
                        : str === '' ? str : null;

                },
                default: ''
            }]
        });
    }

    async exec(msg, args) {
        const cmdFilter = cmd => {

            return (cmd.ownerOnly && !this.client.isOwner(msg.author)) ? false
                : typeof cmd.userPermissions === 'undefined' ? true 
                    : msg.member.permissions.toArray().includes(cmd.userPermissions[0]) ? true : false;

        };

        const commands = args.command === '' ? this.handler.modules.filter(cmdFilter) 
            : this.handler.modules.filter(c => c.id === args.command);
    
        let helpMsg = '';

        for (let [id, cmd] of commands) { //eslint-disable-line no-unused-vars
      
            helpMsg += `__**${cmd.aliases[0][0].toUpperCase()}${cmd.aliases[0].slice(1)}**__\n`;

            helpMsg += `Aliases: ${cmd.aliases.join(', ')}\nCategory: ${cmd.category}\nDescription: ${cmd.description}\n`;

            let format = '';

            if (cmd.args.length >= 1) {
                cmd.args.forEach(arg => {

                    format += `<${arg.id}> `;

                });
            }

            helpMsg += `Format: \`${this.handler.prefix}${cmd.aliases[0]} ${format}\`\n\n`;

        }

        helpMsg += 'Note: Do not use angle brackets (`<>`) when sending a command.';

        helpMsg = splitMessage(helpMsg);

        let confirmMsg = `${msg.author}, sent you a DM.\n`;

        if (typeof helpMsg === 'string') {

            await msg.author.send(helpMsg).catch(err => {

                confirmMsg = `${msg.author}, I couldn't send you a DM: ***${err}***\n`;

            });

        } else {

            helpMsg.forEach(m => {

                msg.author.send(m).catch(err => {

                    confirmMsg = `${msg.author}, I couldn't send you a DM: ***${err}***\n`;

                });

            });

        }

        return msg.channel.send(confirmMsg.split('\n')[0]); //prevent repeating error message from being sent
        
    }
};