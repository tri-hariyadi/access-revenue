export const compare = (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps);
export const monts = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
export const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const formatDate = date => {
  let month = date.getMonth(),
    DD = date.getDate(),
    year = date.getFullYear();
  return [`${days[date.getDay()]},`, DD, monts[month], year].join(' ');
}

export const formatTime = date => {
  const time = new Date(date);
  const hour = time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
  const min = time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes();
  return `${hour} : ${min}`;
}

export const errHandle = err => err.response ? err.response.data.message : err.message;

export const currencyFormat = value => {
  let num = value ? parseFloat(value.toString().replace(/,/g, '.')) : 0;
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2
  });
  return formatter.format(num);
}

export const inputCurrencyFormat = value => {
  let num = value ? Number(value.toString().replace(/[^\d]/g, '')) : 0;
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  return formatter.format(num);
}

export const formatNumber = (value) => {
  if (typeof value === 'string') {
    if (!isNaN(parseFloat(value))) {
      return parseFloat(parseFloat(value.replace(/,/gi, '.')).toFixed(2));
    }
    return 0;
  }
  if (typeof value === 'number') {
    return parseFloat(parseFloat(value.toString().replace(/,/gi, '.')).toFixed(2));
  }
  return 0;
}

export const percentageFormat = (value) => {
  if (typeof value === 'undefined') {
    return "0.00 %";
  }
  if (!isNaN(parseFloat(value))) {
    return `${parseFloat(value).toFixed(2)}%`;
  }
  return "0.00 %";
}
