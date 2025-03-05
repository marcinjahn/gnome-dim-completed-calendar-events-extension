import Gio from "@gi-ts/gio2";

export const SettingsPath =
  "org.gnome.shell.extensions.dim-completed-calendar-events";

const StylePastDaysSetting = "style-past-days";
const StyleOngoingEventsSetting = "style-ongoing-events";
const HidePastEventsSetting = "hide-past-events";
const HidePastEventsGracePeriodSetting = "hide-past-events-grace-period";

export class SettingsManager {
  private settings: Gio.Settings;

  constructor(settings: Gio.Settings) {
    this.settings = settings;
  }

  getShouldStylePastDays(): boolean {
    return this.settings.get_boolean(StylePastDaysSetting);
  }

  getShouldStyleOngoingEvents(): boolean {
    return this.settings.get_boolean(StyleOngoingEventsSetting);
  }

  getShouldHidePastEvents(): boolean {
    return this.settings.get_boolean(HidePastEventsSetting);
  }

  getHidePastEventsGracePeriod(): number {
    return this.settings.get_int(HidePastEventsGracePeriodSetting);
  }

  setShouldStylePastDays(value: boolean) {
    this.settings.set_boolean(StylePastDaysSetting, value);
  }

  setShouldStyleOngoingEvents(value: boolean) {
    this.settings.set_boolean(StyleOngoingEventsSetting, value);
  }

  setShouldHidePastEvents(value: boolean) {
    this.settings.set_boolean(HidePastEventsSetting, value);
  }

  setHidePastEventsGracePeriod(value: number) {
    this.settings.set_int(HidePastEventsGracePeriodSetting, value);
  }

  connectToChanges(func: () => void): number {
    return this.settings.connect("changed", func);
  }

  disconnect(subscriptionId: number) {
    this.settings.disconnect(subscriptionId);
  }
}
