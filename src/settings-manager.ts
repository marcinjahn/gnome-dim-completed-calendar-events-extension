import Gio from "@gi-ts/gio2";

export const SettingsPath =
  "org.gnome.shell.extensions.dim-completed-calendar-events";

const StylePastDaysSetting = "style-past-days";
const StyleOngoingEventsSetting = "style-ongoing-events";
const HidePastEventsSetting = "hide-past-events";

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

  setShouldStylePastDays(value: boolean) {
    this.settings.set_boolean(StylePastDaysSetting, value);
  }

  setShouldStyleOngoingEvents(value: boolean) {
    this.settings.set_boolean(StyleOngoingEventsSetting, value);
  }

  setShouldHidePastEvents(value: boolean) {
    this.settings.set_boolean(HidePastEventsSetting, value);
  }

  connectToChanges(func: () => void): number {
    return this.settings.connect("changed", func);
  }

  disconnect(subscriptionId: number) {
    this.settings.disconnect(subscriptionId);
  }
}
