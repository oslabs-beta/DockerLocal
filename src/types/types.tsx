export type Project = {
  projectName: string;
  projectId: number;
  projectRepos: Repos[];
};

export type Repo = {
  repoName: string;
  repoCloneLink: string;
}
