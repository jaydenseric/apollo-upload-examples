import {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import uploadsQuery from '../queries/uploads'

class MultipleUploader extends Component {
  handleChange = ({target}) => {
    if (target.validity.valid) {
      this.props
        .mutate({
          variables: {
            files: target.files
          },
          refetchQueries: [{
            query: uploadsQuery
          }]
        })
        .then(({data}) => console.log('Mutation response:', data))
    }
  }

  render () {
    return <input type='file' accept={'image/jpeg,image/png'} multiple required onChange={this.handleChange} />
  }
}

export default graphql(gql`
  mutation multipleUpload ($files: [Upload!]!) {
    multipleUpload (files: $files) {
      id
      name
      type
      size
      path
    }
  }
`)(MultipleUploader)
