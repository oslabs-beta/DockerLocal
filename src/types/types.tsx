import { SetStateAction, Dispatch } from "react";

export type Project = {
  projectName: string;
  projectId: number;
  projectRepos: Repo[];
};

export type Repo = {
  repoName: string;
  repoCloneLink: string;
};

export type User = {
  userName: string;
  userId: string;
};

export type RepoResponseType = {
  personal: readonly Repo[];
  organizations: readonly Repo[];
  collaborations: readonly Repo[];
};

export type RepoListItemProps = {
  repo: Repo;
  selectedRepos: readonly Repo[];
  setSelectedRepos: Dispatch<SetStateAction<Repo[]>>;
};

