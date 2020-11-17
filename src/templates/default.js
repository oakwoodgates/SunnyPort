import opContactTagsTable from '../components/opContactTagsTable.js'
import opContactDataTable from '../components/opContactDataTable.js'
import opContactPurchaseTable from '../components/opContactPurchaseTable.js'
import opContactSubscriptionTable from '../components/opContactSubscriptionTable.js'
import I18n from '../javascripts/lib/i18n.js'

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
        <button class="accordion">Subscriptions</button>
        <div class="panel">
          ${opContactSubscriptionTable(args)}
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
