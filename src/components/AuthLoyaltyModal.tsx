import React, { useState } from 'react';
import { Award, Coins, Heart, X } from 'lucide-react';
import { DISHES } from '../data/restaurantData';
import { ReservationRecord } from '../types';

interface AuthLoyaltyModalProps {
  onClose: () => void;
  userName: string | null;
  spiceCoins: number;
  wishlist: number[];
  reservations: ReservationRecord[];
  onSignIn: (name: string) => void;
}

export const AuthLoyaltyModal: React.FC<AuthLoyaltyModalProps> = ({
  onClose,
  userName,
  spiceCoins,
  wishlist,
  reservations,
  onSignIn,
}) => {
  const [tab, setTab] = useState<'account' | 'saved'>('account');
  const [nameInput, setNameInput] = useState(userName || '');
  const [emailInput, setEmailInput] = useState('');

  const savedDishes = DISHES.filter((d) => wishlist.includes(d.id));

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(nameInput.trim() || 'Vikram VIP Guest');
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <span style={{ fontSize: 10, color: 'var(--saffron)', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
              Vikram&apos;s Inner Circle
            </span>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 25, fontWeight: 900 }}>
              {userName ? `Welcome, ${userName}` : 'Join Loyalty Club'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              width: 34,
              height: 34,
              borderRadius: 3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.14), rgba(251,191,36,0.06))',
            border: '1px solid var(--border-bright)',
            borderRadius: 4,
            marginBottom: 18,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Coins size={22} color="#fbbf24" />
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>Spice Coins Balance</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)' }}>
                {spiceCoins} Coins (₹{spiceCoins} value)
              </div>
            </div>
          </div>
          <span style={{ fontSize: 11, color: 'var(--gold-light)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Award size={13} /> Gold Tier
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            background: 'var(--surface)',
            padding: 4,
            borderRadius: 4,
            marginBottom: 18,
          }}
        >
          <button
            onClick={() => setTab('account')}
            style={{
              padding: 9,
              border: 'none',
              borderRadius: 3,
              background: tab === 'account' ? 'var(--saffron)' : 'transparent',
              color: tab === 'account' ? '#060608' : 'var(--muted)',
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Profile &amp; Bookings ({reservations.length})
          </button>
          <button
            onClick={() => setTab('saved')}
            style={{
              padding: 9,
              border: 'none',
              borderRadius: 3,
              background: tab === 'saved' ? 'var(--saffron)' : 'transparent',
              color: tab === 'saved' ? '#060608' : 'var(--muted)',
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Favourites ({savedDishes.length})
          </button>
        </div>

        {tab === 'account' ? (
          <>
            <form onSubmit={handleJoin} style={{ marginBottom: 18 }}>
              <div className="form-group">
                <label className="form-label">Guest Name</label>
                <input
                  className="form-input"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email for Direct VIP Perks</label>
                <input
                  className="form-input"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <button type="submit" className="btn-submit">
                {userName ? 'Update VIP Profile' : 'Activate VIP Member Pass'}
              </button>
            </form>

            {reservations.length > 0 && (
              <div>
                <div className="form-label">Your Saved Table Passes</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {reservations.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        padding: '10px 12px',
                        borderRadius: 3,
                        fontSize: 12,
                      }}
                    >
                      <strong style={{ color: 'var(--gold)' }}>{r.id}</strong> · {r.tableLabel} · {r.date} at {r.time}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {savedDishes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: 'var(--muted)', fontSize: 13 }}>
                <Heart size={28} style={{ opacity: 0.4, marginBottom: 8 }} />
                <div>Tap the heart icon on any dish to save it here.</div>
              </div>
            ) : (
              savedDishes.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 10,
                    background: 'var(--surface)',
                    borderRadius: 4,
                    border: '1px solid var(--border)',
                  }}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    style={{ width: 48, height: 48, borderRadius: 3, objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--gold)' }}>₹{d.price}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
