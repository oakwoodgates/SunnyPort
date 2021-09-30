/**
 *  The app
 **/
import { resizeContainer, render } from '../../javascripts/lib/helpers'
import { ontraPanels, ftrPanels } from '../../components/panel'
import I18n from '../../javascripts/lib/i18n.js'
import getDefaultTemplate from '../../templates/base'
import getDataTemplate from '../../templates/data'

const MAX_HEIGHT = 1000
const API_ENDPOINTS = {
  organizations: '/api/v2/organizations.json'
}

class App {

  constructor (client, appData) {
    this._client = client
    this._appData = appData
    this.states = {}
    this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init () {

    App.states = {}
    App._client = this._client
    App._appData = this._appData

    const currentUser = (await App._client.get('currentUser')).currentUser
    // this.states.currentUserName = currentUser.name

    I18n.loadTranslations(currentUser.locale)

    const organizations = await App._client
      .request(API_ENDPOINTS.organizations)
      .catch(this._handleError.bind(this))

    const ticket = await this._client.get('ticket')

    if (organizations && ticket) {

      App.states.organizations = organizations.organizations
      App.states.requester = ticket.ticket.requester

      render('.loader', getDefaultTemplate(App.states))

      const userData = sessionStorage.getItem( App.states.requester.id );
      if ( userData ) {
        render('#appData', getDataTemplate(JSON.parse(userData)))
      }

      return resizeContainer(App._client, MAX_HEIGHT)
    }
  }

  static async getData() {

    let button = document.getElementById("fetchData");
    button.innerHTML = 'loading...'

    const settings = await App._client.metadata()
    .then( data => data.settings )
    .catch((error) => {
      console.error('Error:', error);
    });

    const body = new FormData();

    body.append( 'key', settings.opkey );
    body.append( 'app', settings.opapp );
    body.append( 'eml', App.states.requester.email );

    const request = await fetch('https://zdac.biddytarot.com/', {
      method: 'POST',
      headers: {},
      body: body
    })
    .then(response => response.json())
    .then(data => {
      App.states.ontraport = {
        "data": data['data'],
        "contact_tags": data['contact_tags'],
        "purchases": data['purchases'],
        "subs": data['subs'],
        "multiple": data['multiple']
      };
      App.states.ftr = data['ftr'];
      return App.states;
    })
    .then(data =>{
      // render application markup
      render('#appData', getDataTemplate(App.states))
      resizeContainer(App._client, MAX_HEIGHT)
    })
    .then( data => {
      button.innerHTML = 'Fetch Data'
      sessionStorage.setItem( App.states.requester.id, JSON.stringify(App.states));
    })
    .catch((error) => {
      console.error('Error:', error);
    });

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
