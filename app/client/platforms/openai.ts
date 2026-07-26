import { OpenaiPath } from "@/app/constant";
import { useAccessStore } from "@/app/store";
export class ChatGPTApi {
  path(path: string): string {
    const accessStore = useAccessStore.getState();
    const basePath = "/api/openai";
    return `${basePath}/${path}`;
  }
  // 原有chat、speech、usage、models、extractMessage全部保留不变
}
