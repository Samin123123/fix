let commands = [];
function inrl(info, func) {
  commands.push({...info, function: func});
  return info;
}
module.exports = { inrl, commands };
