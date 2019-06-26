const Commando = require("discord.js-commando");
const movieFinder = require("../../scrapers/movies/scrapeMovie");

module.exports = class FindMovieCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "movie",
      aliases: ["find_movie", "fm"],
      group: "movies",
      memberName: "movie",
      description: "Will scrape web for link to movie",
      args: [
        {
          key: "nameOfMovie",
          label: "name of movie",
          prompt: "What is the movie that you are searching for?",
          type: "string"
        }
      ]
    });
  }
  async run(msg, args) {
    msg.reply("Looking for your movie...")
    new movieFinder(args.nameOfMovie)
      .findMovie()
      .then(response => {
        msg.reply(`\`\`\`json\n${response}\`\`\``);
      })
      .catch(err => {
        msg.reply(err);
      });
  }
};
