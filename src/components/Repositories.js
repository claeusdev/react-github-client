import React  from 'react'
import Repository from './Repository'

const Repositories = ({ repositories }) =>
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="repo">
      <Repository {...node} />
    </div>
  ));




export default Repositories