import { run } from "events-list-manager";

class Extension {
  private _uuid: string | null;

  constructor(uuid: string) {
    this._uuid = uuid;
  }

  enable() {
    log(`Enabling extension ${this._uuid}`);
    run();
  }

  disable() {
    log(`Disabling extension ${this._uuid}`);
  }
}

export default function (meta: { uuid: string }): Extension {
  return new Extension(meta.uuid);
}
