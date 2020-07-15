import { SetStateAction, Dispatch } from 'react';

export type Project = {
  projectName: string;
  projectId: string;
  projectRepos: readonly Repo[];
};

export type projectListActions = {
  type:
    | 'addProject'
    | 'deleteProject'
    | 'addRepo'
    | 'deleteRepo'
    | 'toggleRepo';
  payload: readonly Project[];
};

export type Repo = {
  repoName: string;
  repoId: string;
  repoOwner: string;
  isIncluded?: boolean;
};

export type User = {
  userName: string;
  userId: string;
};

export type ProjectReposType = {
  personal: readonly Repo[];
  organizations: readonly Repo[];
  collaborations: readonly Repo[];
};

export type RepoSearchListItemProps = {
  repo: Repo;
  selectedRepos: readonly Repo[];
  setSelectedRepos: Dispatch<SetStateAction<Repo[]>>;
  projectList: readonly Project[];
  activeProject: string;
};

export type AddReposProps = {
  showAddRepos: boolean;
  setShowAddRepos: Dispatch<SetStateAction<boolean>>;
  activeProject: string;
  projectList: readonly Project[];
  dispatch: React.Dispatch<projectListActions>;
};

export type ProjectPageProps = {
  activeProject: string;
  userInfo: User;
  projectList: readonly Project[];
  dispatch: React.Dispatch<projectListActions>;
};

export type ProjectRepoListItemProps = {
  activeProject: string;
  repo: Repo;
  projectList: readonly Project[];
  dispatch: React.Dispatch<projectListActions>;
};

export type RepoResponseType = {
  personal: readonly Repo[];
  organizations: readonly Repo[];
  collaborations: readonly Repo[];
};

export type ProjectSideBarProps = {
  setShowProjectSidebarModal: Dispatch<SetStateAction<boolean>>;
  projectList: readonly Project[];
  dispatch: React.Dispatch<projectListActions>;
  setActiveProject: Dispatch<SetStateAction<string>>;
};

export type SidebarButtonProps = Project & {
  activeProject: string;
  setActiveProject: Dispatch<SetStateAction<string>>;
};

export type SidebarProps = {
  projectList: readonly Project[];
  dispatch: React.Dispatch<projectListActions>;
  activeProject: string;
  setActiveProject: Dispatch<SetStateAction<string>>;
};

export type HomeProps = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
};

export type CloningReposModalProps = {
  showCloningReposModal: boolean;
  setShowCloningReposModal: Dispatch<SetStateAction<boolean>>;
};

export type ComposeFileModalProps = {
  setShowComposeModal: Dispatch<SetStateAction<boolean>>;
  activeProject: string;
  projectList: readonly Project[];
  composeFileData: { text: string; path: string };
};

export type ComposeFile = {
  text: string;
  path: string;
};
