export default function opContactDataTable ( args ) {
  if ( args.ontraport.id ) {
    return `
      <table class="table-striped">
        <tr><td>OP ID</td><td><b><a href="https://app.ontraport.com/#!/contact/edit&id=${args.ontraport.id}" target="_blank">${args.ontraport.id} &#8599;</a></b></td></tr>
        <tr><td>Name</td><td>${args.ontraport.firstname} ${args.ontraport.lastname}</td></tr>
        <tr><td>City</td><td>${args.ontraport.city}</td></tr>
        <tr><td>State</td><td>${args.ontraport.state}</td></tr>
        <tr><td>Country</td><td>${args.ontraport.country}</td></tr>
        <tr><td>Cell</td><td>${args.ontraport.cell_phone}</td></tr>
        <tr><td>Home</td><td>${args.ontraport.home_phone}</td></tr>
        <tr><td>Office</td><td>${args.ontraport.office_phone}</td></tr>
        <tr><td>SMS</td><td>${args.ontraport.sms_number}</td></tr>
        <tr><td>Purchases</td><td>${args.ontraport.num_purchased}</td></tr>
        <tr><td>Spent</td><td>$${args.ontraport.spent}</td></tr>
        <tr><td>Open Invoices</td><td>${args.ontraport.unpaid_invoices}</td></tr>
        <tr><td>Membership</td><td>${args.ontraport.has_membership}</td></tr>
      </table>`
  } else {
    return `<p>no contact found</p>`
  }
}
