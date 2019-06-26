const libgen = require("libgen");

const options = {
    mirror: 'http://libgen.io',
    query: 'learn python the hard way',
    count: 5,
    sort_by: 'year',
    reverse: true
  };


  libgen.search(options, (err, data) => {
    if (err)
      return console.error(err);
    let n = data.length;
    console.log(n + ' most recently published "' +
               options.query + '" books');
    while (n--){
      console.log('***********');
      console.log('Title: ' + data[n].title);
      console.log('Author: ' + data[n].author);
      console.log('Download: ' +
                  'http://gen.lib.rus.ec/book/index.php?md5=' +
                  data[n].md5.toLowerCase());
    }
  });
