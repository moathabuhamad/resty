import './App.css';
import Footer from './components/footer/footer.js';
import Header from './components/header/header.js';
import Results from './components/results/results.js';
import Form from './components/form/form.js';
import { useState, useEffect } from 'react';

function App() {
  const [result, setResult] = useState();
  const [method, setMethod] = useState();
  const [headers, setHeader] = useState();
  const [body, setBody] = useState();
  const [loading, setLoad] = useState(false);

  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  function updateMethod(e) {
    setMethod(e.target.value);
  }
  const clearData = new Promise((resolve) => {
    setTimeout(resolve, 20000);
  });

  async function onSubmit(url) {
    setLoad(true);
    let headerObject = {};
    let response;
    let data;
    if (method === 'get') {
      response = await fetch(url, {});
      data = await response.json();
    }
    if (method === 'post') {
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });
        data = await response.json();
      } catch (e) {
        console.log(e);
      }
    }
    if (method === 'put') {
      response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
    }
    if (method === 'delete') {
      response = await fetch(url, {
        method: 'DELETE',
      });
    }
    console.log(response);
    console.log(data);
    const headers = await response.headers.entries();
    console.log(headers);
    for (let pairs of headers) {
      console.log(pairs);
      headerObject[pairs[0]] = pairs[1];
    }
    console.log(headerObject);
    if (method) {
      setResult(data);
      setHeader(headerObject);
    } else {
      setResult('please select method');
    }
    setLoad(false);
  }
  useEffect(() => {
    if (result) {
      clearData.then(() => {
        setResult([]);
        setHeader([]);
      }, []);
    }
  });
  return (
    <main>
      <Header />
      <main>
        <Form
          onSubmit={onSubmit}
          updateMethod={updateMethod}
          handleBodyChange={handleBodyChange}
        />
        </main>
        <Results
          method={method || ''}
          url={result || ''}
          headers={headers || ''}
          loading={loading}
        />
        <Footer />
      
    </main>
  );
}

export default App;
