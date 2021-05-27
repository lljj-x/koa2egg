/**
 * Created by Liu.Jun on 2021/5/27 15:54.
 */

// app/extend/helper.js
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
