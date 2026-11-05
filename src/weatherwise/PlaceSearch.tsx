'use client';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { completePlace, placeLabel, searchPlaces, type Place } from './places';

type Props = {
  /** Text in the field. */
  text: string;
  onTextChange: (text: string) => void;
  /** Called with a fully resolved place (town filled in). */
  onSelect: (place: Place) => void;
  /** Enter pressed with no suggestion highlighted. */
  onSubmitText?: () => void;
  onBlur?: () => void;
  id?: string;
  ariaLabel?: string;
  placeholder?: string;
  inputClassName?: string;
};

function PlaceIcon({ kind }: { kind: Place['kind'] }) {
  return kind === 'college'
    ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /><path d="M22 9v6" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
}

/** Search field that suggests colleges and towns while typing. */
export default function PlaceSearch({ text, onTextChange, onSelect, onSubmitText, onBlur, id, ariaLabel, placeholder, inputClassName = '' }: Props) {
  const listId = useId();
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [picking, setPicking] = useState(false);
  const typed = useRef(false);
  const pickController = useRef<AbortController | null>(null);

  useEffect(() => {
    // Only search for what the person types, not for text set after a pick.
    if (!typed.current || text.trim().length < 2) { setSuggestions([]); setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      searchPlaces(text, controller.signal)
        .then(results => { if (!controller.signal.aborted) { setSuggestions(results); setActive(results.length ? 0 : -1); } })
        .catch(() => {})
        .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, 280);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [text]);

  useEffect(() => () => pickController.current?.abort(), []);

  const pick = async (place: Place) => {
    typed.current = false;
    setOpen(false);
    setSuggestions([]);
    onTextChange(placeLabel(place));
    pickController.current?.abort();
    const controller = new AbortController();
    pickController.current = controller;
    setPicking(true);
    try {
      const complete = await completePlace(place, controller.signal);
      if (!controller.signal.aborted) onSelect(complete);
    } finally {
      if (!controller.signal.aborted) setPicking(false);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const visible = open && suggestions.length > 0;
    if (event.key === 'ArrowDown' && suggestions.length) { event.preventDefault(); setOpen(true); setActive(i => (i + 1) % suggestions.length); }
    else if (event.key === 'ArrowUp' && visible) { event.preventDefault(); setActive(i => (i <= 0 ? suggestions.length - 1 : i - 1)); }
    else if (event.key === 'Escape') setOpen(false);
    else if (event.key === 'Enter') {
      event.preventDefault();
      if (visible && active >= 0) pick(suggestions[active]);
      else onSubmitText?.();
    }
  };

  const showList = open && typed.current && text.trim().length >= 2 && (suggestions.length > 0 || !loading);
  return (
    <div className="place-search">
      <input
        id={id}
        value={text}
        aria-label={ariaLabel}
        placeholder={placeholder}
        className={inputClassName}
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
        aria-busy={loading || picking}
        onChange={e => { typed.current = true; setOpen(true); if (e.target.value.trim().length >= 2) setLoading(true); onTextChange(e.target.value); }}
        onFocus={() => { if (typed.current) setOpen(true); }}
        onBlur={() => { setTimeout(() => setOpen(false), 120); onBlur?.(); }}
        onKeyDown={onKeyDown}
      />
      {(loading || picking) && <span className="place-search-spinner" aria-hidden="true" />}
      {showList && (
        <ul className="place-suggestions" id={listId} role="listbox" aria-label="Suggested colleges and towns">
          {suggestions.length ? suggestions.map((place, i) => (
            <li
              key={`${place.kind}-${place.name}-${place.coordinates.latitude}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? 'is-active' : ''}
              onMouseDown={e => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(place)}
            >
              <span className={`place-suggestion-icon is-${place.kind}`}><PlaceIcon kind={place.kind} /></span>
              <span className="place-suggestion-text">
                <strong>{placeLabel(place)}</strong>
                <small>{place.kind === 'college' ? place.detail || 'College campus' : place.detail}</small>
              </span>
            </li>
          )) : <li className="place-suggestions-empty" role="option" aria-selected={false} aria-disabled="true">No matches yet. Try the full college name or “Town, State”.</li>}
        </ul>
      )}
    </div>
  );
}
