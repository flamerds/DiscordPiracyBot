const axios = require("axios");
const cheerio = require("cheerio");

const url = "http://fitgirl-repacks.site/call-of-duty-modern-warfare-3";

class GameSelection {
  constructor(title, torrent, magnet) {
    this.title = title;
    this.torrent = torrent;
    this.magnet = magnet;
  }
  toString() {
    return `Title: ${title}\nTorrent: ${torrent}\nMagnet: ${magnet}`;
  }

  toJson() {
    const info = {
      title: this.title,
      torrent: this.torrent,
      magnet: this.magnet
    };

    return JSON.stringify(info, null, 4);
  }
}

class GameFinder {
  constructor(gameTitle) {
    this.title = gameTitle;
    this.siteLink = "http://fitgirl-repacks.site/?s=";
  }

  getQueryFromTitle() {
    // replace all spaces with - because it yields better results
    this.cleanQuery = this.title.replace(/ /g, "-");
    return this.siteLink + this.cleanQuery;
  }

  toJson() {
    // console.log(
    //   `Torrent Link ${this.torrentLink}\n Magnet Link ${this.magnetLink}`
    // );
    const info = {
      title: this.title,
      torrent: this.torrentLink,
      magnet: this.magnetLink,
      site: this.selection
    };

    return JSON.stringify(info, null, 4);
  }

  extractLinks() {
    return new Promise((resolve, reject) => {
      axios.get(this.selection).then(response => {
        const $ = cheerio.load(response.data);

        const magnet = $("a:contains(magnet)");
        const torrent = $("a:contains(.torrent file only)");
        // console.log(magnet);

        if (magnet && torrent) {
          resolve({
            magnet: magnet[0]["attribs"]["href"],
            torrent: torrent[0]["attribs"]["href"]
          });
        } else {
          reject("It not work");
        }
      });
    });
  }

  findGame() {
    const promise = new Promise((resolve, reject) => {
      axios
        .get(this.getQueryFromTitle())
        .then(response => {
          const $ = cheerio.load(response.data);

          const bookmarks = $("a[rel='bookmark']");
          // console.log(bookmarks);

          this.selection = bookmarks[0]["attribs"]["href"];

          this.extractLinks()
            .then(links => {
              this.magnetLink = links["magnet"];
              this.torrentLink = links["torrent"];
              if (this.magnetLink) {
                resolve({
                  selection: this.selection,
                  magnet: this.magnetLink,
                  torrent: this.torrentLink
                });
              } else {
                // console.log(this.selection);
                reject("Unable to find game");
              }
            })
            .catch(errmsg => {
              console.log(errmsg);
              reject("Error Extracting Links");
            });
        })
        .catch(err => {
          console.log(err);
          reject("Bro I don't think this site has this game ngl ://");
        });
    });

    return promise;
  }
}

module.exports = GameFinder;
