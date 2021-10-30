const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function asyncValidate(values /*, dispatch */) {
  await sleep(1000); // simulate server latency
  if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
    throw { email: 'Email already Exists' };
  }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
});


export default function(values) {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
}
