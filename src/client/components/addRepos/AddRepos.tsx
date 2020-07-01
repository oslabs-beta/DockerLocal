import React, { useState, useEffect, InputHTMLAttributes, MouseEvent, ReactHTMLElement } from 'react';
import RepoListItem from './RepoListItem';

import { Repo, RepoResponseType, AddReposProps } from '../../../types/types';
const CryptoJS = require('crypto-js');

/**
 * @function  Add array of repositories to repos array in state
 * @desc    Sends fetch requests to Github API to populate repository info for authenticated user
 */
const AddRepos: React.FC<AddReposProps> = ({ setShowAddRepos, userInfo }) => {
  const [repos, setRepos] = useState<RepoResponseType>({ personal: [], organizations: [], collaborations: [] })
  const [selectedRepos, setSelectedRepos] = useState<readonly Repo[]>([])
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all')

  // dummy request and response 
  const fetchRepos = async () => {

    //PARSE TOKEN AND USERNAME FROM COOKIES
    const nameAndToken = document.cookie.split(';');
    const username = nameAndToken[0].replace('username=', '').trim();
    const token = nameAndToken[1].replace('token=', '').trim();
    const parsedToken = decodeURIComponent((token));

    //DECRYPT TOKEN FROM COOKIES
    const decryptedToken = await CryptoJS.AES.decrypt(parsedToken, 'super_secret').toString(CryptoJS.enc.Utf8);

    const response = { personal: [], organizations: [], collaborations: [] };

    //WILL USE USERNAME AND ACCESS TOKEN FOR THESE REQUESTS
    //ADD HEADERS FOR POST REQUEST
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${decryptedToken}`);
    myHeaders.append("Content-Type", "application/json");


    //PUPLIC REPO FETCH //////////////////////////////////////////////////
    // Query to get the repo id, repo name, and repo owner for public repositories
    var publicRepoQuery = JSON.stringify({
      query: `{
        user(login: "louisxsheid") {
          repositories(first: 100, privacy: PUBLIC) {
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
      variables: {}
    })

    //Request options for fetches with appended headers and correct query
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: publicRepoQuery,
      redirect: 'follow'
    };

    // Send fetch request to Github GraphQL API with requestOptions object for Public Repos
    await fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        let currentNode;
        let pubLength = result.data.user.repositories.edges.length;
        let pubRepos = [];
        for (let i = 0; i < pubLength; i++) {
          currentNode = result.data.user.repositories.edges[i];
          pubRepos.push({ 
            id: currentNode.node.id, 
            name: currentNode.node.name, 
            owner: currentNode.node.owner.login 
          })
        }
        response.personal = pubRepos;
      })
      .catch(error => console.log('error', error));


    //COLLABORATOR REPO FETCH//////////////////////////////////////////////////
    //gets the id, name and owner username from repos collaborated on
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
      variables: {}
    })

    //changes the query to be for collaborated repos (above)
    requestOptions.body = collabFetch;

    await fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        let currentNode;
        let collabChain = result.data.user.repositories.nodes;
        let collabLength = collabChain.length;
        let collabRepos = [];
        for (let i = 0; i < collabLength; i++) {
          currentNode = result.data.user.repositories.nodes[i];
          collabRepos.push({ 
            id: currentNode.id, 
            name: currentNode.name, 
            owner: currentNode.owner.login 
          })
        }
        response.collaborations = collabRepos;
      })
      .catch(error => console.log('error', error));


    //ORGANIZATION REPO FETCH//////////////////////////////////////////////////
    //gets the id, name and owner username from repos inside of organizations the user is a member of
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
      variables: {}
    })

    //changes the query to be for organization repos (above)
    requestOptions.body = orgFetch;

    await fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        let currentNode;
        let reposLength;
        let objChain = result.data.user.organizations.edges;
        let orgLength = objChain.length;
        let orgArr = [];
        // Iterate through the returned object and save the name, id, and owner information for each repo node
        for (let x = 0; x < orgLength; x++) {
          reposLength = objChain[x].node.repositories.edges.length;
          for (let i = 0; i < reposLength; i++) {
            currentNode = result.data.user.organizations.edges[x].node.repositories.edges[i].node;
            orgArr.push({ 
              name: currentNode.name, 
              id: currentNode.id, 
              owner: currentNode.owner.login
            })
          }
        }
        response.organizations = orgArr;
      })
      .catch(error => console.log('error', error));

    //logs all gathered and parsed repository data;
    console.log('RESPONSE: ', response);
    return response;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
  }

  // switches active filter onclick
  const filterClick = (e: React.MouseEvent<HTMLAnchorElement & { id: string }>): void => {
    setActiveFilter(e.currentTarget.id)

  }


  const handleSubmit = () => {
    // submit stuff to back end
    // then
    setShowAddRepos(false);

  }

  useEffect(() => {
    // fetchRepos(userInfo)
    // then
    setRepos(fetchRepos());
  }, [])

  // {repos.map(repo => <li>{repo.repoName}</li>)}
  // <button onClick={handleSubmit}>Close</button>
  return (

    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <article className="panel is-primary">
          <p className="panel-heading">
            Select Repositories to Add:
          </p>
          <section style={{ padding: 0 }} className="modal-card-body">

            {/* filter tabs */}
            <p className="panel-tabs">
              <a className={activeFilter === 'all' ? 'is-active' : ''}
                id="all"
                onClick={(e): void => filterClick(e)}
              >All
              </a>

              {/* hardcoded id, might want to change these to variables */}
              <a className={activeFilter === 'personal' ? 'is-active' : ''}
                id="personal"
                onClick={(e): void => filterClick(e)}
              >Personal</a>
              <a className={activeFilter === 'organizations' ? 'is-active' : ''}
                id="organizations"
                onClick={(e): void => filterClick(e)}
              >Organizations</a>
              <a className={activeFilter === 'collaborations' ? 'is-active' : ''}
                id="collaborations"
                onClick={(e): void => filterClick(e)}
              >Collaborations</a>
            </p>
            <div className="panel-block">
              <p className="control has-icons-left">
                <input
                  className="input is-large"
                  type="text"
                  placeholder="Search"
                  size={80}
                  value={searchValue}
                  onChange={handleChange}
                />
              </p>
            </div>
          </section>

          <section style={{ height: 300, padding: 0 }} className="modal-card-body">
            {/* if activeFilter is all or personal, render personal repos */}
            {/* if something is typed in the search box, only show repos that include the exact string */}
            {/* could change filter to regex at a later date to include a more robust search */}
            {/* map filtered list to render comonent for each item */}
            {/* {(activeFilter === 'all' || activeFilter === 'personal')
              && repos.personal
                .filter(({ nameWithOwner }) => {
                  return searchValue === '' || repoName.includes(searchValue)
                })
                .map((repo) => (
                  <RepoListItem
                    key={repo.nameWithOwner}
                    {...{
                      repo,
                      selectedRepos,
                      setSelectedRepos
                    }}
                  />
                ))} */}
            {/* same as above for organizations */}
            {/* {(activeFilter === 'all' || activeFilter === 'organizations')
              && repos.organizations
                .filter(({ repoName }) => {
                  return searchValue === '' || repoName.includes(searchValue)
                })
                .map((repo) => (
                  <RepoListItem
                    key={repo.repoName}
                    {...{
                      repo,
                      selectedRepos,
                      setSelectedRepos
                    }}
                  />
                ))} */}
            {/* same as above for collabs */}
            {/* {(activeFilter === 'all' || activeFilter === 'collaborations')
              && repos.collaborations
                .filter(({ repoName }) => {
                  return searchValue === '' || repoName.includes(searchValue)
                })
                .map((repo) => (
                  <RepoListItem
                    key={repo.repoName}
                    {...{
                      repo,
                      selectedRepos,
                      setSelectedRepos
                    }}
                  />
                ))} */}
          </section>

          {/* might want to add a style here to keep constant height */}
          {/* could add uncheck functionality to list at bottom, would have to rethink state if so*/}
          <footer className="modal-card-foot">
            <div style={{ height: '100px' }} className="content">
              Add the following Repositories to your project:
              <ul>
                {selectedRepos.map(({ repoName }) => <li key={`confirm ${repoName}`}>{repoName}</li>)}
              </ul>
            </div>
            <div>
              <button className="button" onClick={(): void => setShowAddRepos(false)}>Cancel</button>
              <button className="button is-success" onClick={(): void => handleSubmit()}>Add Repos</button>

            </div>
          </footer>
        </article>
      </div>
    </div>



  )
}

export default AddRepos;