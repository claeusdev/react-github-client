import React  from 'react'
import Repository from './Repository'

const Repositories = ({ repositories }) =>
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="repo">
        <div className="row">
            <Repository {...node} />
        </div>
    </div>
  ));




export default Repositories