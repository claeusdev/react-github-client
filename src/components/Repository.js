import React from 'react'
import Link from './Link'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import StarButton from './StarButton'

const star_repo = gql`
    mutation($id: ID!){
        addStar(input: {starrableId: $id }) {
            starrable {
                id
                viewersHasStarred
            }
        }
    }
`
const Repository = ({
    id,
    name,
    url,
    descriptionHTML,
    owner,
    stargazers,
    watchers,
    viewersSubscriptions,
    viewersHasStarred,
    primaryLanguage}
) => (
    <div className="col-md-4">
        <h2>
            <Link href={url}>{name}</Link>
        </h2>
        <div className="stars">
            
        </div>
        <div>
            <Mutation mutation={star_repo} variables={{ id}}>
                {(addStar, {data, loading, error }) =>( <StarButton className={'repo_star_button'} onClick={addStar}>{stargazers.totalCount} Stars</StarButton>)}
            </Mutation>
        </div>
        <div className="repo_description">
            <div className="repo_description__info" dangerouslySetInnerHTML={{__html: descriptionHTML }}/>
            <div className="repo_description_language">
                {primaryLanguage && (<span>Language: {primaryLanguage.name}</span>)}
            </div>
            <div className="repo_description__owner">
                {owner && (<span>By: <a href={owner.url}>{owner.login}</a></span>)}
            </div>
        </div>
    </div>
)

export default Repository