// 必须保留（与厂商无关）
export const OWNER = "ChatGPTNextWeb";
export const REPO = "ChatGPT-Next-Web";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const PLUGINS_REPO_URL = `https://github.com/${OWNER}/NextChat-Awesome-Plugins`;
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`;
export const UPDATE_URL = `${REPO_URL}#keep-updated`;
export const RELEASE_URL = `${REPO_URL}/releases`;
export const FETCH_COMMIT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=1`;
export const FETCH_TAG_URL = `https://api.github.com/repos/${OWNER}/${REPO}/tags?per_page=1`;
export const RUNTIME_CONFIG_DOM = "danger-runtime-config";

export const OPENAI_BASE_URL = "https://api.openai.com";
export const ACCESS_CODE_PREFIX = "ak-";

// 路径枚举（必须完整）
export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Plugins = "/plugins",
  Auth = "/auth",
  Sd = "/sd",
  SdNew = "/sd-new",
  Artifacts = "/artifacts",
  SearchChat = "/search-chat",
  McpMarket = "/mcp-market",
}

// API 路径枚举（只保留 OpenAI、Artifacts、Cors）
export enum ApiPath {
  Cors = "",
  OpenAI = "/api/openai",
  Artifacts = "/api/artifacts",
  // 删除所有其它厂商路径，如 Azure, Google, Anthropic 等
}

// StoreKey 保留所有
export enum StoreKey {
  Chat = "chat-next-web-store",
  Plugin = "chat-next-web-plugin",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
  SdList = "sd-list",
  Mcp = "mcp-store",
}

// 服务提供商（只留 OpenAI）
export enum ServiceProvider {
  OpenAI = "OpenAI",
  // 删除其它
}

// 模型提供商（只留 GPT）
export enum ModelProvider {
  GPT = "GPT",
  // 删除其它
}

// OpenaiPath 对象（用于 /api/openai 内部）
export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  SpeechPath: "v1/audio/speech",
  ImagePath: "v1/images/generations",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};

// 存储键（sync.ts 需要）
export const STORAGE_KEY = "chatgpt-next-web";

// 其他通用常量（保留）
export const DEFAULT_INPUT_TEMPLATE = `{{input}}`;
export const DEFAULT_SYSTEM_TEMPLATE = `...`; // 如果需要，可以保留默认
export const REQUEST_TIMEOUT_MS = 60000;
export const REQUEST_TIMEOUT_MS_FOR_THINKING = REQUEST_TIMEOUT_MS * 5;
export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;
// ... 可能还有 DEFAULT_MODELS 等，但需修改为只含 OpenAI 模型