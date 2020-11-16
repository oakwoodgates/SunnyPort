/**
 *  The app
 **/

import I18n from '../../javascripts/lib/i18n'
import { resizeContainer, render } from '../../javascripts/lib/helpers'
import getDefaultTemplate from '../../templates/default'

const MAX_HEIGHT = 1000
const API_ENDPOINTS = {
  organizations: '/api/v2/organizations.json'
}

class App {
  constructor (client, appData) {
    this._client = client
    this._appData = appData

    this.states = {}

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init () {
    const currentUser = (await this._client.get('currentUser')).currentUser
    this.states.currentUserName = currentUser.name

    I18n.loadTranslations(currentUser.locale)

    const organizations = await this._client
      .request(API_ENDPOINTS.organizations)
      .catch(this._handleError.bind(this))

    const ticket = await this._client.get('ticket')

    if (organizations && ticket) {

      this.states.organizations = organizations.organizations
      this.states.requester = ticket.ticket.requester

      const userData = sessionStorage.getItem( ticket.ticket.requester.id );

      if ( userData ) {
        render('.loader', getDefaultTemplate(JSON.parse(userData)))
      } else {
        const settings =  await this._client.metadata().then( data => data.settings )
        const body = new FormData();

        body.append( 'key', settings.opkey );
        body.append( 'app', settings.opapp );
        body.append( 'brj', settings.spapp );
        body.append( 'eml', ticket.ticket.requester.email );

        const test = await fetch('https://zdac.biddytarot.com/', {
          method: 'POST',
          headers: {},
          body: body
        })
        .then(response => response.json())
        .then(data => {
          this.states.ontraport = data;
          return this.states.ontraport;
        })
        .then(data =>{
          // render application markup
          render('.loader', getDefaultTemplate(this.states))
        })
        .then( data => {
          sessionStorage.setItem( ticket.ticket.requester.id, JSON.stringify(this.states));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }

      return resizeContainer(this._client, MAX_HEIGHT)
    }
  }


  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError (error) {
    console.log('An error is handled here: ', error.message)
  }
}

export default App
