import { mapReadingStatus } from '../javascripts/lib/helpers.js'

export default function btcReaderTable ( args ) {
  console.log('btcReaderTable', args);
  if ( args.ontraport.data.id ) {
    if ( args.ontraport.ftr ) {
      return `
      <div>
        <table class="table-list">
          <tr><th colspan="2" class="text-center">Data</th></tr>
          <tr><td>Closed:</td><td>${args.ontraport.ftr.closed}</td></tr>
          <tr><td>Awaiting Feedback:</td><td>${args.ontraport.ftr.awaiting_feedback}</td></tr>
          <tr><td>Rating:</td><td>${args.ontraport.ftr.rating} <span class="u-fg-yellow-600">&#9733;</span></td></tr>
        </table>
        <table class="table-striped">
          <caption>Assigned Readings</caption>
          <tr><th>ID</th><th>Date</th><th>Due</th><th>Status</th></tr>
          ${args.ontraport.ftr_new.open_readings.map((item, i) => `
            <tr class="fs-small">
              <td class=""><a href="https://community.biddytarot.com/wp-admin/post.php?post=${item.id}&action=edit" target="_blank">${item.id} &#8599;</a></td>
              <td class="">${new Date(item.requested * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
              <td class="">${new Date(item.due * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
              <td class="">${mapReadingStatus(item.status)}</td>
            </tr>
            `.trim()).join('')}
        </table>
      </div>`
    } else {
      return `<p class="msg">No Readings found.</p>`
    }
  }
}
