const FileInput = props => (
  <div>
    <h3>{props.title}</h3>
    <input type="file" {...props} />
    <style jsx>{`
      div {
        padding: 0.5em;
      }
    `}</style>
  </div>
)

export default FileInput
