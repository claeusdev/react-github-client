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
        <div>
            <div className="text-center">
                {viewer.name} - {viewer.login}
            </div>
            <Repositories repositories={viewer.repositories} />
        </div>
      );
    }}
    </Query>
)


export default Profile