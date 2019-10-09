export const Section = ({ intro, children }) => (
  <section>
    <header>{intro}</header>
    {children}
    <style jsx>{`
      section {
        margin-top: 3rem;
        margin-bottom: 1.5rem;
      }
      header {
        margin: 1.5rem;
      }
    `}</style>
  </section>
)
