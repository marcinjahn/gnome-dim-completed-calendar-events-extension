import { Settings } from "@gi-types/gio2";

const ExtensionUtils = imports.misc.extensionUtils;

const SettingsPath = "org.gnome.shell.extensions.mark-past-calendar-events";

const StylePastDaysSetting = "style-past-days";
const StyleOngoingEventsSetting = "style-ongoing-events";

export class SettingsManager {
  private settings: Settings | null = null;

  private getSettings(): Settings {
    if (!this.settings) {
      this.settings = ExtensionUtils.getSettings(SettingsPath);
    }

    return this.settings;
  }

  getShouldStylePastDays(): boolean {
    return this.getSettings().get_boolean(StylePastDaysSetting);
  }

  getShouldStyleOngoingEvents(): boolean {
    return this.getSettings().get_boolean(StyleOngoingEventsSetting);
  }

  setShouldStylePastDays(value: boolean) {
    this.getSettings().set_boolean(StylePastDaysSetting, value);
  }

  setShouldStyleOngoingEvents(value: boolean) {
    this.getSettings().set_boolean(StyleOngoingEventsSetting, value);
  }

  connectToChanges(func: () => void): number {
    return this.getSettings().connect("changed", func);
  }

  disconnect(subscriptionId: number) {
    this.getSettings().disconnect(subscriptionId);
  }

  dispose() {
    this.settings = null;
  }
}
