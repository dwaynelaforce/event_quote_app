// import 'bootstrap/dist/css/bootstrap.min.css';
import './static/styles.css';
import {Router} from '@reach/router';

// view imports
import Admin from './views/Admin.jsx';
import CustomerInquiry from './views/CustomerInquiry.jsx';
import InquiryInfo from './views/InquiryInfo.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <CustomerInquiry path="/"/>
        <Admin path="/admin"/>
        <InquiryInfo path="/inquiry/:id"/>
      </Router>
    </div>
  );
}

export default App;
