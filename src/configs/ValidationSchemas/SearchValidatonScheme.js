import * as Yup from 'yup';

export const SearchValidationSchema = () => {
  return Yup.object().shape({
    startDate: Yup.string()
      .required('Tanggal dari harus diisi!'),
    endDate: Yup.string()
      .required('Tanggal sampai harus diisi!')
      .when('startDate', (startDate, schema) => {
        return schema.test({
          test: endDate => !(new Date(endDate) < new Date(startDate)),
          message: 'Tanggal sampai tidak boleh kurang dari tanggal dari'
        })
      })
  })
}
