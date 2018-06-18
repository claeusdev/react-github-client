import React from 'react'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import Repositories from './Repositories'

const current_user = gql`
    query{
        viewer {
            login
            name
        }
    }
`
const user_repos = gql`
    {
        viewer {
            name
            login
            avatarUrl
            repositories(
                first: 5 orderBy: {
                    direction: DESC,
                    field: STARGAZERS
                }
            ) {
                edges {
                    node {
                        id
                        name
                        url
                        descriptionHTML
                        primaryLanguage {
                            name
                        }
                        owner {
                            login
                            url
                        }
                        stargazers {
                            totalCount
                        }
                        viewerHasStarred
                        watchers {
                            totalCount
                        }
                        viewerSubscription
                    }
                }
            }
        }
    }
`
const Profile = () => (
    <Query query={user_repos}>
        {({ data, loading }) => {
      const { viewer } = data;

      if (loading || !viewer) {
        return <div>Loading ...</div>;
      }

      return (
        <div className="">
            <div className="row">
                <div className="col-sm-3">
                    <img className="img-fluid rounded" src={viewer.avatarUrl} alt={viewer.login}/>
                    <h2>{viewer.name}</h2>
                    <p className="lead">{viewer.login}</p>
                </div>
                <div className="col-sm-9">
                    <Repositories repositories={viewer.repositories} />
                </div>
            </div>
        </div>
      );
    }}
    </Query>
)


export default Profile