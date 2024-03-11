let commands = [];
function inrl(info, func) {
  commands.push(info);
  return info;
}
module.exports = { inrl, commands };
