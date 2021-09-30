import { sortTags } from '../javascripts/lib/helpers.js'

export default function opContactTagsTable ( args ) {
  if ( args.ontraport.contact_tags.length > 0 ) {
    args.ontraport.contact_tags.sort(sortTags)
    return `
      <table class="table-striped">
        <tr><th>Tag</th><th>ID</th></tr>
        ${args.ontraport.contact_tags.map((item, i) => `
          <tr>
            <td class="fs-small">${item.name}</td>
            <td class="meta">${item.id}</td>
          </tr>
          `.trim()).join('')}
      </table>`
  } else {
    return `<p class="msg">No Tags found for this Contact.</p>`
  }
}
