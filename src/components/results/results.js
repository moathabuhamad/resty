import './results.css';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const Results = function (props) {
  let results = props.url;
  let methodUrl = props.history.methodUrl;
  if (!props.loading) {
    return (
      <div id='result-page'>
        <div id='history'>
          <button onClick={props.handleClear}>clear History</button>
          <h2 id='headers-h'>{methodUrl[0] ? 'History' : ''}</h2>
          <ul>
            {methodUrl.map((history, indx) => {
              return (
                <li
                  className='history-list'
                  key={indx}
                  name={history}
                  onClick={props.handleClick}
                >
                  {history}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 id='headers-h'>{props.headers ? 'Headers' : ''}</h2>
          <JSONPretty id='json-pretty' data={props.headers}></JSONPretty>
          <h2 id='results-h'>{results || props.error ? 'Results' : ''}</h2>
          <div id='results-json'>
            <JSONPretty
              id='json-pretty'
              data={props.error ? props.error : results}
            ></JSONPretty>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>loading....</p>;
  }
};

export default Results;
