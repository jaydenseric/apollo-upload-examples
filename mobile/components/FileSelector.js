import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'
import { ReactNativeFile } from 'apollo-upload-client'

import logo from '../assets/apollo-upload-logo.png'

class FileSelector extends React.PureComponent {
  _onPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync()

    if (!result.cancelled)
      this.props.onSelected(
        new ReactNativeFile({
          name: result.uri.split('/').pop(),
          type: 'image/png',
          uri: result.uri,
        })
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="cover" />
        <TouchableOpacity onPress={this._onPress} style={{ flex: 1 }}>
          <Text>Select File</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#22a699',
  },
  logo: {
    flex: 1,
    height: 150,
  },
})

export default FileSelector
