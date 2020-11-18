/**
 * Resize App container
 * @param {ZAFClient} client ZAFClient object
 * @param {Number} max max height available to resize to
 * @return {Promise} will resolved after resize
 */
export function resizeContainer (client, max = Number.POSITIVE_INFINITY) {
  const newHeight = Math.min(document.body.clientHeight, max)
  return client.invoke('resize', { height: newHeight })
}

/**
 * Helper to render a dataset using the same template function
 * @param {Array} set dataset
 * @param {Function} getTemplate function to generate template
 * @param {String} initialValue any template string prepended
 * @return {String} final template
 */
export function templatingLoop (set, getTemplate, initialValue = '') {
  return set.reduce((accumulator, item, index) => {
    return `${accumulator}${getTemplate(item, index)}`
  }, initialValue)
}

/**
 * Render template
 * @param {String} replacedNodeSelector selector of the node to be replaced
 * @param {String} htmlString new html string to be rendered
 */
export function render (replacedNodeSelector, htmlString) {
  const fragment = document.createRange().createContextualFragment(htmlString)
  const replacedNode = document.querySelector(replacedNodeSelector)

  replacedNode.parentNode.replaceChild(fragment, replacedNode)
}

/**
 * Helper to escape unsafe characters in HTML, including &, <, >, ", ', `, =
 * @param {String} str String to be escaped
 * @return {String} escaped string
 */
export function escapeSpecialChars (str) {
  if (typeof str !== 'string') throw new TypeError('escapeSpecialChars function expects input in type String')

  const escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }

  return str.replace(/[&<>"'`=]/g, function (m) { return escape[m] })
}

export function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

export function sortTags(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

export function mapStatus( code ) {
  let str = String(code)
  switch (str) {
    case '0':
      return 'Collections'
      break;
    case '1':
      return 'Paid'
      break;
    case '2':
      return 'Refunded'
      break;
    case '3':
      return 'Partially Refunded'
      break;
    case '4':
      return 'Voided'
      break;
    case '5':
      return 'Declined'
      break;
    case '6':
      return 'Write Off'
      break;
    case '7':
      return 'Pending'
      break;
    default:
      return '~'
  }

}

export function mapStatusColor( code ) {
  let str = String(code)
  switch (str) {
    case '1': // Paid
      return 'green'
      break;
    case '0': // Collections
    case '7': // Pending
    case '5': // Declined
    case '6': // Written off
      return 'red'
      break;
    case '2': // Refunded
    case '3': // Partially Refunded
    case '4': // Void
      return 'yellow'
      break;
    default:
      return 'grey'
  }
}

export function maybeDivider( i ) {
  if ( i > 0 ) {
    return `<hr />`
  } else {
    return ``
  }
}
