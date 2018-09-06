export const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

export const getUsers = (dataCode, datas) => {
  jw.getUsers({
    users: dataCode.join(','),
    type: 'num'
  }, {
      success: function (res) {
        console.log('r22', res);
        let userData = res.data;
        _.each(datas, function (item, i) {
          item.avatar = userData[i]['avatar']['avatar_s'];
        })
        console.log('ddss', datas);
        return datas;
      }
    })
}

export const changeNum = val => {
  let value = Math.round(parseFloat(val) * 100) / 100;
  let xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}


Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  let data = symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "")
  return data;
};