export const Section = (props) => (
  <>
    <section {...props} />
    <style jsx>{`
      section {
        margin: calc(var(--daui-spacing) * 2) 0;
      }
    `}</style>
  </>
);
