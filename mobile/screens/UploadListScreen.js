import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import FileSelector from '../components/FileSelector'
import UploadFileMutation from '../queries/UploadFileMutation'
import UploadListQuery from '../queries/UploadListQuery'
import UploadedList from '../components/UploadedList'

class UploadListScreen extends React.Component {
  render() {
    return [
      <UploadFileMutation key="uploader">
        {execute => <FileSelector onSelected={execute} />}
      </UploadFileMutation>,
      <UploadListQuery key="uploaded-list">
        {({ uploads }) => <UploadedList uploads={uploads} />}
      </UploadListQuery>,
    ]
  }
}

export default UploadListScreen
