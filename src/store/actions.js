import http from "@/plugins/axios";

const AI_MODEL = 'gpt-3.5-turbo';
const AI_TEMPERATURE = 0.7;

export const register = ({ commit }, payload) => {
  commit("setApiKey", payload.apiKey);
  commit("setUserName", payload.name);
  commit("setRole", payload.role);
};

export const sendMessage = ({ commit, state }) => {
  const speak = new SpeechSynthesisUtterance();
  return http()
    .post("/completions", {
      model: AI_MODEL,
      messages: state.logs,
      temperature: AI_TEMPERATURE,
    })
    .then((response) => {
      const message = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      commit("setLogs", message);
      commit("setErrorText", null);
      commit("setSpeakText", message.content);

      speak.onstart = ()=> {
        commit("setIsSpeaking", true);
      }
      speak.onerror = ()=> {
        commit("setIsSpeaking", false);
      }

      speak.onpause = ()=> {
        commit("setIsSpeaking", false);
      }
      
      speak.onend = ()=> {
        commit("setIsSpeaking", false);
      }
      
      speak.text = message.content;
      setTimeout(()=> {
        speechSynthesis.speak(speak);
      }, 1000);
    })
    .catch((error) => {
      if (error.response.status === 429) {
        commit("setErrorText", "時間をおいて試してください");
      }
      throw error;
    })
    .finally(() => {
    });
};
