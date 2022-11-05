
/**
 * @description 时间格式化
 * @param {Date} date
 * @param {string} fmt
 */
export function formatTime(date = new Date(), fmt = 'YYYY-MM-DD HH:mm:ss') {
  date = typeof date === 'string' ? new Date(date) : date;
  date = typeof date === 'number' ? new Date(date) : date;
  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  const week = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d'
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (`${date.getFullYear()}`).substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468'
        : '') + week[`${date.getDay()}`]
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : (`00${o[k]}`).substr((`${o[k]}`).length)
      );
    }
  }
  return fmt;
}

export function copy(url) {
  const input = document.createElement('input');
  input.setAttribute('value', url);
  input.setAttribute('readonly', 'readonly');
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 99999999999);
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    console.log('复制成功', url);
  }
  document.body.removeChild(input);
}


export function seconds2str(time) {
  if (time < 0) {
    return  "";
  }
  let str = "";
  const steps = {
    秒: 60,
    分: 60,
    小时: 24
  };
  Object.entries(steps).reduce((p, [key, value])=>{
    if (p > 0) {
      str = `${(p % value)}${key} ${str}`;
      return Math.floor(p / value);
    }
  }, time);
  return str;
}
