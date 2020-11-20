import { mapReadingStatus } from '../javascripts/lib/helpers.js'

export default function btcRequestTable ( args ) {
  console.log('btcRequestTable', args);
  if ( args.ontraport.data.id ) {
    if ( args.ontraport.ftr ) {
      return `
        <div>
          ${args.ontraport.ftr_new.open_requests.map((item, i) => `
            <table class="table-list">
              <caption>Open Request #${i+1}</caption>
              <tr><td>ID:</td><td><a href="https://community.biddytarot.com/wp-admin/post.php?post=${item.id}&action=edit" target="_blank">${item.id} &#8599;</a></td></tr>
              <tr><td>Requested:</td><td>${new Date(item.requested * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td></tr>
              <tr><td>Due:</td><td>${new Date(item.due * 1000).toLocaleDateString("en-US", {day:'numeric',month:'numeric',year:'2-digit'})}</td></tr>
              <tr><td>Status:</td><td>${mapReadingStatus(item.status)}</td></tr>
              <tr><td>Reader:</td><td><a href="https://community.biddytarot.com/wp-admin/post.php?post=${item.reader_id}&action=edit" target="_blank">${item.reader} &#8599;</a></td></tr>
            </table>
            `.trim()).join('')}
        </div>`
    } else {
      return `<p>No data found</p>`
    }
  }
}
