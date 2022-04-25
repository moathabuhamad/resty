import React from 'react';

import './style/base.css';
import './style/header.css';
import './style/form.css';
import './style/footer.css';


import Header from './components/header';
import Form from './components/form';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
      <Form />
      </main>
      <Footer />
    </div>
  );
}

export default App; 