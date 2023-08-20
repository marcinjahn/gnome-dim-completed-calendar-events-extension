import * as Main from "gnomejs://main.js";

import { PatchConfiguration } from "./patch-configuration";
import { buildPatchedReloadEventsFunction } from "./new-reload-events";

export class EventsListPatcher {
  private originalFunction: () => void;

  constructor() {
    this.originalFunction = this.getEventsItem()._reloadEvents;
  }

  applyPatch(patchConfiguration: PatchConfiguration) {
    const eventsItem = this.getEventsItem();
    eventsItem._reloadEvents =
      buildPatchedReloadEventsFunction(patchConfiguration).bind(eventsItem);
  }

  reversePatch() {
    const eventsItem = this.getEventsItem();
    eventsItem._reloadEvents = this.originalFunction;
  }

  private getOriginalFunction() {
    const eventsItem = this.getEventsItem();

    return eventsItem._reloadEvents;
  }

  private getEventsItem() {
    const dateMenu = Main.panel.statusArea.dateMenu;

    return dateMenu._eventsItem;
  }
}
