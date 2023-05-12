import { SettingsManager } from "settings-manager";

export interface PatchConfiguration {
  shouldStylePastEvents: boolean;
  shouldStyleOngoingEvents: boolean;
}

export function getPatchConfiguration(settings: SettingsManager) {
  return {
    shouldStylePastEvents: settings.getShouldStylePastDays(),
    shouldStyleOngoingEvents: settings.getShouldStyleOngoingEvents(),
  };
}
