import { truncateString, mapStatusColor, mapStatus } from '../javascripts/lib/helpers.js'

export default function opContactPurchaseTable ( args ) {
  if ( args.ontraport.data.id ) {
    if ( args.ontraport.purchases ) {
      return `
        <p class="meta text-center">Will display up to the 50 most recent purchases</p>
        <table class="table-striped">
          <tr><th>Product</th><th>Date</th><th>$</th></tr>
          ${args.ontraport.purchases.map((item, i) => `
            <tr>
              <td class="fs-small">${truncateString(item.name,45)}</td>
              <td class="meta text-right">${new Date(item.date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
              <td class="meta text-right"><span class="c-tag c-tag--${mapStatusColor(item.status)}" title="${mapStatus(item.status)}">$${item.total_price}</span></td>
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
