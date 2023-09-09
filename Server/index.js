const app = require("./i18n/server");
const server = require("./webSocket/server");

const WS_PORT = process.env.WS_PORT || 3011; // Use a different port for WebSocket
const I18N_PORT = process.env.I18N_PORT || 3012;

server.listen(WS_PORT, () => {
  console.log(`WebSocket running on port => ${WS_PORT}`);
});

app.listen(I18N_PORT, () => {
  console.log(`i18n running on port => ${I18N_PORT}`);
});
