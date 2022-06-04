import * as Yup from 'yup';

export const RegisterUserValidationScheme = () => {
  return Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Nama depan minimal 3 karakter')
      .matches(/^[a-zA-Z ]+$/, 'Nama depan hanya boleh huruf alfabet')
      .required('Nama depan harus diisi!'),
    lastName: Yup.string()
      .min(3, 'Nama belakang minimal 3 karakter')
      .matches(/^[a-zA-Z ]+$/, 'Nama belakang hanya boleh huruf alfabet')
      .required('Nama belakang harus diisi!'),
    dateBirth: Yup.string()
      .required('Tanggal harus diisi!'),
    monthBirth: Yup.string()
      .required('Bulan harus diisi!'),
    yearBirth: Yup.string()
      .required('Tahun harus diisi!'),
    email: Yup.string()
      .email('Email tidak valid')
      .required('Email harus diisi!'),
    phonenumber: Yup.string()
      .min(11, 'Nomor HP minimal 11 digits')
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Nomor HP tidak valid')
      .required('Nomor HP harus diisi!'),
    nik: Yup.string()
      .min(15, 'NIK minimal 15 digit')
      .matches(/^((\\+[1-9][ \\-]*)|(\\([0-9]\\)[ \\-]*)|([0-9])[ \\-]*)*?[0-9]?[ \\-]*[0-9]?$/, 'NIK hanya boleh angka')
      .required('NIK harus diisi!'),
    divisi: Yup.string()
      .min(3, 'Divisi minimal 3 karakter')
      .matches(/^[a-zA-Z .,]+$/, 'Divisi hanya boleh huruf alfabet dan simbol .,')
      .required('Divisi harus diisi!'),
    gender: Yup.string()
      .required('Gender harus diisi!'),
    accountNumber: Yup.string()
      .min(10, 'Nomor Rekening minimal 10 digits')
      .matches(/^((\\+[1-9][ \\-]*)|(\\([0-9]\\)[ \\-]*)|([0-9])[ \\-]*)*?[0-9]?[ \\-]*[0-9]?$/, 'Nomor Rekening hanya boleh angka')
      .required('Nomor Rekening harus diisi'),
    accountName: Yup.string()
      .min(3, 'Rekening minimal 3 karakter')
      .matches(/^[a-zA-Z ]+$/, 'Rekening hanya boleh huruf alfabet')
      .required('Rekening harus diisi!'),
    birthPlace: Yup.string()
      .min(3, 'Tempat Lahir minimal 3 karakter')
      .matches(/^[a-zA-Z .,]+$/, 'Tempat Lahir hanya boleh huruf alfabet dan simbol .,')
      .required('Tempat Lahir harus diisi!'),
    organisation: Yup.string()
      .min(3, 'Organisasi minimal 3 karakter')
      .matches(/^[a-zA-Z ]+$/, 'Organisasi hanya boleh huruf alfabet')
      .required('Organisasi harus diisi!'),
    address: Yup.string()
      .min(6, 'Alamat minimal 6 karakter')
      .matches(/^[a-zA-Z0-9 .,]+$/, 'Alamat hanya boleh huruf alfabet dan simbol .,')
      .required('Alamat harus diisi!')
  })
}
