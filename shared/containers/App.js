import { connect } from 'react-redux';

import App                  from '../components/App.jsx';
import connectDataFetchers  from '../lib/connectDataFetchers.jsx';

export default connect(() => {
    return {};
})(connectDataFetchers(App, []));
