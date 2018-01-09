import React from 'react'
import { FlatList } from 'react-native'
import UploadedItem from './UploadedItem'

class UploadList extends React.PureComponent {
  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => <UploadedItem image={item} />

  render() {
    return (
      <FlatList
        data={this.props.uploads}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

export default UploadList
