import React  from 'react'
import Repository from './Repository'
import Repo_Fragment from './Fragments'

const Repositories = ({ repositories }) =>
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="col-md-4 col-sm-6">
        <div className="card">
            <div className="card-body">
                <Repository {...node} />
            </div>
        </div>
    </div>
  ));



export {Repo_Fragment}
export default Repositories