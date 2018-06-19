import React  from 'react'
import Repository from './Repository'
import Repo_Fragment from './Fragments'

const Repositories = ({ repositories }) =>
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="repo">
        <div className="row">
            <Repository {...node} />
        </div>
    </div>
  ));



export {Repo_Fragment}
export default Repositories