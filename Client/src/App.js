import QuoteForm from './views/QuoteForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/styles.css';
import {Router} from '@reach/router';
import Admin from './views/Admin.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <QuoteForm path="/"/>
        <Admin path="/admin"/>
      </Router>
    </div>
  );
}

export default App;
