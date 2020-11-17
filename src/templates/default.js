import { templatingLoop as loop, escapeSpecialChars as escape, truncateString, sortTags } from '../javascripts/lib/helpers.js'
import I18n from '../javascripts/lib/i18n.js'


function opContactDataTable ( args ) {
  if ( args.ontraport.id ) {
    return `
      <table class="table-striped">
        <tr><td>OP ID</td><td><b><a href="https://app.ontraport.com/#!/contact/edit&id=${args.ontraport.id}" target="_blank">${args.ontraport.id} &#8599;</a></b></td></tr>
        <tr><td>Name</td><td>${args.ontraport.firstname} ${args.ontraport.lastname}</td></tr>
        <tr><td>City</td><td>${args.ontraport.city}</td></tr>
        <tr><td>State</td><td>${args.ontraport.state}</td></tr>
        <tr><td>Country</td><td>${args.ontraport.country}</td></tr>
        <tr><td>Cell</td><td>${args.ontraport.cell_phone}</td></tr>
        <tr><td>Home</td><td>${args.ontraport.home_phone}</td></tr>
        <tr><td>Office</td><td>${args.ontraport.office_phone}</td></tr>
        <tr><td>SMS</td><td>${args.ontraport.sms_number}</td></tr>
        <tr><td>Purchases</td><td>${args.ontraport.num_purchased}</td></tr>
        <tr><td>Spent</td><td>$${args.ontraport.spent}</td></tr>
        <tr><td>Open Invoices</td><td>${args.ontraport.unpaid_invoices}</td></tr>
        <tr><td>Membership</td><td>${args.ontraport.has_membership}</td></tr>
      </table>`
  } else {
    return `<p>no contact found</p>`
  }
}

function opContactPurchaseTable ( args ) {
  if ( args.ontraport.id ) {
    if ( args.ontraport.purchases ) {
      return `
        <p class="meta text-center">Will display up to the 50 most recent purchases. Dates displayed as M/D/YY</p>
        <table class="table-striped">
          <tr><td></td><td></td><td></td></tr>
          ${args.ontraport.purchases.map((item, i) => `
            <tr>
              <td><span class="purchase-status purchase-status-${item.status}"></span></td>
              <td class="fs-small">${truncateString(item.name,45)}</td>
              <td class="meta">${new Date(item.date * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
              <td class="meta">$${item.total_price}</td>
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

  function opContactTagsTable ( args ) {
    if ( args.ontraport.id ) {
      if ( args.ontraport.contact_tags ) {
        args.ontraport.contact_tags.sort(sortTags)
        return `
        <table class="table-striped">
          ${args.ontraport.contact_tags.map((item, i) => `
            <tr>
              <td class="fs-small">${item.name}</td>
              <td class="meta">${item.id}</td>
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

    export default function (args) {
      return `
        <div class="example-app">
          <button class="accordion active">Contact Data</button>
          <div class="panel show">
            ${opContactDataTable(args)}
          </div>
          <button class="accordion">Contact Tags</button>
          <div class="panel">
            ${opContactTagsTable(args)}
          </div>
          <button class="accordion">Purchase History</button>
          <div class="panel">
            ${opContactPurchaseTable(args)}
          </div>
          <script>
            var acc = document.getElementsByClassName("accordion");
            var i;
            for (i = 0; i < acc.length; i++) {
              acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                panel.classList.toggle("show");
              });
            }
          </script>
        </div>`
    }
