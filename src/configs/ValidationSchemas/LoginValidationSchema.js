import * as Yup from 'yup';

export const LoginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Email tidak valid')
      .required('Email harus diisi!'),
    password: Yup.string()
      .min(6, `Password minimal terdiri dari ${6} karakter!`)
      .required('Password harus diisi!')
  })
}
