import React from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class UploadedItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id)
  }

  render() {
    const { image } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `http://localhost:3001/${image.path.replace(/^\.\//,'')}` }}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.text}>Name: {image.filename}</Text>
          <Text style={styles.text}>MIME Type: {image.mimetype}</Text>
          <Text style={styles.text}>Encoding: {image.encoding}</Text>
          <Text style={styles.text}>Path: {image.path}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    padding: 5,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  detailContainer: {
    flex: 1,
    padding: 5,
  },
  text: {
    color: '#fff',
  },
})

export default UploadedItem
