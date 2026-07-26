export const OpenaiPath = {
  ChatPath: "chat/completions",
  ListModelPath: "models",
  SpeechPath: "audio/speech",
  UsagePath: "usage",
  SubsPath: "subscriptions",
};
export const OPENAI_BASE_URL = "https://api.openai.com/v1";
export enum ModelProvider {
  GPT = "gpt",
}
export enum ServiceProvider {
  OpenAI = "OpenAI",
}
export const ACCESS_CODE_PREFIX = "ak-";
// 保留原有OWNER, REPO, Path, ApiPath, Store等常量，删除全部其他厂商BASE_URL、枚举