export default {
  setLogs(state, payload) {
    state.logs = [...state.logs, payload];
  },
  clearLogs(state) {
    state.logs = [];
  },

  setSpeakText(state, payload) {
    state.speakText = payload;
  },

  setApiKey(state, payload) {
    state.apiKey = payload;
  },

  setUserName(state, payload) {
    state.userName = payload;
  },

  setRole(state, payload) {
    state.role = payload;
  },

  setRoleImage(state, payload){
    state.roleImage = payload;
  },

  setAuthentication(state, payload) {
    state.authenticated = payload
  },

  setIsSpeaking(state, payload) {
    state.isSpeaking = payload;
  },

  setErrorText(state, payload){
    state.errorText = payload
  },
  setAlertText(state, payload){
    state.alertText = payload
  },
};
