import { mapSubscriptionStatus, mapSubscriptionStatusColor, maybeDivider } from '../javascripts/lib/helpers.js'


export default function opContactSubscriptionTable ( args ) {
  if ( args.ontraport.subs.length > 0 ) {
    return `
      <div>
        ${args.ontraport.subs.map((item, i) => `
          <table class="table-list">
            <tr class="row-bg-light"><th colspan="2" class="text-center">${item.name}</th></tr>
            <tr><td>Status:</td><td><span class="c-tag c-tag--${mapSubscriptionStatusColor(item.status)}"><span>${mapSubscriptionStatus(item.status)}</span></span></td></tr>
            <!--<tr><td>Original Payment:</td><td>${new Date(item.orig_month_date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td></tr>-->
            <tr><td>Next Payment:</td><td>${new Date(item.payment_next_date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td></tr>
            <tr><td>Next Amount:</td><td>$${item.next_charge}</td></tr>
            <tr><td>Total Payments:</td><td>${item.transactions}</td></tr>
            <tr><td>Total Charged:</td><td>$${item.charged}</td></tr>
            <tr><td>Frequency:</td><td>${item.unit}</td></tr>
          </table>
          ${maybeDivider(i)}
          `.trim()).join('')}
        </div>`
  } else {
    return `<p class="msg">No Subscriptions found.</p>`
  }
}
