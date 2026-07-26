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
// ========== 以下常量需要保留 ==========

// SaaS 跳转链接（auth.tsx 需要）
export const SAAS_CHAT_URL = "https://nextchat.club";
export const SAAS_CHAT_UTM_URL = "https://nextchat.club?utm=github";

// TTS 相关（chat.tsx 需要）
export const DEFAULT_TTS_ENGINE = "OpenAI-TTS";
export const DEFAULT_TTS_ENGINES = ["OpenAI-TTS", "Edge-TTS"];
export const DEFAULT_TTS_MODEL = "tts-1";
export const DEFAULT_TTS_VOICE = "alloy";
export const DEFAULT_TTS_MODELS = ["tts-1", "tts-1-hd"];
export const DEFAULT_TTS_VOICES = [
  "alloy", "echo", "fable", "onyx", "nova", "shimmer"
];

// 摘要模型（chat.tsx 的 summarizeSession 中用到）
export const SUMMARIZE_MODEL = "gpt-4o-mini";
export const GEMINI_SUMMARIZE_MODEL = "gemini-pro";       // 若不用 Google 可保留但不影响
export const DEEPSEEK_SUMMARIZE_MODEL = "deepseek-chat"; // 若不用 DeepSeek 可保留

// 输入模板（chat.tsx 中可能用到）
export const DEFAULT_INPUT_TEMPLATE = `{{input}}`;
export const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by {{ServiceProvider}}.
Knowledge cutoff: {{cutoff}}
Current model: {{model}}
Current time: {{time}}
Latex inline: \\(x^2\\) 
Latex block: $$e=mc^2$$
`;

// 知识截止日期（chat.tsx 中用到）
export const KnowledgeCutOffDate: Record<string, string> = {
  default: "2021-09",
  "gpt-4-turbo": "2023-12",
  // ... 可以只保留几个常用的，或全部保留（不影响厂商）
  "gpt-4o": "2023-10",
  "gpt-4o-mini": "2023-10",
  // 其他模型根据需求添加，但至少保留 default
};

// 其他可能缺失的常量（根据错误提示补充）
export const REQUEST_TIMEOUT_MS = 60000;
export const REQUEST_TIMEOUT_MS_FOR_THINKING = REQUEST_TIMEOUT_MS * 5;
export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;
export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";
export const UNFINISHED_INPUT = (id: string) => "unfinished-input-" + id;
export const LAST_INPUT_KEY = "last-input";
export const DEFAULT_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;
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