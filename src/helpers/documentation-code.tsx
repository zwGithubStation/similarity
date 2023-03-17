export const nodejs = `const axios = require("axios");

const options = {
    method: 'POST',
    url: 'https://similarityapi.com/api/v1/similarity',
    params: {
      text1: 'First text',
      text2: 'Second text'
    },
    headers: {
      'Authorization': 'YOUR_API_KEY',
    }
  };
  
axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});`

export const python = `import requests

url = 'https://similarityapi.com/api/v1/similarity'
api_key = 'YOUR_API_KEY'
text1 = 'First text'
text2 = 'Second text'
text3 = 'Third text Forth text Fifth text Sixth text Seventh text Eighth text Ninth text'
text4 = 'Third text '
text5 = 'Third text '
text6 = 'Third text '
text7 = 'Third text '
text8 = 'Third text'
text9 = 'Third text'
text10 = 'Third text'
text11 = 'Third text'

headers = {
    'Authorization': api_key
}

payload = {
    'text1': text1,
    'text2': text2,
    'text3': text3,
    'text4': text4,
    'text5': text5,
    'text6': text6,
    'text7': text7,
    'text8': text8,
    'text9': text9,
    'text10': text10,
    'text11': text11,
    
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Request failed with status code {response.status_code}')`
