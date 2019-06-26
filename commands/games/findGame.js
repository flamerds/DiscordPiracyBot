const Commando = require("discord.js-commando");
const GameFinder = require("../../scrapers/games/scrapeGame");

module.exports = class FindGameCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "game",
      aliases: ["find_game", "fg"],
      group: "games",
      memberName: "game",
      description: "Will scrape web for link to game",
      args: [
        {
          key: "nameOfGame",
          label: "name of game",
          prompt: "What is the game that you are searching for?",
          type: "string"
        }
      ]
    });
  }
  async run(msg, args) {
    
    const gameFinder = new GameFinder(args.nameOfGame);
    gameFinder
      .findGame()
      .then(response => {
        msg.reply(`\`\`\`json\n${gameFinder.toJson()}\`\`\``);
        
      })
      .catch(err => {
        msg.reply(err);
      });
  }
};
