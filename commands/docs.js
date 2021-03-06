const Discord = require('discord.js');
const docs = require('../docs.json')

function findDoc(name){
      var ref = false;
      docs.headings.forEach((x) => {
            x.subheadings.forEach((y) => {
                  y.symbols.forEach((z) => {
                        if (z.symbolName == name) {
                              ref = z;
                        }
                  });
            });
      });
      return ref;
}

module.exports.run = async (bot, message, args) => {
      const doc = findDoc(args[0]);
      if (doc) {
            const fields = [];
            doc.parameters.forEach((param) => {
                  fields.push({
                        name: param.name,
                        value: param.documentation + "\nType: " + param.type + "\nOptional: " + param.optional
                  });
            });
            fields.push({
                  name: "Source",
                  value: doc.githubUrl
            });
            message.channel.send({embed: {
                  color: 3447003,
                  author: {
                        name: "TensorFlow Documentation"
                  },
                  title: doc.symbolName,
                  url: "https://js.tensorflow.org/api/latest/index.html#" + doc.urlHash,
                  description: doc.documentation,
                  fields: fields,
                  timestamp: new Date(),
                  footer: {
                        icon_url: bot.user.avatarURL,
                        text: "TensorBot"
                  }
            }});
      } else {
            message.channel.send('Could not find any documentation for `' + args[0] + '` in TensorFlow.js. Full API documentation is available here: https://js.tensorflow.org/api/latest/index.html');
      }
};

module.exports.help = {
  name: "docs"
}
