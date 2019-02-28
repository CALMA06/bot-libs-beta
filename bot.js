require('dotenv').config();

const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

class BotClient extends AkairoClient {
    constructor() {
        super({
            ownerID: ['273707798670344192', '102561906765619200', '273849600664797185']
        });

        this.commandHandler = new CommandHandler(this, {
            automateCategories: true,
            commandUtil: true,
            defaultPrompt: {
                retries: 5,
                cancel: msg => `${msg.author}, this command has been canceled.`,
                ended: msg => `${msg.author}, the max amount of retries has been reached.`,
                timeout: msg => `${msg.author}, time is up on this command.`
            },
            directory: './commands',
            handleEdits: true,
            prefix: 'f;'
        });

        this.listenerHandler = new ListenerHandler(this, {
            automateCategories: true,
            directory: './listeners'
        });

        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }
}

const bot = new BotClient();

bot.login(process.env.TOKEN);

process.on('unhandledRejection', console.error);