import opContactTagsTable from '../components/opContactTagsTable.js'
import opContactDataTable from '../components/opContactDataTable.js'
import opContactPurchaseTable from '../components/opContactPurchaseTable.js'
import opContactSubscriptionTable from '../components/opContactSubscriptionTable.js'
import btcReaderTable from '../components/btcReaderTable.js'
import btcRequestTable from '../components/btcRequestTable.js'
import I18n from '../javascripts/lib/i18n.js'


function makePanel( name, args ) {
  if ( args.ontraport.data.id ) {
    let panel = '';
    switch (name) {
      case 'Contact Tags':
        panel = opContactTagsTable(args);
        break;
      case 'Purchase History':
        panel = opContactPurchaseTable(args);
        break;
      case 'Subscriptions':
        panel = opContactSubscriptionTable(args);
        break;
      case 'FTR Reader':
        panel = btcReaderTable(args);
        break;
      case 'FTR Client':
        panel = btcRequestTable(args);
        break;
      default:
        panel = '';
    }
    if ( panel.length > 0 ) {
      return `
      <button class="accordion">${name}</button>
      <div class="panel">
        ${panel}
      </div>`;
    }
  }
}


  export default function (args) {
    return `
      <div class="example-app">
        <button class="accordion active">Contact Data</button>
        <div class="panel show">
          ${opContactDataTable(args)}
        </div>
        ${makePanel( 'Contact Tags', args )}
        ${makePanel( 'Purchase History', args )}
        ${makePanel( 'Subscriptions', args )}
        ${makePanel( 'FTR Reader', args )}
        ${makePanel( 'FTR Client', args )}
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
