export const DateHelper = (date) => {
  let identifier = "";
  let result = 0;
  const now = new Date();
  const oldDate = new Date(date);
  oldDate.setHours(oldDate.getHours() - 3);
  var seconds = (now.getTime() - oldDate.getTime()) / 1000;
  result = seconds;
  identifier = "az önce";
  if (result >= 60) {
    result /= 60;
    identifier = "d";
    if (result >= 60) {
      result /= 60;
      identifier = "s";
      if (result >= 24) {
        result /= 24;
        identifier = "g";
        if (result >= 30) {
          result /= 24;
          identifier = "a";
          if (result >= 12) {
            result /= 12;
            identifier = "y";
          }
        }
      }
    }
  } else {
    return identifier;
  }
  result = parseInt(result);
  return `${result}${identifier}`;
};
