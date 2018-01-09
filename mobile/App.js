import React from 'react'
import { SafeAreaView } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import createApolloClient from './api/ApolloClient'
import UploadListScreen from './screens/UploadListScreen'

class App extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.apolloClient = createApolloClient()
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#22a699', flex: 1, }}>
        <ApolloProvider client={this.apolloClient}>
          <UploadListScreen />
        </ApolloProvider>
      </SafeAreaView>
    )
  }
}

export default App
