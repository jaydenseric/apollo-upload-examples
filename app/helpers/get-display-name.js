/**
 * Gets the display name of a JSX component for dev tools.
 * @param {Object | Function} component - A JSX component.
 * @returns {String} The component display name.
 */
export default function getDisplayName({ displayName, name }) {
  return displayName ? displayName : name && name !== '' ? name : 'Unknown'
}
