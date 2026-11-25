import React, { useState } from 'react';
import { Check, Layers, Plus, Sparkles } from 'lucide-react';
import { THALI_SLOTS } from '../data/restaurantData';
import { ThaliSlotItem } from '../types';

interface ThaliBuilderProps {
  onAddThaliToCart: (summary: string, price: number, isVeg: boolean) => void;
}

type SlotKey = keyof typeof THALI_SLOTS;

const SLOT_LABELS: { key: SlotKey; title: string }[] = [
  { key: 'dal', title: '1. Slow-Cooked Dal' },
  { key: 'curry', title: '2. Signature Curry' },
  { key: 'bread', title: '3. Clay Tandoor Breads' },
  { key: 'rice', title: '4. Aromatic Rice' },
  { key: 'dessert', title: '5. Warm Mithai' },
  { key: 'drink', title: '6. Kulhad Cooler' },
];

export const ThaliBuilder: React.FC<ThaliBuilderProps> = ({ onAddThaliToCart }) => {
  const [picks, setPicks] = useState<Record<SlotKey, ThaliSlotItem>>({
    dal: THALI_SLOTS.dal[0],
    curry: THALI_SLOTS.curry[1],
    bread: THALI_SLOTS.bread[0],
    rice: THALI_SLOTS.rice[0],
    dessert: THALI_SLOTS.dessert[0],
    drink: THALI_SLOTS.drink[0],
  });

  const isVeg = Object.values(picks).every((p) => p.isVeg);
  const alacarteSum = Object.values(picks).reduce((s, p) => s + p.alacartePrice, 0);
  const bundlePrice = isVeg ? 399 : 479;
  const savings = Math.max(0, alacarteSum - bundlePrice);
  const savingsPct = Math.round((savings / alacarteSum) * 100);

  const handleAdd = () => {
    const summary = Object.values(picks)
      .map((p) => p.name)
      .join(' · ');
    onAddThaliToCart(summary, bundlePrice, isVeg);
  };

  return (
    <section id="thali-builder" className="thali-section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">AOV Bundle Engineering · Customizer</span>
        </div>
        <h2 className="section-title">
          Build Your Own <em>Royal Thali</em>
        </h2>
        <p className="section-sub">
          Curate your personal 6-course brass-platter feast. Fixed bundle pricing unlocks up to 45%
          savings over à la carte ordering while elevating every meal into a complete experience.
        </p>

        <div className="thali-layout">
          <div className="thali-slots">
            {SLOT_LABELS.map(({ key, title }) => (
              <div key={key} className="thali-slot-box">
                <div className="thali-slot-hdr">
                  <span className="thali-slot-title">{title}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Choose 1</span>
                </div>
                <div className="thali-options-grid">
                  {THALI_SLOTS[key].map((opt) => {
                    const selected = picks[key].id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        className={`thali-opt ${selected ? 'selected' : ''}`}
                        onClick={() => setPicks((prev) => ({ ...prev, [key]: opt }))}
                      >
                        <div className="thali-opt-top">
                          <span className="thali-opt-name">{opt.name}</span>
                          <span className={`diet-mark ${opt.isVeg ? 'veg' : 'nonveg'}`} />
                        </div>
                        <div className="thali-opt-meta">
                          <span>{opt.tag}</span>
                          <span>À la carte ₹{opt.alacartePrice}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="thali-summary-card">
            <div className="thali-preview-img">
              <img
                src="/images/royal-thali.jpg"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&q=85';
                }}
                alt="Custom Royal Thali"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: isVeg ? '#4ade80' : '#fca5a5',
                }}
              >
                <span className={`diet-mark ${isVeg ? 'veg' : 'nonveg'}`} />
                {isVeg ? 'Pure Veg Royal Platter' : 'Shahi Non-Veg Platter'}
              </span>
              <span
                style={{
                  background: 'rgba(249,115,22,0.16)',
                  color: 'var(--saffron)',
                  padding: '3px 9px',
                  borderRadius: 2,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                Save {savingsPct}%
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 25,
                fontWeight: 900,
                marginTop: 8,
              }}
            >
              Your 6-Course Platter
            </h3>

            <ul className="thali-chosen-list">
              {SLOT_LABELS.map(({ key, title }) => (
                <li key={key}>
                  <span className="slot-lbl">{title.replace(/^\d+\.\s/, '')}</span>
                  <span style={{ fontWeight: 600, textAlign: 'right' }}>{picks[key].name}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'line-through' }}>
                  À la carte value: ₹{alacarteSum}
                </div>
                <div style={{ fontSize: 12, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Sparkles size={12} /> You save ₹{savings} on this bundle
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 36,
                  fontWeight: 900,
                  color: 'var(--gold)',
                }}
              >
                ₹{bundlePrice}
              </div>
            </div>

            <button
              className="btn-submit"
              onClick={handleAdd}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Plus size={16} /> Add Custom Thali to Cart · ₹{bundlePrice}
            </button>

            <div
              style={{
                marginTop: 12,
                fontSize: 11.5,
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Layers size={13} color="#fbbf24" />
              <Check size={13} color="#4ade80" /> Eligible for DIWALI30 &amp; VIKFREE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
