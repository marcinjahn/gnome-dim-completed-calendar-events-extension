// @ts-nocheck

export function patchedReloadEvents() {
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
      style: isEventFinished(event) ? getPastEventStyle() : null,
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
}

function isEventFinished(event: Event) {
  return event.end < new Date();
}

function isEventOngoing(event: Event) {
  const now = new Date();

  return !isEventAllDay() && event.start <= now && now <= event.end;
}

function isEventAllDay(event: Event) {
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  return event.start === dayStart && eventEnd === dayEnd;
}

function getPastEventStyle() {
  return "text-decoration: line-through;";
}

interface Event {
  start: Date;
  end: Date;
}
