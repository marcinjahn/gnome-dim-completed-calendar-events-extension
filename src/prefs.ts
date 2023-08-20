import { ExtensionPreferences } from "gnomejs://prefs.js";

import Adw from "@gi-ts/adw1";
import Gtk from "@gi-ts/gtk4";

import { SettingsManager, SettingsPath } from "./settings-manager";

export default class Preferences extends ExtensionPreferences {
  fillPreferencesWindow(window: Adw.PreferencesWindow) {
    const page = new Adw.PreferencesPage();
    window.add(page);

    let settings = new SettingsManager(this.getSettings(SettingsPath));

    this.setupPastEventsSettings(page, settings);
    this.setupOngoingEventsSettings(page, settings);
  }

  setupPastEventsSettings(
    page: Adw.PreferencesPage,
    settings: SettingsManager
  ) {
    const group = new Adw.PreferencesGroup({
      title: "Past Events",
      description: "Settings related to events that are over",
    });

    const row = new Adw.ActionRow({
      title: "Style events in past days as well",
      subtitle:
        "When viewing past days in the panel, the events will be greyed out",
    });

    const toggle = new Gtk.Switch({
      active: settings.getShouldStylePastDays(),
      valign: Gtk.Align.CENTER,
    });

    toggle.connect("state-set", (_, state) => {
      settings.setShouldStylePastDays(state);

      return false;
    });

    row.add_suffix(toggle);
    row.activatable_widget = toggle;

    group.add(row);
    page.add(group);
  }

  setupOngoingEventsSettings(
    page: Adw.PreferencesPage,
    settings: SettingsManager
  ) {
    const group = new Adw.PreferencesGroup({
      title: "Ongoing Events",
      description: "Settings related to events that are ongoing",
    });

    const row = new Adw.ActionRow({
      title: "Highlight ongoing events",
      subtitle: "Will color events that are ongoing with system accent color",
    });

    const toggle = new Gtk.Switch({
      active: settings.getShouldStylePastDays(),
      valign: Gtk.Align.CENTER,
    });

    toggle.connect("state-set", (_, state) => {
      settings.setShouldStyleOngoingEvents(state);

      return false;
    });

    row.add_suffix(toggle);
    row.activatable_widget = toggle;

    group.add(row);
    page.add(group);
  }
}
