export default ({heading, children}) => (
  <section>
    <h2>{heading}</h2>
    {children}
    <style jsx>{`
      section {
        padding: 1em 0;
      }
    `}</style>
  </section>
)
