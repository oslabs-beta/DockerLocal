import React, { useState, useEffect } from 'react';

import AddRepos from '../addRepos/AddRepos';


const ProjectPage: React.FC = ({ activeProject, userInfo }) => {
  const [showAddRepos, setShowAddRepos] = useState(false);

  useEffect(() => {

  }, [activeProject])

  return (
    <div>
      <div>I'm a project page!</div>
    <button onClick={(): void => setShowAddRepos(true)}>Add Reopos!</button>
    
    
    
    {/* shows this element if showAddRepos is true */}
    {showAddRepos && <AddRepos {...{showAddRepos, setShowAddRepos, userInfo}}/>}
    </div>
  )
}

export default ProjectPage;