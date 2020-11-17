import { truncateString, mapStatusColor, mapStatus } from '../javascripts/lib/helpers.js'

export default function opContactPurchaseTable ( args ) {
  if ( args.ontraport.id ) {
    if ( args.ontraport.purchases ) {
      return `
        <p class="meta text-center">Will display up to the 50 most recent purchases. Dates displayed as M/D/YY</p>
        <table class="table-striped">
          <tr><td></td><td></td><td></td></tr>
          ${args.ontraport.purchases.map((item, i) => `
            <tr>
              <td class="fs-small">${truncateString(item.name,45)}</td>
              <td class="meta">${new Date(item.date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
              <td class="meta"><span class="c-tag c-tag--pill c-tag--${mapStatusColor(item.status)}" title="${mapStatus(item.status)}">$${item.total_price}</span></td>
            </tr>
            `.trim()).join('')}
        </table>`
    } else {
      return `<p>no orders found</p>`
    }
  } else {
    return `<p>no orders found</p>`
  }
}
