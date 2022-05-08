import React from 'react';

import './style/base.css';
import './style/header.css';
import './style/form.css';
import './style/results.css';
import './style/footer.css';

import Header from './components/header';
import Form from './components/form';
import Results from './components/results';
import Footer from './components/footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestData: null,
      resultsIn: null,
    };
  }

  getResults = (requestData) => {
    this.setState({ requestData, resultsIn: 'results' });
  };

  render = () => (
    <div className='App'>
      <Header />
      <main>
        <Form handleInput={this.getResults} />
        <Results
          data={this.state.requestData}
          resultsIn={this.state.resultsIn}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
