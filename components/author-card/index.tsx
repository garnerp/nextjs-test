import { Component } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import personQuery from './query.graphql'
import { Person as PersonFields, PersonVariables } from './types/Person'

class Person extends Component<ChildProps<PersonVariables, PersonFields>> {
  public render() {
    const { loading, error, person } = this.props.data

    return (
      <div>
        <p>{error ? `Error: ${error}` : ''}</p>
        <p>{loading ? 'Loading...' : ''}</p>
        <p>{JSON.stringify(person)}</p>
      </div>
    )
  }
}

export default graphql<PersonVariables, PersonFields>(personQuery, {
  options: ({ id }) => ({ variables: { id } })
})(Person)
