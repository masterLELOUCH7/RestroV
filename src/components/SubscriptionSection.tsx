import React, { useState } from 'react';
import { Check, Repeat, Sparkles } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/restaurantData';
import { SubscriptionPlan } from '../types';

interface SubscriptionSectionProps {
  onSubscribe: (plan: SubscriptionPlan, cycle: 'weekly' | 'monthly', price: number) => void;
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ onSubscribe }) => {
  const [cycle, setCycle] = useState<'weekly' | 'monthly'>('monthly');

  return (
    <section id="subscriptions" className="subs-section">
      <div className="container">
        <div className="subs-header-row">
          <div>
            <div className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Recurring Revenue Model · Zero Waste</span>
            </div>
            <h2 className="section-title">
              Royal Tiffin &amp; <em>Meal Subscriptions</em>
            </h2>
            <p className="section-sub">
              Predictable home-style nutrition for Dwarka professionals, fitness enthusiasts, and
              families — cooked fresh every morning with 1-click pause flexibility.
            </p>
          </div>

          <div className="billing-switch">
            <button
              className={`billing-btn ${cycle === 'weekly' ? 'active' : ''}`}
              onClick={() => setCycle('weekly')}
            >
              Weekly Pass
            </button>
            <button
              className={`billing-btn ${cycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setCycle('monthly')}
            >
              Monthly (Save 12%)
            </button>
          </div>
        </div>

        <div className="subs-grid">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const activePrice = cycle === 'weekly' ? plan.weeklyPrice : plan.monthlyPrice;
            const savingsVsRetail =
              cycle === 'monthly'
                ? plan.retailValue - plan.monthlyPrice
                : Math.round((plan.retailValue / 4) - plan.weeklyPrice);

            return (
              <div key={plan.id} className={`sub-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="sub-pop-tag">Most Popular</div>}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--saffron)', fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                    {plan.audience}
                  </span>
                  <span className={`diet-mark ${plan.isVegOption ? 'veg' : 'nonveg'}`} />
                </div>

                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 24,
                    fontWeight: 900,
                    marginTop: 8,
                  }}
                >
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{plan.tagline}</p>

                <div className="sub-price-row">
                  <span className="sub-price">₹{activePrice.toLocaleString()}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    / {cycle === 'weekly' ? 'week' : 'month'}
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Sparkles size={12} /> Save ₹{Math.max(250, savingsVsRetail).toLocaleString()} vs à la carte
                </div>

                <ul className="sub-features">
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <Check size={15} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '10px 12px',
                    marginBottom: 18,
                  }}
                >
                  <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
                    Sample Rotating Menu
                  </div>
                  {plan.sampleMenu.map((m, idx) => (
                    <div key={idx} style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5 }}>
                      • {m}
                    </div>
                  ))}
                </div>

                <button
                  className="btn-submit"
                  onClick={() => onSubscribe(plan, cycle, activePrice)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  <Repeat size={14} /> Add {cycle === 'weekly' ? 'Weekly' : 'Monthly'} Plan to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
