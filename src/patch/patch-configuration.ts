import { SettingsManager } from "settings-manager";

export interface PatchConfiguration {
  shouldStylePastDayEvents: boolean;
  shouldStyleOngoingEvents: boolean;
  shouldHidePastEvents: boolean;
  gracePeriod: number;
}

export function getPatchConfiguration(settings: SettingsManager) {
  return {
    shouldStylePastDayEvents: settings.getShouldStylePastDays(),
    shouldStyleOngoingEvents: settings.getShouldStyleOngoingEvents(),
    shouldHidePastEvents: settings.getShouldHidePastEvents(),
    gracePeriod: settings.getHidePastEventsGracePeriod(),
  };
}
