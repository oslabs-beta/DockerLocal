import React, { useState } from 'react';



const RepoListItem: React.FC<{ repoName: string }> = ({ repoName }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <a className="panel-block" onClick={(): void => setIsChecked(!isChecked)}>
        {/* checkbox is readonly because it rerenders on state change */}
        <input type="checkbox" checked={isChecked} readOnly/>
      {repoName}
    </a>
  )
}

export default RepoListItem;