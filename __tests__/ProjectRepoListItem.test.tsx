import * as React from 'react';
import { shallow } from 'enzyme';
import ProjectRepoListItem from '../src/client/components/projects/ProjectRepoListItem';

describe('<ProjectRepoListItem/> unit test', () => {
  const propsProjectRepoList = {
    activeProject: "repostring",
    repo: {
      repoName: 'mockRepoName',
      repoId: 'mockRepoId',
      repoOwner: 'mockRepoOwner',
    },
    projectList: [],
    setProjectList: jest.fn()

  }
  const wrapper = shallow(<ProjectRepoListItem {...propsProjectRepoList} />);


})