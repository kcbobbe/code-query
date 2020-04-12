const moment = require("moment");

function formatMessage(postTag, text) {
  return {
    postTag,
    text,
    time: moment().format("h:mm a")
  };
}

module.exports = formatMessage;
