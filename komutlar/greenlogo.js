const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {

 let KayıtSorumlusu = '878278420407132223'//YETKİLİ İD                 // GAMERWOLF
let ÜyeRol = '924362611317932062' //VERİLİCEK ROL İD
let KayıtsızRol = '922527076198805605' //ALINICAK ROL İD
let Tag = '● ' // TAG

  if(!message.member.roles.cache.has(KayıtSorumlusu))  // GAMERWOLF
  return message.channel.send(`**Üzgünüm Bu Komudu Sadece Ayarlanmış Yetkililer Kullanabilir!**`);
  let member = message.mentions.members.first()
  let İsmi = args[1]
  let Kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)        // GAMERWOLF
  let toplamaisim = `${Tag} ${İsmi}` // GAMERWOLF
  if (!member) return message.channel.send('** Lütfen Bir Üye Etiketleyiniz!**')
  if (!İsmi) return message.channel.send('** Lütfen Bir İsim Yazınız!**')
  
      setTimeout(function(){  
  member.roles.add(ÜyeRol)
  },800)
  setTimeout(function(){
  member.setNickname(`${Tag} ${İsmi}`)
  },1000)
  setTimeout(function(){
  member.roles.remove(KayıtsızRol)
  },2000)

let KayıtToplam = await db.fetch(`kayıttoplam_${message.author.id}`) + 1 || '0'

  if(Kayıtlımı !== 'evet') {             // GAMERWOLF
  db.add(`kayıte_${message.author.id}`, 1)
  db.add(`kayıttoplam_${message.author.id}` , 1) 
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)                     
  db.add(`toplamik_${member.id}`, 1)  
  let HyperWolf = new Discord.MessageEmbed()
  .setTitle('Bu İşlem Başarılı')
  .setDescription(`
  **Kayıt Edilen Kullanıcı ・ ${member}** 
 **Verilen Rol ・ **<@&${ÜyeRol}>  \n
   **Kayıt Eden Yetkili ・** <@!${message.author.id}>
 **Bu Yetkili Toplamda ・ ${KayıtToplam} Kişi Kayıt Etmiş**
`)
.setColor('#313131')
message.channel.send(HyperWolf)

  }  
  
  if(Kayıtlımı === 'evet'){
  db.set(`kayıtlıisim_${member}`, toplamaisim)      
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)         
    let HyperWolf = new Discord.MessageEmbed()
    .setAuthor('Uyarı')
  .setDescription(` **Bu Kişi Daha Öncedende Kayıt Edilmiş?**                 
                
**Eski Adı ・ ** \`${eskiismi}\``)
.setColor('#313131')
message.channel.send(HyperWolf)
  }
};  

exports.conf = {              
    aliases: ['Kayıt']
}
exports.help = {
  name: 'kayıt',
  usage: 'HyperWolf Kayıt Komudu'
}