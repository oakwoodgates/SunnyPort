import opContactDataTable from '../components/opContactDataTable.js'
import opContactTagsTable from '../components/opContactTagsTable.js'
import opContactPurchaseTable from '../components/opContactPurchaseTable.js'
import opContactSubscriptionTable from '../components/opContactSubscriptionTable.js'
import btcReaderTable from '../components/btcReaderTable.js'
import btcRequestTable from '../components/btcRequestTable.js'

export default function makePanel( name, args ) {
  let panel = '';
	let show = false;
  switch (name) {
		case 'Contact Data':
			panel = opContactDataTable(args);
			show = true;
			break;
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
  }

  if ( panel.length > 0 ) {
    return `
    <button class="accordion${show ? ' active' : ''}">${name}</button>
    <div class="panel${show ? ' show' : ''}">
      ${panel}
    </div>`;
  } else {
    return ``;
  }
}
