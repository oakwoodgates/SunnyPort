import opContactTagsTable from '../components/opContactTagsTable.js'
import opContactDataTable from '../components/opContactDataTable.js'
import opContactPurchaseTable from '../components/opContactPurchaseTable.js'
import opContactSubscriptionTable from '../components/opContactSubscriptionTable.js'
import btcReaderTable from '../components/btcReaderTable.js'
import btcRequestTable from '../components/btcRequestTable.js'
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
        <button class="accordion">FTR Reader</button>
        <div class="panel">
          ${btcReaderTable(args)}
        </div>
        <button class="accordion">FTR Client</button>
        <div class="panel">
          ${btcRequestTable(args)}
        </div>
        <div class="legend-panel">
          <hr />
          <p class="meta text-center">All dates displayed as M/D/YY</p>
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
