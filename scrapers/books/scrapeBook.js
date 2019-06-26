const libgen = require("libgen");

class BookFinder {
  constructor(bookTitle) {
    this.title = bookTitle;
    this.options = {
      mirror: "http://libgen.io",
      query: this.title,
      count: 1,
      sort_by: "year",
      reverse: true
    };
  }

  findBook() {
    const promise = new Promise((resolve, reject) => {
      libgen.search(this.options, (err, data) => {
        // if (err) return console.error(err);
        if (err) return reject("I don't think this book is on libgen.io");
        // console.log(`This is what data is ${data}`);

        if (data.length == this.options.count) {
          const selection = data[0];
          resolve({
            title: selection.title,
            author: selection.author,
            download: `http://gen.lib.rus.ec/book/index.php?md5=${selection.md5.toLowerCase()}`
          });
        } else {
          // console.log("Error")
          reject("I Dont think this book is on libgen.io");
        }
      });
    });
    return promise;
  }

  toJson(object) {
    return JSON.stringify(object, null, 4);
  }
}

// new BookFinder("Chicken nuggos")
//   .findBook()
//   .then(response => {
//     console.log(
//       `Title: ${response.author}\nTitle: ${response.title}\nDownload: ${
//         response.download
//       }`
//     );
//   })
//   .catch(errmsg => {
//     console.log(errmsg);
//   });

module.exports = BookFinder;
