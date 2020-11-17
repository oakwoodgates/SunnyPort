import { mapStatus, maybeDivider } from '../javascripts/lib/helpers.js'


export default function opContactSubscriptionTable ( args ) {
  if ( args.ontraport.id ) {
    if ( args.ontraport.subs ) {
      return `
        <p class="meta text-center">Will display up to the 50 most recent subscriptions. Dates displayed as M/D/YY</p>
          ${args.ontraport.subs.map((item, i) => `
            <table class="">
              <tr class="row-bg-light"><td colspan="2" class="text-center"><b>${item.name}<b></td></tr>
              <tr><td class="table-list">Status:</td><td>${mapStatus(item.status)}</td></tr>
              <tr><td class="table-list">Original Payment:</td><td>${new Date(item.orig_month_date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td></tr>
              <tr><td class="table-list">Next Payment:</td><td>${new Date(item.payment_next_date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td></tr>
              <tr><td class="table-list">Transactions:</td><td>${item.transactions}</td></tr>
              <tr><td class="table-list">Charged:</td><td>$${item.charged}</td></tr>
              <tr><td class="table-list">Frequency:</td><td>${item.unit}</td></tr>
            </table>
            ${maybeDivider(i)}
            `.trim()).join('')}
        `
    } else {
      return `<p>no orders found</p>`
    }
  } else {
    return `<p>no orders found</p>`
  }
}
