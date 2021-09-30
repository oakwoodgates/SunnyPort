import App from '../javascripts/modules/app'

function requestData() {
  App.getData()
}
window.requestData = requestData;

export default function (args) {
  return `
    <div class="app">
      <div id="appData"></div>
      <div class="text-center fix-layout">
        <button id="fetchData" class="c-btn c-btn--sm c-btn--primary" onclick="requestData()">Fetch Data</button>
      </div>
    </div>`
}
