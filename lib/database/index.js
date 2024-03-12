const {personalDB} = require('./personal');
const {groupDB} = require('./group');
const {setTrueCallerkey, getTrueCallertoken, TrueLogout} = require('./truecaller');

module.exports = {personalDB,groupDB,setTrueCallerkey, getTrueCallertoken, TrueLogout};
