import { SetStateAction, Dispatch } from "react";
import { report } from "process";

export type Project = {
  projectName: string;
  projectId: number;
  projectRepos: readonly Repo[];
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
};

export type AddReposProps = {
  userInfo: User;
  setShowAddRepos: Dispatch<SetStateAction<boolean>>;
};

export type ProjectPageProps = {
  activeProject: number;
  userInfo: User;
  projectList: readonly Project[];
  setProjectList: Dispatch<SetStateAction<Project[]>>;
};

export type ProjectRepoListItemProps = {
  activeProject: number;
  repo: Repo;
  projectList: readonly Project[];
  setProjectList: Dispatch<SetStateAction<Project[]>>;
}

export type RepoResponseType = { 
  personal: readonly Repo[]; 
  organizations: readonly Repo[];
  collaborations: readonly Repo[]; 
}