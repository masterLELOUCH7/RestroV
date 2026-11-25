import React, { useEffect, useState } from 'react';
import { Bike, CheckCircle2, ChefHat, Coins, Flame, X } from 'lucide-react';

interface LiveOrderTrackerModalProps {
  order: {
    orderId: string;
    total: number;
    coinsEarned: number;
    mode: 'delivery' | 'pickup';
  };
  onClose: () => void;
}

const STEPS_DELIVERY = [
  { label: 'Order Confirmed', sub: 'Sent straight to Dwarka Sector 10 kitchen POS', icon: CheckCircle2 },
  { label: 'Tandoor Firing', sub: 'Fresh breads & kebabs hitting glowing charcoal', icon: Flame },
  { label: 'Chef Plating & Seal', sub: 'Tamper-proof thermal brass-foil packaging', icon: ChefHat },
  { label: 'Rider En Route', sub: 'Express 45-min dispatch within 5 km', icon: Bike },
];

export const LiveOrderTrackerModal: React.FC<LiveOrderTrackerModalProps> = ({ order, onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1600);
    const t2 = setTimeout(() => setStep(2), 3400);
    const t3 = setTimeout(() => setStep(3), 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 10, color: '#4ade80', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
              Live Kitchen Telemetry
            </span>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900 }}>
              Order #{order.orderId}
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
            background: 'rgba(251, 191, 36, 0.08)',
            border: '1px solid var(--border-bright)',
            borderRadius: 4,
            padding: '12px 14px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 13 }}>
            Paid Direct: <strong style={{ color: 'var(--gold)' }}>₹{order.total}</strong> ({order.mode})
          </span>
          <span style={{ fontSize: 12, color: '#fde68a', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Coins size={14} /> +{order.coinsEarned} Spice Coins Added
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
          {STEPS_DELIVERY.map((s, idx) => {
            const Icon = s.icon;
            const active = idx <= step;
            return (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: 12,
                  borderRadius: 4,
                  border: active ? '1px solid rgba(249,115,22,0.45)' : '1px solid var(--border)',
                  background: active ? 'rgba(249,115,22,0.1)' : 'var(--surface)',
                  opacity: active ? 1 : 0.45,
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: active ? 'var(--saffron)' : 'var(--card)',
                    color: active ? '#060608' : 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn-submit" onClick={onClose}>
          Continue Exploring Menu
        </button>
      </div>
    </div>
  );
};
