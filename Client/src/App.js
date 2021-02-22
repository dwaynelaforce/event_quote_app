import 'bootstrap/dist/css/bootstrap.min.css';
import './static/styles.css';
import {Router} from '@reach/router';

// view imports
import Admin from './views/Admin.jsx';
import CustomerInquiry from './views/CustomerInquiry.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <CustomerInquiry path="/"/>
        <Admin path="/admin"/>
      </Router>
    </div>
  );
}

export default App;
