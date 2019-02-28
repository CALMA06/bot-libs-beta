const { Command } = require('discord-akairo');
const escapeRegex = require('escape-string-regexp');

module.exports = class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            args: [{
                id: 'code',
                prompt: {
                    start: msg => `${msg.author}, what code would you like to evaluate?`
                }
            }],
            clientPermissions: ['SEND_MESSAGES'],
            description: 'Evaluate JavaScript code.',
            ownerOnly: true,
            split: 'none'
        });
    }

    exec(msg, args) {

        /*eslint-disable no-unused-vars*/
        const bot = this.client;
        const guild = msg.guild;
        /*eslint-enable no-unused-vars*/

        try {

            let evaledCode = eval(args.code);

            evaledCode = require('util').inspect(evaledCode, {depth: 0})
                .replace(this.tokenPattern, 'token replacement message');

            return msg.channel.send(evaledCode, {code: 'js'});

        } catch (err) {

            return msg.channel.send(err, {code: 'js'});

        }

    }

    get tokenPattern() {

        if (!this._tokenPattern) {
            let pattern = '';

            if (this.client.token) pattern += escapeRegex(this.client.token);

            Object.defineProperty(this, '_tokenPattern', {value: new RegExp(pattern, 'gi')});
            
        }

        return this._tokenPattern;

    }
};