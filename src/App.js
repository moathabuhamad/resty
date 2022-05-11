import './App.css';
import Footer from './components/footer/footer.js';
import Header from './components/header/header.js';
import Results from './components/results/results.js';
import Form from './components/form/form.js';
import historyReducer, {
  clearAction,
  addAction,
} from './components/history/history';
import { useState, useEffect, useReducer } from 'react';

const initialState = {
  methodUrl: [],
  results: [],
};

function App() {
  const [result, setResult] = useState();
  const [method, setMethod] = useState('get');
  const [headers, setHeader] = useState();
  const [body, setBody] = useState();
  const [loading, setLoad] = useState(false);
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const [error, setError] = useState('');
  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  function handleClick(e) {
    for (let i = 0; i < state.methodUrl.length; i++) {
      if (state.methodUrl[i] === e.target.innerText) {
        setResult(state.results[i]);
        setHeader('');
      }
    }
  }

  function updateMethod(e) {
    setMethod(e.target.value);
  }

  async function onSubmit(url) {
    setLoad(true);
    let headerObject = {};
    let response;
    let data;
    try {
      if (method === 'get') {
        response = await fetch(url, {});
        data = await response.json();
      }
      if (method === 'post') {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });
        data = await response.json();
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
    } catch (e) {
      setError(e.message);
    }
    const headers = response.headers.entries();
    for (let pairs of headers) {
      headerObject[pairs[0]] = pairs[1];
    }
    if (method) {
      setResult(data);
      setHeader(headerObject);
      dispatch(addAction({ method: method, url: url, results: data || error }));
    } else {
      setResult('please select method');
    }
    setLoad(false);
  }
  function handleClear(e) {
    e.preventDefault();
    dispatch(clearAction());
  }

  useEffect(() => {
    setError('');
  }, [result]);
  return (
    <>
      <Header />
      <Form
        onSubmit={onSubmit}
        updateMethod={updateMethod}
        handleBodyChange={handleBodyChange}
      />
      <Results
        method={method || ''}
        url={result || ''}
        headers={headers || ''}
        loading={loading}
        history={state}
        handleClear={handleClear}
        error={error}
        handleClick={handleClick}
      />
      <Footer />
    </>
  );
}

export default App;
