export default function opContactDataTable ( args ) {
  if ( args.ontraport.data.id ) {
    console.log(args);
    let extra_data = '';
    let tags = args.ontraport.contact_tags;
    var i;
    for (i = 0; i < tags.length; i++) {
      switch (tags[i].id) {
        case '332':
          extra_data += `<span class="c-tag c-tag--blue">${tags[i].name}</span>`;
      }
    }

    if ( true === args.ontraport.multiple ) {
      extra_data += `<span class="c-tag c-tag--red">Multiple Contacts Found</span>`;
    }

    if ( extra_data ) {
      extra_data = `<tr><td>Highlights</td><td class="highlights">${extra_data}</td></tr>`
    }
    return `
      <table class="table-striped">
        <tr><th></th><th></th></tr>
        <tr><td>OP ID</td><td><a href="https://app.ontraport.com/#!/contact/edit&id=${args.ontraport.data.id}" target="_blank">${args.ontraport.data.id} &#8599;</a></td></tr>
        <tr><td>Name</td><td>${args.ontraport.data.firstname} ${( args.ontraport.data.lastname ) ? args.ontraport.data.lastname : ''}</td></tr>
        ${( args.ontraport.data.city ) ? `<tr><td>City</td><td>${args.ontraport.data.city}</td></tr>` : ''}
        ${( args.ontraport.data.state ) ? `<tr><td>State</td><td>${args.ontraport.data.state}</td></tr>` : ''}
        ${( args.ontraport.data.country ) ? `<tr><td>Country</td><td>${args.ontraport.data.country}</td></tr>` : ''}
        <tr><td>Purchases</td><td>${( args.ontraport.data.num_purchased ) ? `${args.ontraport.data.num_purchased}` : '0'}</td></tr>
      <tr><td>Spent</td><td>$${args.ontraport.data.spent}</td></tr>
      <tr><td>Open Invoices</td><td>$${args.ontraport.data.unpaid_invoices}</td></tr>
      <tr><td>Membership</td><td>${args.ontraport.data.has_membership}</td></tr>
      ${extra_data}
    </table>
    `
  } else {
    return `<p class="msg">No Contact found.</p>`
  }
}
