import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test("First snapshot test", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

const city = 'London';
const country = 'UK';
const API_KEY = '9dc25603f879c3b7eaf448686b1c73a5';

test('the data is Response', () => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`).then(res => {
    expect(res.status).toBe(200);
  });
});

