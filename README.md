# DiscordPiracyBot

Discord bot made for providing links for games, books and movies. Made in NodeJs

## Personal usage
Run the command ```node app``` to start the bot locally

### For Movies
Exclude using square breackets in the actual name. They are there just so you know where to put your query

```gimme the movie [movie name]```
### For Games
```gimme the game [game name]```
### For Books
```gimme the book [book title]```

## Development

Folders

- tests
  - holds files I used for testing out the libgen and rarbg apis
- commands
  - holds 3 folders that each have 1 file for the actual command
  - most of the work is done in the files inside the `scrapers` folder
  
- scrapers
  - books
    - scrapeBook.js
      - uses libgen api to search for books
  - games
    - scrapeGame.js
      - scrapes fitgirl site for game to find the magnet and torrent links
  - movies
    - scrapeMovies.js
      - uses rarbg api to search for movies and returns the title, # seeders, and magnet link