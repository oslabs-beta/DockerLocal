import * as React from 'react';
import { shallow } from 'enzyme';

import SignIn from '../src/client/components/signIn/SignIn';
import AppInfoModal from '../src/client/components/appInfo/AppInfoModal'

describe('<SignIn/>', () => {
  it('should render <AppInfoModal /> element if showModal evaluates to true', () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper.find(AppInfoModal)).toHaveLength(2);
  })
})