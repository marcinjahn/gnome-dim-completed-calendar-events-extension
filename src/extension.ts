import { SettingsManager } from "settings-manager";
import { EventsListPatcher } from "./patch/events-list-patcher";
import { getPatchConfiguration } from "patch/patch-configuration";

class Extension {
  private _uuid: string | null = null;
  private _patcher: EventsListPatcher | null = null;
  private _settings: SettingsManager | null = null;
  private _settingsSubscription: number | null = null;

  constructor(uuid: string) {
    this._uuid = uuid;
  }

  enable() {
    log(`Enabling extension ${this._uuid}`);

    this._settings = new SettingsManager();

    this._patcher = new EventsListPatcher();
    this._patcher.applyPatch(getPatchConfiguration(this._settings));

    this._settingsSubscription = this._settings!.connectToChanges(() => {
      this._patcher?.applyPatch(getPatchConfiguration(this._settings!));
    });
  }

  disable() {
    log(`Disabling extension ${this._uuid}`);

    this._patcher?.reversePatch();
    this._patcher = null;

    if (this._settingsSubscription) {
      this._settings?.disconnect(this._settingsSubscription!);
      this._settingsSubscription = null;
    }

    this._settings?.dispose();
    this._settings = null;
  }
}

export default function (meta: { uuid: string }): Extension {
  return new Extension(meta.uuid);
}
