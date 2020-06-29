import { SetStateAction, Dispatch } from "react";

export type Project = {
  projectName: string;
  projectId: number;
  projectRepos: readonly Repo[];
};

export type Repo = {
  repoName: string;
  repoCloneLink: string;
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

export type RepoSearchListItem = {
  repo: Repo;
  selectedRepos: readonly Repo[];
  setSelectedRepos: Dispatch<SetStateAction<Repo[]>>;
};

export type AddReposProps = {
  userInfo: User;
  setShowAddRepos: Dispatch<SetStateAction<boolean>>;
};

export type ProjectPageProps = {
  activeProject: Project;
  userInfo: User;
};

export type ProjectRepoListItemProps = {
  activeProject: Project;
  repo: Repo;
}
