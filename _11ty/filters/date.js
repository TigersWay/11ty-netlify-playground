const moment = require('moment');

module.exports = {

  dateFormat: (date, locale, format = 'LLL') =>  {
    moment.locale(locale);
    return moment(date).format(format);
  },

  dateISO: (date) => {
    return moment(date).utc().format();
  }

};
