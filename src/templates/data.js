import makePanel from '../components/panel.js'

export function ontraPanels ( args ) {
  if ( args.ontraport.data.id ) {
    return `
		${makePanel( 'Contact Data', args )}
		${makePanel( 'Contact Tags', args )}
    ${makePanel( 'Purchase History', args )}
    ${makePanel( 'Subscriptions', args )}
    `
  } else {
    return `<p class="msg">
    <strong>No Ontraport data found</strong</p>`
  }
}

export function ftrPanels ( args ) {
  if ( Object.keys(args.ftr).length !== 0 ) {
    return `
      ${makePanel( 'FTR Reader', args )}
      ${makePanel( 'FTR Client', args )}
    `;
  } else {
    return `<hr />
    <p class="msg">
    <strong>No FTR data found</strong</p>`;
  }
}


export default function (args) {
  return `
    <div id="appData">
      ${ontraPanels(args)}
      ${ftrPanels(args)}
      <div class="legend-panel fix-layout">
        <hr />
        <p class="meta text-center">All dates displayed as M/D/Y</p>
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
