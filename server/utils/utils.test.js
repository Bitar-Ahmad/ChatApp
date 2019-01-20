const expect = require('expect');
const mocha = require('mocha');
const {generateMessage} = require('./utils');


describe('generateMessage', () => {
  it('Should generate the correct Obj', () => {
    const from = "Abo hmeed";
    const text = "kifoo";
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');  
  });
});
