const referenceGenerator = (len: number) => {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let ref = [];

  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * 37);
    ref.push(chars[index]);
  }

  return ref.join('');
};

export default referenceGenerator;

