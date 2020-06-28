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
}

export type RepoResponseType = {
  personal: Repo[];
  organizations: Repo[];
  collaborations: Repo[];
}
