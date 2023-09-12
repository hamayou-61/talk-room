import { createStore, createLogger } from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

const state = {
  authenticated: false,
  logs: [],
  speakText: null,
  apiKey: null,
  userName: null,
  role: null,
  roleImage: null,
  isSpeaking: false,
  errorText: null,
  alertText: null
};

export default createStore({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
});
