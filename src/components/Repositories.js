import React  from 'react'
import Repository from './Repository'
import Repo_Fragment from './Fragments'

const Repositories = ({ repositories }) =>
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="col-sm-4">
        <div className="card">
            <div className="card-body">
                <Repository {...node} />
            </div>
        </div>
    </div>
  ));



export {Repo_Fragment}
export default Repositories