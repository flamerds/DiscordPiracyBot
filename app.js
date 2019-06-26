const Commando = require('discord.js-commando')
const path = require('path')

const token = require("./token.js")
const userid = require("./userid.js")

const client = new Commando.Client({
  // replace userid with your user ID, I changed this to protect my identity
  owner: userid,
  commandPrefix:"gimme the "
})

client.on('ready', () => {
  console.log('Ready to rumble')
})

client.registry
  .registerGroups([['games', 'Find Games'],["movies","Find Movies"],['books',"Find Books"]])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'))
  // .registerCommandsIn(path.join(__dirname,))

// replace token with your actual token surrounded by quotes
client.login(token)
