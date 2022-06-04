import * as Yup from 'yup';

export const SendAnouncementValidationScheme = () => {
  return Yup.object().shape({
    title: Yup.string()
      .required('Title harus diisi!'),
    subject: Yup.string()
      .required('Subject harus diisi!'),
    icon: Yup.string()
      .required('Icon harus diisi!'),
    content: Yup.string()
      .required('Content harus diisi!')
      .test('isNotValidContent', 'Content harus diisi!', (value) => (value !== "<p></p>\n"))
  });
}
