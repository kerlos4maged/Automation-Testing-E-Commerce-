require('dotenv').config()

function generateUser() {
  const id = Date.now();
  return {
    name: 'Test',
    email: `Test_${id}@example.com`, 
    password: process.env.PASSWORD,    
  };
}

const accountInfo = {
  title: 'Mr',
  day: '10',
  month: 'May',
  year: '2000',
};

const addressInfo = {
  firstName: 'Test',
  lastName: 'TestFather',
  company: 'Test Company',
  address: '123 Test Street',
  address2: 'Apt 4',
  country: 'Canada',
  state: 'Ontario',
  city: 'Toronto',
  zipcode: '12345',
  mobile: '01000000000',
};

module.exports = { generateUser, accountInfo, addressInfo };