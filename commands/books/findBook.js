const Commando = require("discord.js-commando");
const BookFinder = require("../../scrapers/books/scrapeBook");

module.exports = class FindBookCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "book",
      aliases: ["find_book", "fb"],
      group: "books",
      memberName: "book",
      description: "Uses libgen to search books",
      args: [
        {
          key: "titleOfBook",
          label: "title of book",
          prompt: "What is the title of the book you are searching for?",
          type: "string"
        }
      ]
    });
  }

  async run(msg, args) {
    //   msg.reply("hello");
    const bookFinder = new BookFinder(args.titleOfBook);
    bookFinder
      .findBook()
      .then(response => {
        msg.reply(
          `\`\`\`json\n${bookFinder.toJson(
            response
          )}\n\nClick the button that says "gen.lib.rus.ec" and then click the get button at the top and it should start downloading
          \n\nIn addition if this is not what you wanted, use either libgen.io or gen.lib.rus.ec and search with the isbn of your desired book\`\`\``
        );
      })
      .catch(errmsg => {
        msg.reply(errmsg);
      });
    // msg.reply(message);
  }
};
