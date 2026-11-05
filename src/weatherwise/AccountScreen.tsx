'use client';
import { useState, type FormEvent } from 'react';
import WeatherWiseLogo from './WeatherWiseLogo';
import type { AccountView } from './account';
import { logIn, signUp } from '../app/(frontend)/account-actions';

type Mode = 'create' | 'login';

type Props = {
  account: AccountView | null;
  place: { town: string; college?: string; latitude?: number; longitude?: number };
  onBack: () => void;
  onContinue: () => void;
  onAuthenticated: (account: AccountView, mode: Mode) => void;
  onLogout: () => void;
};

export default function AccountScreen({ account, place, onBack, onContinue, onAuthenticated, onLogout }: Props) {
  const [mode, setMode] = useState<Mode>('create');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '');
    setPending(true);
    setError('');
    try {
      const result = mode === 'create'
        ? await signUp({ firstName: value('firstName'), lastName: value('lastName'), preferredName: value('preferredName'), email: value('email'), password: value('password'), ...place })
        : await logIn(value('email'), value('password'));
      if (result.ok) onAuthenticated(result.account, mode);
      else setError(result.error);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="location screen account-screen">
      <header>
        <div className="flex justify-between items-center gap-3"><WeatherWiseLogo /><span>02 / 04</span></div>
        <div className="progress"><i /><i className="is-done" /><i /><i /></div>
      </header>
      <button type="button" className="account-back" onClick={onBack}>← Back</button>

      {account ? (
        <>
          <section>
            <h1>You’re signed in,<br />{account.preferredName}.</h1>
            <p>Your location, comfort settings, and wardrobe will stay saved to this account until you log out.</p>
          </section>
          <div className="account-signed-in">
            <span aria-hidden="true">{account.preferredName.slice(0, 1).toUpperCase()}</span>
            <div><strong>{account.firstName} {account.lastName}</strong><small>{account.email}</small></div>
          </div>
          <button type="button" className="primary" onClick={onContinue}>Continue →</button>
          <button type="button" className="account-switch" onClick={onLogout}>Not you? Log out</button>
        </>
      ) : (
        <>
          <section>
            <h1>{mode === 'create' ? <>Make WeatherWise<br />yours.</> : <>Welcome back.</>}</h1>
            <p>{mode === 'create' ? 'Create an account so your forecast, comfort settings, and wardrobe are ready every time you open the app.' : 'Log in to pick up right where you left off.'}</p>
          </section>

          <div className="account-tabs" role="tablist" aria-label="Account">
            {(['create', 'login'] as const).map((value) => (
              <button key={value} type="button" role="tab" aria-selected={mode === value} className={mode === value ? 'is-active' : ''} onClick={() => { setMode(value); setError(''); }}>
                {value === 'create' ? 'Create account' : 'Log in'}
              </button>
            ))}
          </div>

          <form className="account-form" onSubmit={submit} key={mode}>
            {mode === 'create' && (
              <>
                <div className="account-row">
                  <label className="town-label">First name<div className="town-input"><input name="firstName" autoComplete="given-name" required /></div></label>
                  <label className="town-label">Last name<div className="town-input"><input name="lastName" autoComplete="family-name" required /></div></label>
                </div>
                <label className="town-label">What should we call you?<div className="town-input"><input name="preferredName" autoComplete="nickname" placeholder="e.g. Sam" required /></div><small>This is the name we’ll greet you with on your home screen.</small></label>
              </>
            )}
            <label className="town-label">Email<div className="town-input"><input name="email" type="email" autoComplete="email" required /></div></label>
            <label className="town-label">Password<div className="town-input"><input name="password" type="password" autoComplete={mode === 'create' ? 'new-password' : 'current-password'} minLength={mode === 'create' ? 8 : undefined} required /></div>{mode === 'create' && <small>At least 8 characters.</small>}</label>
            {error && <p role="alert" className="account-error">{error}</p>}
            <button type="submit" className="primary" disabled={pending}>{pending ? 'One moment…' : mode === 'create' ? 'Create account →' : 'Log in →'}</button>
          </form>
        </>
      )}
    </main>
  );
}
