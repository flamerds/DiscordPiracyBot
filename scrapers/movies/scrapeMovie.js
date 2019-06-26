const axios = require("axios");
const cheerio = require("cheerio");
const rarbg = require("rarbg-api");

class MovieFinder {
  constructor(movieName) {
    this.movieName = movieName;
  }
  findMovie() {
    const promise = new Promise((resolve, reject) => {
      rarbg
        .search(this.movieName, { sort: "seeders" })
        .then(elements => {
          const firstElement = elements[0];
          this.selection = new Selection(
            firstElement.title,
            firstElement.seeders,
            firstElement.download
          );
          console.log(
            `You searched ${this.movieName} and I Found ${
              this.selection.name
            }, with ${this.selection.seeders} seeders`
          );
          console.log(`Here is the magnet link: ${this.selection.download}`);

          if (this.selection) {
            resolve(this.selection.toJson());
          } else {
            reject("Not able to find movie");
          }
        })
        .catch(err => {
          reject(`There was an error finding the movie ${this.movieName}`);
        });
    });
    return promise;
  }
}

class Selection {
  constructor(name, seeders, magnetLink) {
    this.name = name;
    this.seeders = seeders;
    this.download = magnetLink;
  }
  string() {
    return `Title: ${this.name}\nSeeders: ${this.seeders}\nMagnet Link: ${
      this.download
    }`;
  }
  toJson() {
    const info = {
      name: this.name,
      seeders: this.seeders,
      link: this.download
    };
    return JSON.stringify(info, null, 4);
  }
}

module.exports = MovieFinder;
