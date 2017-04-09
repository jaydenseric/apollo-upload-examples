import {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import uploadsQuery from '../queries/uploads'

class SingleUploader extends Component {
  handleChange = ({target}) => {
    if (target.validity.valid) {
      this.props
        .mutate({
          variables: {
            file: target.files[0]
          },
          refetchQueries: [{
            query: uploadsQuery
          }]
        })
        .then(({data}) => console.log('Mutation response:', data))
    }
  }

  render () {
    return <input type='file' accept={'image/jpeg,image/png'} required onChange={this.handleChange} />
  }
}

export default graphql(gql`
  mutation singleUpload ($file: Upload!) {
    singleUpload (file: $file) {
      id
      name
      type
      size
      path
    }
  }
`)(SingleUploader)
