import * as Yup from 'yup';

export const PayReimbursementValidationScheme = () => {
  const current = new Date();
  return Yup.object().shape({
    TransactionDate: Yup.date()
      .max(new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())).toJSON().slice(0, 10), 'Tanggal Transaksi tidak boleh lebih dari hari ini')
      .min(new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())).toJSON().slice(0, 10), 'Tanggal Transaksi tidak boleh kurang dari hari ini')
      .required('Tanggal Transaksi harus diisi!'),
    Amount: Yup.string()
      .required('Amount harus diisi!'),
    Remark1: Yup.string()
      .matches(/^[a-zA-Z 0-9.,]+$/, 'Catatan 1 tidak boleh menggunakan karakter khusus')
      .required('Catatan 1 harus diisi'),
    Remark2: Yup.string()
      .matches(/^[a-zA-Z 0-9.,]+$/, 'Catatan 2 tidak boleh menggunakan karakter khusus')
  })
}