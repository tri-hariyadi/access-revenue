import * as Yup from 'yup';

export const MothlyValidation = Yup.object().shape({
    dateWeek1: Yup.object().shape({
      startDate: Yup.string().required('Range date week I harus diisi'),
      endDate: Yup.string().required('Range date week I harus diisi')
    }),
    dateWeek2:  Yup.object().shape({
      startDate: Yup.string().required('Range date week II harus diisi'),
      endDate: Yup.string().required('Range date week II harus diisi')
    }),
    dateWeek3:  Yup.object().shape({
      startDate: Yup.string().required('Range date week III harus diisi'),
      endDate: Yup.string().required('Range date week III harus diisi')
    }),
    dateWeek4:  Yup.object().shape({
      startDate: Yup.string().required('Range date week IV harus diisi'),
      endDate: Yup.string().required('Range date week IV harus diisi')
    }),
    targetWeek0: Yup.string()
      .required('Target week I harus diisi'),
    targetWeek1: Yup.string()
      .required('Target week II harus diisi'),
    targetWeek2: Yup.string()
      .required('Target week III harus diisi'),
    targetWeek3: Yup.string()
      .required('Target week IV harus diisi'),
    marketing: Yup.string()
      .required('Marketing harus diisi'),
  });
