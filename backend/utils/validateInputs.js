const validateInputs = client => {
  const { firstName, lastName, email, address, place, postCode } = client;
  const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validAddress = /^([^\\u0000-\u007F]|\w)+,?\s\d+[A-z]?(\/\d+[A-z]?)?$/;
  const invalidSigns = /[<>%\$]/;
  const validPostCode = /[0-9]{2}-[0-9]{3}/;

  /* Form Validation */
  let isValid = true;
  if (!firstName || !lastName || !email || !address || !place || !postCode) isValid = false;
  else if (firstName.length <= 2 || lastName.length <= 2 || place.length <= 2) isValid = false;
  else if (invalidSigns.test(firstName)
     ||
     invalidSigns.test(lastName)
     ||
     invalidSigns.test(email)
     ||
     invalidSigns.test(address)
     ||
     invalidSigns.test(place)
     ||
     invalidSigns.test(postCode)
  ) isValid = false;
  else if (!validEmail.test(email)) isValid = false;
  else if (!validAddress.test(address)) isValid = false;
  else if (!validPostCode.test(postCode)) isValid = false;

  return isValid;
};
module.exports = validateInputs;
