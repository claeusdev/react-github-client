import React from 'react'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import Repositories, {Repo_Fragment} from './Repositories'
import ErrorMessage from './Error';

const user_repos = gql`
    {
        viewer {
            name
            login
            avatarUrl
            repositories(
                first: 20 orderBy: {
                    direction: DESC,
                    field: STARGAZERS
                }
            ) {
                edges {
                    node {
                        ...repository
                    }
                }
            }
        }
    }
    ${Repo_Fragment}
`

class Profile extends React.Component {
    componentDidMount(){
        console.log("Profile");
    }

    render(){
        return (
            <Query query={user_repos}
        notifyOnNetworkStatusChange={true}>
        {({ data, loading, error }) => {
            if (error) {
                return <ErrorMessage error={error}/>   
            }
      const { viewer } = data;

      if (loading || !viewer) {
        return <div>Loading ...</div>;
      }

      return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <img className="img-fluid rounded" src={viewer.avatarUrl} alt={viewer.login}/>
                    <h2>{viewer.name}</h2>
                    <p className="lead">{viewer.login}</p>
                </div>
                <div className="col-md-9">
                    <h2>Repositories</h2>
                    <div className="row">
                        <Repositories repositories={viewer.repositories} />
                    </div>
                </div>
            </div>
        </div>
      );
    }}
    </Query>
        )
    }
}


export default Profile