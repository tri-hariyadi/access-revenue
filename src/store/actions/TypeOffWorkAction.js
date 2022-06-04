import { instance } from '../../configs';

export const insertTypeOffWork = async payload => {
  let result;
  await instance.post('typeoffwork/add', payload)
    .then(({ data }) => {
      if (data.result && data.status === 200) result = data.message;
    }).catch(() => { });
  return result;
}

export const getAllTypeOffWork = async () => {
  let result;
  await instance.get('typeoffwork/getall')
    .then(({ data }) => {
      if (data.result && data.status === 200) result = data.result;
    }).catch(() => { });
  return result;
}

export const deleteTypeOffWork = async payload => {
  let result;
  await instance.post('typeoffwork/delete', payload)
    .then(({ data }) => {
      if (data.result && data.status === 200) result = data.message;
    }).catch(() => { });
  return result;
}
