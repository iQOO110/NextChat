import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./settings.module.scss";
import { IconButton } from "./button";
import CloseIcon from "../icons/close.svg";
import { List, ListItem, PasswordInput, showToast } from "./ui-lib";
import { ModelConfigList } from "./model-config";
import { SubmitKey, Theme, useAccessStore, useAppConfig } from "../store";
import Locale from "../locales";
import { getClientConfig } from "../config/client";
import { OPENAI_BASE_URL, OpenaiPath, Path } from "../constant";
import { InputRange } from "./input-range";
import { Avatar, AvatarPicker } from "./emoji";
import { Popover } from "./ui-lib";
import { ErrorBoundary } from "./error";
export function Settings() {
  const navigate = useNavigate();
  const config = useAppConfig();
  const updateConfig = config.update;
  const accessStore = useAccessStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const clientConfig = useMemo(() => getClientConfig(), []);
  const useCustomConfigComponent = !clientConfig?.isApp && (
    <ListItem
      title={Locale.Settings.Access.CustomEndpoint.Title}
      subTitle={Locale.Settings.Access.CustomEndpoint.SubTitle}
    >
      <input
        type="checkbox"
        checked={accessStore.useCustomConfig}
        onChange={(e) =>
          accessStore.update(
            (access) => (access.useCustomConfig = e.currentTarget.checked)
          )
        }
      />
    </ListItem>
  );
  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">{Locale.Settings.Title}</div>
          <div className="window-header-sub-title">{Locale.Settings.SubTitle}</div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              aria={Locale.UI.Close}
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
            />
          </div>
        </div>
      </div>
      <div className={styles["settings"]}>
        <List>
          <ListItem title={Locale.Settings.Avatar}>
            <Popover
              onClose={() => setShowEmojiPicker(false)}
              content={
                <AvatarPicker
                  onEmojiClick={(avatar: string) => {
                    updateConfig((config) => (config.avatar = avatar));
                    setShowEmojiPicker(false);
                  }}
                />
              }
              open={showEmojiPicker}
            >
              <div
                tabIndex={0}
                className={styles.avatar}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Avatar avatar={config.avatar} />
              </div>
            </Popover>
          </ListItem>
          <ListItem title={Locale.Settings.SendKey}>
            <select
              value={config.submitKey}
              onChange={(e) =>
                update(
                  (config) =>
                    (config.submitKey = e.target.value as any as SubmitKey)
                )
              }
            >
              {Object.values(SubmitKey).map((v) => (
                <option value={v} key={v}>{v}</option>
              ))}
            </select>
          </ListItem>
          <ListItem title={Locale.Settings.Theme}>
            <select
              value={config.theme}
              onChange={(e) =>
                updateConfig(
                  (config) => (config.theme = e.target.value as any as Theme)
                )
              }
            >
              {Object.values(Theme).map((v) => (
                <option value={v} key={v}>{v}</option>
              ))}
            </select>
          </ListItem>
          {useCustomConfigComponent}
          {accessStore.useCustomConfig && (
            <>
              <ListItem
                title={Locale.Settings.Access.OpenAI.Endpoint.Title}
                subTitle={Locale.Settings.Access.OpenAI.Endpoint.SubTitle}
              >
                <input
                  type="text"
                  value={accessStore.openaiUrl}
                  placeholder={OPENAI_BASE_URL}
                  onChange={(e) =>
                    accessStore.update(
                      (access) => (access.openaiUrl = e.currentTarget.value)
                    )
                  }
                />
              </ListItem>
              <ListItem
                title={Locale.Settings.Access.OpenAI.ApiKey.Title}
                subTitle={Locale.Settings.Access.OpenAI.ApiKey.SubTitle}
              >
                <PasswordInput
                  value={accessStore.openaiApiKey}
                  type="text"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
                  onChange={(e) => {
                    accessStore.update(
                      (access) => (access.openaiApiKey = e.currentTarget.value)
                    );
                  }}
                />
              </ListItem>
              <ListItem>
                <button
                  onClick={async () => {
                    if (!accessStore.openaiUrl || !accessStore.openaiApiKey) {
                      showToast(Locale.Settings.Access.EmptyInput);
                      return;
                    }
                    try {
                      const header = {
                        "X-Custom-Url": accessStore.openaiUrl,
                        "X-Custom-Token": accessStore.openaiApiKey,
                        Authorization: `Bearer ${accessStore.openaiApiKey}`,
                      };
                      const res = await fetch(`/api/openai/${OpenaiPath.ListModelPath}`, { headers: header });
                      const data = await res.json();
                      if (data?.data && Array.isArray(data.data)) {
                        const modelListStr = data.data.map((item) => `${item.id}=OpenAI`).join(",");
                        accessStore.update((access) => {
                          access.customModels = modelListStr;
                        });
                        showToast(Locale.Settings.ModelLoadSuccess);
                      } else {
                        throw new Error("No model data");
                      }
                    } catch (err){
                      console.error(err);
                      showToast(Locale.Settings.ModelLoadFail);
                    }
                  }}
                >
                  {Locale.Settings.FetchModels}
                </button>
              </ListItem>
            </>
          )}
          <ListItem
            title={Locale.Settings.Access.CustomModel.Title}
            subTitle={Locale.Settings.Access.CustomModel.SubTitle}
            vertical
          >
            <input
              style={{ width: "100%", maxWidth: "unset", textAlign: "left" }}
              type="text"
              value={config.customModels}
              placeholder="model1,model2,model3"
              onChange={(e) =>
                config.update(
                  (config) => (config.customModels = e.currentTarget.value)
                )
              }
            />
          </ListItem>
        </List>
        <List>
          <ModelConfigList
            modelConfig={config.modelConfig}
            updateConfig={(updater) => {
              const modelConfig = { ...config.modelConfig };
              updater(modelConfig);
              config.update((config) => (config.modelConfig = modelConfig));
            }}
          />
        </List>
      </div>
    </ErrorBoundary>
  );
}