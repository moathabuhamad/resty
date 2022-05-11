import './form.css';
import { useRef } from 'react';
const Form = function (props) {
  const resultRef = useRef();
  function updateResults(e) {
    e.preventDefault();
    const result = resultRef.current.value;
    props.onSubmit(result);
  }
  return (
    <>
        <form id='form' onSubmit={updateResults}>
          <div id='radio-methods'>
            <input
              type='radio'
              id='get'
              name='methods'
              value='get'
              onClick={props.updateMethod}
            />
            <label>get</label>
            <input
              type='radio'
              id='post'
              name='methods'
              value='post'
              onClick={props.updateMethod}
            />
            <label>post</label>
            <input
              type='radio'
              id='put'
              name='methods'
              value='put'
              onClick={props.updateMethod}
            />
            <label>put</label>
            <input
              type='radio'
              id='delete'
              name='methods'
              value='delete'
              onClick={props.updateMethod}
            />
            <label>delete</label>
            
          </div>
          
          <div id='url-submit'>
            <input
              ref={resultRef}
              type='text'
              id='url-input'
              placeholder='https://'
            />
            <input
              id='submit'
              type='submit'
              value='go!'
              onSubmit={updateResults}
            />
          </div>
        </form>
    </>
  );
};

export default Form;
