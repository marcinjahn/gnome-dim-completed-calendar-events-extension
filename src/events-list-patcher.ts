import { patchedReloadEvents } from "./new-reload-events";

export class EventsListPatcher {
  private originalFunction: () => void;

  constructor() {
    this.originalFunction = this.getEventsItem()._reloadEvents;
  }

  applyPatch() {
    const eventsItem = this.getEventsItem();
    eventsItem._reloadEvents = patchedReloadEvents.bind(eventsItem);
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
    const dateMenu = imports.ui.main.panel.statusArea.dateMenu;

    return dateMenu._eventsItem;
  }
}
