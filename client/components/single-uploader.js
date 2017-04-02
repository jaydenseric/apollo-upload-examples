import {Component} from 'react'
import {graphql, gql} from 'react-apollo'

class SingleUploader extends Component {
  handleChange = ({target}) => {
    if (target.validity.valid) {
      this.props
        .mutate({
          variables: {
            file: target.files[0]
          }
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
      name
      type
      size
      path
    }
  }
`)(SingleUploader)
