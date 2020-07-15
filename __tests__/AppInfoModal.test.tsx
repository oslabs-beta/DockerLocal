import * as React from 'react';
import { shallow } from 'enzyme';
import AppInfoModal from '../src/client/components/appInfo/AppInfoModal';



describe('<AppInfoModal /> unit testing', () => {
  //props when AppInfoModal button is clicked to be shown
  const propsShowModal = {
    showModal: true,
    setShowModal: jest.fn()
  }

  const wrapper = shallow(<AppInfoModal {...propsShowModal} />);

  wrapper
    .find('button')
    .first()
    .simulate('click');

  it('calls setShowModal on click', () => {
    expect(propsShowModal.setShowModal).toHaveBeenCalled()

  })

  // The first argument of the first call to the functon was false
  it('calls setShowModal to set showModal to be false on click ', () => {
    expect(propsShowModal.setShowModal.mock.calls[0][0]).toEqual(false);
  })

  it('should render two <button>', () => {
    expect(wrapper.find('button')).toHaveLength(2)
  })

})



