import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectRepoListItem from '../src/client/components/projects/ProjectRepoListItem';

describe('<ProjectRepoListItem/> unit test', () => {

  const propsRepo = {
    repoName: 'mockRepoName',
    repoId: 'mockRepoId',
    repoOwner: 'mockRepoOwner',
    isIncluded: false
  }

  const propsProject = {
    projectName: 'mockPorjectName',
    projectId: 'mockPorjectId',
    projectRepos: [propsRepo]
  }

  const propsProjectRepoList = {
    activeProject: "repostring",
    repo: propsRepo,
    projectList: [propsProject],
    // setProjectList: jest.fn(),
    dispatch: jest.fn()
  }

  const wrapper = shallow(<ProjectRepoListItem {...propsProjectRepoList} />);

  console.log(wrapper.debug());
  it('should render a <div> and a <input>', () => {
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
  })

  it('should render a repo name', () => {
    expect(wrapper.find('div').text()).toEqual(propsRepo.repoName);

  })

  xit('should possible to activate input checkbox', () => {
    // wrapper.find('div').simulate('click');
    // expect(propsRepo.isIncluded).toBe(true);
  })

})