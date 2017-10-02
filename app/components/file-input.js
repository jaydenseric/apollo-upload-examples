const FileInput = props => (
  <div>
    <input type="file" {...props} />
    <style jsx>{`
      div {
        padding: 0.5em;
      }
    `}</style>
  </div>
)

export default FileInput
