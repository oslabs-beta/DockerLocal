import React, { useState, useEffect, InputHTMLAttributes, MouseEvent, ReactHTMLElement } from 'react';
import RepoListItem from './RepoListItem';

import { Repo, RepoResponseType, AddReposProps } from '../../../types/types';
const CryptoJS = require('crypto-js');

const AddRepos: React.FC<AddReposProps> = ({ setShowAddRepos, userInfo }) => {
  const [repos, setRepos] = useState<RepoResponseType>({ personal: [], organizations: [], collaborations: [] })
  const [selectedRepos, setSelectedRepos] = useState<readonly Repo[]>([])
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all')

  // dummy request and response 
  const fetchRepos = (userInfo) => {

    //PARSE TOKEN AND USERNAME FROM COOKIES
    const nameAndToken = document.cookie.split(';');
    const username = nameAndToken[0].replace('username=', '').trim();
    const token = nameAndToken[1].replace('token=', '').trim();

    const decryptedToken = CryptoJS.AES.decrypt(token, 'super_secret').toString(CryptoJS.enc.Utf8);
    console.log('ENCRYPTED: ', token)
    console.log('DECRYPTED: ', decryptedToken)
    
    const response = { personal: [], organizations: [], collaborations: [] };

    //WILL USE USERNAME AND ACCESS TOKEN FOR THESE REQUESTS
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${decryptedToken}`);
    myHeaders.append("Content-Type", "application/json");


    //PUPLIC REPO FETCH //////////////////////////////////////////////////
    var publicRepoQuery = JSON.stringify({
      query: `{
        user(login: \"${username}\") { 
          repositories(first:100, privacy: PUBLIC) { 
            edges { 
              node { 
                id, 
                nameWithOwner, 
                url 
              } 
            } 
          } 
        } 
      }`,
      variables: {}
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: publicRepoQuery,
      redirect: 'follow'
    };

    fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('PUBLIC REPO FETCH: ', result)
        response.personal.public.push(result)
      })
      .catch(error => console.log('error', error));


    //PRIVATE REPO FETCH //////////////////////////////////////////////////

    const privateRepoQuery = JSON.stringify({
      query: `{user(login: "${username}") { 
        repositories(first:100, privacy: PRIVATE) { 
          edges { 
            node { 
              id, 
              nameWithOwner, 
              url 
            } 
          } 
        } 
      } 
    }`,
      variables: {}
    })

    requestOptions.body = privateRepoQuery;

    fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('PRIVATE REPO FETCH: ', result)
        response.personal.private.push(result)
      })
      .catch(error => console.log('error', error));


    //COLLABORATOR REPO FETCH//////////////////////////////////////////////////

    const collabFetch = JSON.stringify({
      query: `user(login: "${username}") {
        repositories(first: 100, affiliations: COLLABORATOR) {
          nodes {
            nameWithOwner
            url
          }
        }
      }`,
      variables: {}
    })

    requestOptions.body = collabFetch;

    fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('COLLABORATOR REPO FETCH: ', result)
        response.collaborations.push(result)
      })
      .catch(error => console.log('error', error));


    //ORGANIZATION REPO FETCH//////////////////////////////////////////////////

    const orgFetch = JSON.stringify({
      query: `user(login: "${username}") {
        organizations(first: 100) {
          edges {
            node {
              name
              url
              repositories(affiliations: ORGANIZATION_MEMBER, first: 100) {
                edges {
                  node {
                    nameWithOwner
                    url
                  }
                }
              }
            }
          }
        }
      }`,
      variables: {}
    })

    requestOptions.body = orgFetch;

    fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('ORGANIZATION REPO FETCH: ', result)
        response.organizations.push(result)
      })
      .catch(error => console.log('error', error));

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
    setRepos(fetchRepos(userInfo));
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
            {(activeFilter === 'all' || activeFilter === 'personal')
              && repos.personal
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
                ))}
            {/* same as above for organizations */}
            {(activeFilter === 'all' || activeFilter === 'organizations')
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
                ))}
            {/* same as above for collabs */}
            {(activeFilter === 'all' || activeFilter === 'collaborations')
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
                ))}
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