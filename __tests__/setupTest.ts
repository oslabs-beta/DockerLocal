import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup the adapter to be use by enzyme
configure({ adapter: new Adapter() });