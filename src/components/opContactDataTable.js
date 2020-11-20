export default function opContactDataTable ( args ) {
  if ( args.ontraport.data.id ) {
    return `
      <table class="table-striped">
        <tr><th></th><th></th></tr>
        <tr><td>OP ID</td><td><a href="https://app.ontraport.com/#!/contact/edit&id=${args.ontraport.data.id}" target="_blank">${args.ontraport.data.id} &#8599;</a></td></tr>
        <tr><td>Name</td><td>${args.ontraport.data.firstname} ${args.ontraport.data.lastname}</td></tr>
        <tr><td>City</td><td>${args.ontraport.data.city}</td></tr>
        <tr><td>State</td><td>${args.ontraport.data.state}</td></tr>
        <tr><td>Country</td><td>${args.ontraport.data.country}</td></tr>
        <tr><td>Purchases</td><td>${args.ontraport.data.num_purchased}</td></tr>
        <tr><td>Spent</td><td>$${args.ontraport.data.spent}</td></tr>
        <tr><td>Open Invoices</td><td>$${args.ontraport.data.unpaid_invoices}</td></tr>
        <tr><td>Membership</td><td>${args.ontraport.data.has_membership}</td></tr>
      </table>`
  } else {
    return `<p>no contact found</p>`
  }
}
