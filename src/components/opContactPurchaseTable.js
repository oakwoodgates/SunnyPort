import { truncateString, mapTransactionStatusColor, mapTransactionStatus } from '../javascripts/lib/helpers.js'

export default function opContactPurchaseTable ( args ) {
  if ( args.ontraport.purchases.length > 0 ) {
    return `
      <p class="meta text-center">Will display up to the 50 most recent purchases</p>
      <table class="table-striped">
        <tr><th>Product</th><th>Date</th><th>$</th></tr>
        ${args.ontraport.purchases.map((item, i) => `
          <tr>
            <td class="fs-small">${truncateString(item.name,45)}</td>
            <td class="meta text-right">${new Date(item.date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
            <td class="meta text-right"><span class="c-tag c-tag--${mapTransactionStatusColor(item.status)}" title="${mapTransactionStatus(item.status)}">$${item.total_price}</span></td>
          </tr>
          `.trim()).join('')}
      </table>`
  } else {
    return `<p class="msg">No Purchases found.</p>`
  }
}
