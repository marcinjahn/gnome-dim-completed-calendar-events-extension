// @ts-nocheck

import { PatchConfiguration } from "./patch-configuration";

export function buildPatchedReloadEventsFunction(
  patchConfiguration: PatchConfiguration
) {
  return function newReloadEvents() {
    if (this._eventSource.isLoading || this._reloading) return;

    this._reloading = true;

    [...this._eventsList].forEach((c) => c.destroy());

    const events = this._eventSource.getEvents(this._startDate, this._endDate);

    for (let event of events) {
      const box = new imports.gi.St.BoxLayout({
        style_class: "event-box",
        vertical: true,
      });

      // MODIFICATIONS
      const summaryLabel = new imports.gi.St.Label({
        text: event.summary,
        style_class: "event-summary",
        style: isPastEvent(event, patchConfiguration.shouldStylePastEvents)
          ? getPastEventStyle()
          : isOngoingEvent(event, patchConfiguration.shouldStyleOngoingEvents)
          ? getOngoingEventStyle()
          : null,
      });

      box.add(summaryLabel);
      // END MODIFICATIONS

      box.add(
        new imports.gi.St.Label({
          text: this._formatEventTime(event),
          style_class: "event-time",
        })
      );
      this._eventsList.add_child(box);
    }

    if (this._eventsList.get_n_children() === 0) {
      const placeholder = new imports.gi.St.Label({
        text: _("No Events"),
        style_class: "event-placeholder",
      });
      this._eventsList.add_child(placeholder);
    }

    this._reloading = false;
    this._sync();
  };
}

function isPastEvent(event: Event, shouldStylePastDays: boolean) {
  const isFinished = event.end < new Date();
  log(Object.keys(event));
  if (shouldStylePastDays) {
    return isFinished;
  }

  const startedInSomePastDay =
    new Date(event.date.getTime()).setHours(0, 0, 0, 0) <
    new Date().setHours(0, 0, 0, 0);

  return isFinished && !startedInSomePastDay;
}

function isOngoingEvent(event: Event, shouldStyleOngoingEvents: boolean) {
  const now = new Date();

  return shouldStyleOngoingEvents && event.date <= now && now <= event.end;
}

function isEventAllDay(event: Event) {
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  return event.date === dayStart && event.end === dayEnd;
}

function getPastEventStyle() {
  return "color: #9a9996"; // same grey as event time
}

function getOngoingEventStyle() {
  return "color: #78aeed;"; // Gnome Accent Color
}

interface Event {
  start: Date;
  end: Date;
}
