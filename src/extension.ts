import { EventsListPatcher } from "events-list-patcher";

class Extension {
  private _uuid: string | null;
  private patcher: EventsListPatcher | null;

  constructor(uuid: string) {
    this._uuid = uuid;
  }

  enable() {
    log(`Enabling extension ${this._uuid}`);

    this.patcher = new EventsListPatcher();
    this.patcher.applyPatch();
  }

  disable() {
    log(`Disabling extension ${this._uuid}`);

    this.patcher?.reversePatch();
    this.patcher = null;
  }
}

export default function (meta: { uuid: string }): Extension {
  return new Extension(meta.uuid);
}
