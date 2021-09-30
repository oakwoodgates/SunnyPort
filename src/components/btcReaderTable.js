import { mapReadingStatus } from '../javascripts/lib/helpers.js'

export default function btcReaderTable ( args ) {

    if ( Object.keys(args.ftr).length !== 0 ) {
      let r = `
      <div>
        <table class="table-list">
          <tr><th colspan="2" class="text-center">Data</th></tr>
          <tr><td>Closed:</td><td>${args.ftr.closed}</td></tr>
          <tr><td>Awaiting Feedback:</td><td>${args.ftr.awaiting_feedback}</td></tr>
          <tr><td>Rating:</td><td>${args.ftr.rating} <span class="u-fg-yellow-600">&#9733;</span></td></tr>
        </table>
        `;
          if ( args.ftr.open_readings.length > 0 ) {
            r += `
            <table class="table-striped">
              <caption>Assigned Readings</caption>
              <tr><th>ID</th><th>Date</th><th>Due</th><th>Status</th></tr>
            `;
            args.ftr.open_readings.map((item, i) =>
            r += `
              <tr class="fs-small">
                <td><a href="https://community.biddytarot.com/wp-admin/post.php?post=${item.id}&action=edit" target="_blank">${item.id} &#8599;</a></td>
                <td>${new Date(item.requested * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
                <td>${new Date(item.due * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td>
                <td>${mapReadingStatus(item.status)}</td>
              </tr>
              `.trim()).join('');
            r += `</table>`
          } else {
            r += '<p class="msg">No open readings found.</p>'
          }
          r += '</div>'
          return r
    } else {
      return `<p class="msg">No Readings found.</p>`
    }

}
