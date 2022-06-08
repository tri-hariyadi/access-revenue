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
    if (!isNaN(Number(value))) {
      return Number(value.replace(/,/gi, '.'));
    }
    return 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  return 0;
}
