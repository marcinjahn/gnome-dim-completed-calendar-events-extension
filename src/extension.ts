import { Extension } from "gnomejs://extension.js";

import { SettingsManager, SettingsPath } from "settings-manager";
import { EventsListPatcher } from "./patch/events-list-patcher";
import { getPatchConfiguration } from "patch/patch-configuration";

export default class DimCompletedCalendarEventsExtension extends Extension {
  private _patcher: EventsListPatcher | null = null;
  private _settings: SettingsManager | null = null;
  private _settingsSubscription: number | null = null;

  enable() {
    log(`Enabling extension ${this.uuid}`);

    this._settings = new SettingsManager(this.getSettings(SettingsPath));

    this._patcher = new EventsListPatcher();
    this._patcher.applyPatch(getPatchConfiguration(this._settings));

    this._settingsSubscription = this._settings!.connectToChanges(() => {
      this._patcher?.applyPatch(getPatchConfiguration(this._settings!));
    });
  }

  disable() {
    log(`Disabling extension ${this.uuid}`);

    this._patcher?.reversePatch();
    this._patcher = null;

    if (this._settingsSubscription) {
      this._settings?.disconnect(this._settingsSubscription!);
      this._settingsSubscription = null;
    }

    this._settings = null;
  }
}
