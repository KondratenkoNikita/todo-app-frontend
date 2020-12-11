
// export const deleteItem = (id) => {
//   fetch('url', {
//     method: 'delete',
//     params: id,
//   })
//   .then((response) => JSON.parse(response))
//   .then((res) => console.log(res, 'res'))
//   .catch((err) => console.log(err, 'err'))

//   console.log('function delete');

// };
export const getAll = async () => {
  const response = await fetch('http://localhost:5000/');
  const data = await response.json();
  return data;
};