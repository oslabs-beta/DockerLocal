/* eslint-disable import/no-unresolved */
import { RepoResponseType } from "../../types/types";
import { getUsernameAndToken } from "../helpers/cookieClientHelper";

// dummy request and response
export const fetchRepos = async (): Promise<RepoResponseType> => {
  // *** need to add conditional if user is not logged in or if fetch error etc ***

  const { username, accessToken } = await getUsernameAndToken();

  const response: RepoResponseType = {
    personal: [],
    organizations: [],
    collaborations: [],
  };

  // WILL USE USERNAME AND ACCESS TOKEN FOR THESE REQUESTS
  // ADD HEADERS FOR POST REQUEST
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  // PUPLIC REPO FETCH //////////////////////////////////////////////////
  // Query to get the repo id, repo name, and repo owner for public repositories
  const publicRepoQuery = JSON.stringify({
    query: `{
        user(login: "${username}") {
          repositories(first: 100) {
            edges {
              node {
                id
                name
                owner {
                  ... on User {
                    login
                  }
                }
              }
            }
          }
        }
      }`,
    variables: {},
  });

  // Request options for fetches with appended headers and correct query
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: publicRepoQuery,
    redirect: "follow",
  };

  // Send fetch request to Github GraphQL API with requestOptions object for Public Repos
  await fetch("https://api.github.com/graphql", requestOptions)
    .then((response) => response.text())
    .then((res) => {
      const result = JSON.parse(res);
      let currentNode;
      const pubLength = result.data.user.repositories.edges.length;
      const pubRepos = [];
      for (let i = 0; i < pubLength; i++) {
        currentNode = result.data.user.repositories.edges[i].node;
        pubRepos.push({
          repoId: currentNode.id,
          repoName: currentNode.name,
          repoOwner: currentNode.owner.login,
        });
      }
      response.personal = pubRepos;
    })
    .catch((error) => console.log("error", error));

  // COLLABORATOR REPO FETCH//////////////////////////////////////////////////
  // gets the id, name and owner username from repos collaborated on
  const collabFetch = JSON.stringify({
    query: `{
        user(login: "${username}") {
          repositories(first: 100, affiliations: COLLABORATOR) {
            nodes {
              id
              name
              owner {
                login
              }
            }
          }
        }
      }`,
    variables: {},
  });

  // changes the query to be for collaborated repos (above)
  requestOptions.body = collabFetch;

  await fetch("https://api.github.com/graphql", requestOptions)
    .then((response) => response.text())
    .then((res) => {
       const result = JSON.parse(res);
      let currentNode;
      const collabChain = result.data.user.repositories.nodes;
      const collabLength = collabChain.length;
      const collabRepos = [];
      for (let i = 0; i < collabLength; i++) {
        currentNode = result.data.user.repositories.nodes[i];
        collabRepos.push({
          repoId: currentNode.id,
          repoName: currentNode.name,
          repoOwner: currentNode.owner.login,
        });
      }
      response.collaborations = collabRepos;
    })
    .catch((error) => console.log("error", error));

  // ORGANIZATION REPO FETCH//////////////////////////////////////////////////
  // gets the id, name and owner username from repos inside of organizations the user is a member of
  const orgFetch = JSON.stringify({
    query: `{
        user(login: "${username}") {
          organizations(first: 100) {
            edges {
              node {
                repositories(affiliations: ORGANIZATION_MEMBER, first: 100) {
                  edges {
                    node {
                      name
                      id
                      owner {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    variables: {},
  });

  // changes the query to be for organization repos (above)
  requestOptions.body = orgFetch;

  await fetch("https://api.github.com/graphql", requestOptions)
    .then((response) => response.text())
    .then((res) => {
      const result = JSON.parse(res);
      let currentNode;
      let reposLength;
      const objChain = result.data.user.organizations.edges;
      const orgLength = objChain.length;
      const orgArr = [];
      // Iterate through the returned object and save the name, id, and owner information for each repo node
      for (let x = 0; x < orgLength; x++) {
        reposLength = objChain[x].node.repositories.edges.length;
        for (let i = 0; i < reposLength; i++) {
          currentNode =
            result.data.user.organizations.edges[x].node.repositories.edges[i]
              .node;
          orgArr.push({
            repoName: currentNode.name,
            repoId: currentNode.id,
            repoOwner: currentNode.owner.login,
          });
        }
      }
      response.organizations = orgArr;
    })
    .catch((error) => console.log("error", error));

  // logs all gathered and parsed repository data;
  // console.log("RESPONSE: ", response);
  return response;
};
