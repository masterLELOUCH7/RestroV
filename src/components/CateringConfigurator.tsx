import React, { useState } from 'react';
import { Check, Sparkles, Users } from 'lucide-react';
import { CATERING_ADDONS, CATERING_TIERS } from '../data/restaurantData';

interface CateringConfiguratorProps {
  onBookDeposit: (summary: string, depositAmount: number) => void;
  onRequestQuote: (summary: string) => void;
}

export const CateringConfigurator: React.FC<CateringConfiguratorProps> = ({
  onBookDeposit,
  onRequestQuote,
}) => {
  const [guests, setGuests] = useState(50);
  const [eventType, setEventType] = useState('Corporate Offsite / Team Lunch');
  const [tierId, setTierId] = useState('gold');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['live-chaat']);

  const tier = CATERING_TIERS.find((t) => t.id === tierId) || CATERING_TIERS[1];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const basePlateCost = guests * tier.pricePerPlate;
  const addonsCost = selectedAddons.reduce((sum, id) => {
    const addon = CATERING_ADDONS.find((a) => a.id === id);
    if (!addon) return sum;
    return sum + (addon.unit === 'flat' ? addon.price : addon.price * guests);
  }, 0);

  const estimatedTotal = basePlateCost + addonsCost;
  const depositAmount = Math.round(estimatedTotal * 0.2);

  const buildSummary = () =>
    `${eventType} · ${guests} Guests · ${tier.name}${
      selectedAddons.length ? ` + ${selectedAddons.length} Live Station(s)` : ''
    }`;

  return (
    <section id="catering" className="catering-section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">High-Ticket B2B &amp; Events Engine</span>
        </div>
        <h2 className="section-title">
          Instant Banquet &amp; <em>Catering Estimator</em>
        </h2>
        <p className="section-sub">
          Transparent self-serve event pricing for Dwarka weddings, house parties, and corporate
          lunches. Configure your spread and lock your date in seconds.
        </p>

        <div className="catering-grid">
          <div>
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 5,
                padding: 22,
                marginBottom: 18,
              }}
            >
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Event Type</label>
                  <select
                    className="form-input"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option>Corporate Offsite / Team Lunch</option>
                    <option>Birthday / Anniversary Soirée</option>
                    <option>Mehendi / Sangeet Feast</option>
                    <option>Housewarming / Puja Satvik</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    Guest Count: <strong style={{ color: '#fbbf24' }}>{guests} Guests</strong>
                  </label>
                  <input
                    type="range"
                    min={15}
                    max={300}
                    step={5}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f97316', marginTop: 12 }}
                  />
                </div>
              </div>
            </div>

            <div className="tier-cards">
              {CATERING_TIERS.map((t) => {
                const active = t.id === tierId;
                return (
                  <button
                    key={t.id}
                    className={`tier-card ${active ? 'selected' : ''}`}
                    onClick={() => setTierId(t.id)}
                  >
                    <div style={{ fontSize: 11, color: 'var(--saffron)', fontWeight: 700, letterSpacing: 1 }}>
                      ₹{t.pricePerPlate} / plate
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5 }}>
                      {t.courses}
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 5,
                padding: 20,
              }}
            >
              <div className="form-label" style={{ marginBottom: 12 }}>
                Optional Live Culinary Stations
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CATERING_ADDONS.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 14px',
                        borderRadius: 4,
                        border: checked ? '1px solid var(--saffron)' : '1px solid var(--border)',
                        background: checked ? 'rgba(249,115,22,0.12)' : 'var(--surface)',
                        color: '#fff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13.5 }}>
                          {checked ? '✓ ' : '+ '}
                          {addon.name}
                        </div>
                        <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{addon.desc}</div>
                      </div>
                      <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap' }}>
                        ₹{addon.price.toLocaleString()} {addon.unit === 'per-guest' ? '/ guest' : 'flat'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(160deg, #17151c 0%, #0f0f14 100%)',
              border: '1px solid var(--border-bright)',
              borderRadius: 6,
              padding: 28,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: 'var(--saffron)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Live Event Quote
              </span>
              <span style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Users size={13} color="#fbbf24" /> {guests} Guests
              </span>
            </div>

            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 900 }}>
              {tier.name}
            </h3>
            <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>{eventType}</p>

            <div
              style={{
                margin: '18px 0',
                padding: '14px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontSize: 13,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>
                  Base Plates ({guests} × ₹{tier.pricePerPlate})
                </span>
                <span>₹{basePlateCost.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>
                  Live Stations ({selectedAddons.length} selected)
                </span>
                <span>₹{addonsCost.toLocaleString()}</span>
              </div>
              {tier.highlights.map((h, i) => (
                <div key={i} style={{ fontSize: 12, color: '#86efac', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={13} /> {h}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Estimated Event Total
                </div>
                <div style={{ fontSize: 12, color: 'var(--gold-light)' }}>
                  Effective: ₹{Math.round(estimatedTotal / guests)} / guest
                </div>
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 900, color: 'var(--gold)' }}>
                ₹{estimatedTotal.toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="btn-submit"
                onClick={() => onBookDeposit(buildSummary(), depositAmount)}
              >
                <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} />
                Lock Date with 20% Deposit (₹{depositAmount.toLocaleString()})
              </button>
              <button
                className="btn-outline"
                style={{ justifyContent: 'center', width: '100%' }}
                onClick={() => onRequestQuote(buildSummary())}
              >
                Send Proposal to Event Concierge
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
