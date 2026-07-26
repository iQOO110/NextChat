import { StoreKey, ApiPath, OPENAI_BASE_URL } from "../constant";
import { getHeaders } from "../client/api";
import { getClientConfig } from "../config/client";
import { createPersistStore } from "../utils/store";
import { DEFAULT_CONFIG } from "./config";
import { getModelProvider } from "../utils/model";
const isApp = getClientConfig()?.buildMode === "export";
const DEFAULT_OPENAI_URL = isApp ? OPENAI_BASE_URL : ApiPath.OpenAI;
const DEFAULT_ACCESS_STATE = {
  accessCode: "",
  useCustomConfig: false,
  openaiUrl: DEFAULT_OPENAI_URL,
  openaiApiKey: "",
  needCode: true,
  hideUserApiKey: false,
  hideBalanceQuery: false,
  disableGPT4: false,
  disableFastLink: false,
  customModels: "",
  defaultModel: "",
  visionModels: "",
  edgeTTSVoiceName: "zh-CN-YunxiNeural",
};
export const useAccessStore = createPersistStore(
  { ...DEFAULT_ACCESS_STATE },
  (set, get) => ({
    enabledAccessControl() {
      this.fetch();
      return get().needCode;
    },
    getVisionModels() {
      this.fetch();
      return get().visionModels;
    },
    edgeVoiceName() {
      this.fetch();
      return get().edgeTTSVoiceName;
    },
    isValidOpenAI() {
      return !!get().openaiApiKey;
    },
    isAuthorized() {
      return (
        this.isValidOpenAI() ||
        !this.enabledAccessControl() ||
        (this.enabledAccessControl() && !!get().accessCode)
      );
    },
    fetch() {
      if (getClientConfig()?.buildMode === "export") return;
      fetch("/api/config", {
        method: "post",
        body: null,
        headers: { ...getHeaders() },
      })
        .then((res) => res.json())
        .then((res) => {
          const defaultModel = res.defaultModel ?? "";
          if (defaultModel) {
            const [model, providerName] = getModelProvider(defaultModel);
            DEFAULT_CONFIG.modelConfig.model = model;
            DEFAULT_CONFIG.modelConfig.providerName = provider as any;
          }
          set(() => ({ ...res }));
        })
        .catch(() => console.error("[Config] failed to fetch config"))
        .finally(() => {});
    },
  }),
  {
    name: StoreKey.Access,
    version: 2,
    migrate(persistedState, version) {
      if (version < 2) {
        const state = persisted as any;
        state.openaiApiKey = state.token || state.openaiApiKey || "";
        delete state.token;
      }
      return persistedState as any;
    },
  }
);