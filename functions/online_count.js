const firebase = require('firebase-admin');
const Discord = require('discord.js');
var database = firebase.database();

function updateMembers(oldMember, newMember) {
      var guild = newMember.guild;
      var onlineCount = guild.members.filter(x => x.presence.status === 'online').size;
      database.ref('servers/' + guild.id + '/online/states/' + Date.now()).set(onlineCount);
      database.ref('servers/' + guild.id + '/online/record').once('value').then((record) => {
            if (!record.val() || onlineCount > record.val()) {
                  database.ref('servers/' + guild.id + '/online/record').set(onlineCount);
            }
      });
}