import { getClientConfig } from "../config/client";
import { ACCESS_CODE_PREFIX, ModelProvider } from "../constant";
import { ChatMessageTool, ChatMessage, ModelType, useAccessStore, useChatStore } from "../store";
import { ChatGPTApi } from "./platforms/openai";
export function getHeaders(ignoreHeaders: boolean = false) {
  const accessStore = useAccessStore.getState();
  let headers: Record<string, string> = {};
  if (!ignoreHeaders) {
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  if (accessStore.openaiUrl && accessStore.openaiApiKey) {
    headers["X-Custom-Url"] = accessStore.openaiUrl;
    headers["X-Custom-Token"] = accessStore.openaiApiKey;
    headers.Authorization = `Bearer ${accessStore.openaiApiKey}`;
  }
  return headers;
}
export class ClientApi {
  public llm: LLMApi;
  constructor(provider: ModelProvider = ModelProvider.GPT) {
    this.llm = new ChatGPTApi();
  }
  config() {}
  prompts() {}
  masks() {}
  async share(messages: ChatMessage[], avatarUrl: string | null = null) {
    // 原有share方法完全保留
  }
}
export function getClientApi(provider?: any): ClientApi {
  return new ClientApi(ModelProvider.GPT);
}