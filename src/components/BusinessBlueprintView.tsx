import React, { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { BUSINESS_MODELS } from '../data/restaurantData';

interface BusinessBlueprintViewProps {
  onBackToSite: () => void;
  onJumpToTouchpoint: (sectionId: string) => void;
}

export const BusinessBlueprintView: React.FC<BusinessBlueprintViewProps> = ({
  onBackToSite,
  onJumpToTouchpoint,
}) => {
  const [monthlyOrders, setMonthlyOrders] = useState(1400);
  const [directSharePct, setDirectSharePct] = useState(65);
  const [avgOrderValue, setAvgOrderValue] = useState(720);
  const [tiffinSubscribers, setTiffinSubscribers] = useState(85);
  const [monthlyEvents, setMonthlyEvents] = useState(6);

  const directOrders = Math.round((monthlyOrders * directSharePct) / 100);
  const aggregatorOrders = monthlyOrders - directOrders;

  const directRev = directOrders * avgOrderValue;
  const aggregatorRev = aggregatorOrders * avgOrderValue;
  const aggregatorFeeRate = 0.25;
  const commissionSavedMonthly = Math.round(directRev * aggregatorFeeRate);

  const tiffinMRR = tiffinSubscribers * 5200;
  const cateringRev = monthlyEvents * 46000;
  const dineInRev = 920000; // Dwarka 62-cover flagship baseline

  const totalMonthlyRev = directRev + aggregatorRev + tiffinMRR + cateringRev + dineInRev;
  const netContribution = Math.round(
    directRev * 0.68 +
      aggregatorRev * 0.43 +
      tiffinMRR * 0.62 +
      cateringRev * 0.58 +
      dineInRev * 0.72
  );
  const blendedMarginPct = Math.round((netContribution / totalMonthlyRev) * 100);

  const touchpointMap: Record<string, string> = {
    'd2c-ordering': 'menu',
    'experiential-floorplan': 'reservation',
    'recurring-tiffin': 'subscriptions',
    'b2b-catering': 'catering',
    'dynamic-yield-bundles': 'thali-builder',
  };

  return (
    <div className="ba-hub container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
          marginBottom: 24,
        }}
      >
        <button className="btn-outline" onClick={onBackToSite}>
          <ArrowLeft size={15} /> Back to Guest Website
        </button>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--gold)',
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid var(--border-bright)',
            padding: '7px 14px',
            borderRadius: 3,
          }}
        >
          <Briefcase size={13} style={{ display: 'inline', marginRight: 6 }} />
          20-Year BA + UX Architecture Blueprint
        </span>
      </div>

      <div className="eyebrow">
        <div className="eyebrow-line" />
        <span className="eyebrow-text">Multi-Model Hospitality Strategy</span>
      </div>
      <h1 className="section-title">
        How Chef Vik Restro Turns <em>One Kitchen Into 5 Revenue Engines</em>
      </h1>
      <p className="section-sub">
        Single-channel restaurants fail from 25% delivery commissions and mid-week empty seats.
        Below is the live commercial architecture embedded across this website — plus an interactive
        unit-economics simulator.
      </p>

      {/* Interactive Revenue Simulator */}
      <div className="ba-sim-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <BarChart3 size={18} color="#f97316" />
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 900 }}>
              Live Unit-Economics Simulator
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                <span>Monthly Delivery Orders</span>
                <strong style={{ color: 'var(--gold)' }}>{monthlyOrders.toLocaleString()} orders</strong>
              </div>
              <input
                type="range"
                min={400}
                max={3500}
                step={50}
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f97316' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                <span>Direct D2C Share (vs Aggregators)</span>
                <strong style={{ color: '#4ade80' }}>{directSharePct}% Direct</strong>
              </div>
              <input
                type="range"
                min={10}
                max={95}
                step={5}
                value={directSharePct}
                onChange={(e) => setDirectSharePct(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#22c55e' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                <span>Average Direct Order Value (Thali Lift)</span>
                <strong style={{ color: 'var(--gold)' }}>₹{avgOrderValue}</strong>
              </div>
              <input
                type="range"
                min={350}
                max={1400}
                step={25}
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#fbbf24' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                <span>Active Tiffin Subscribers (MRR)</span>
                <strong style={{ color: 'var(--gold)' }}>{tiffinSubscribers} active plans</strong>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={tiffinSubscribers}
                onChange={(e) => setTiffinSubscribers(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f97316' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                <span>Monthly Catering &amp; Banquet Events</span>
                <strong style={{ color: 'var(--gold)' }}>{monthlyEvents} events / mo</strong>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={monthlyEvents}
                onChange={(e) => setMonthlyEvents(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#fbbf24' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 16, borderRadius: 4 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Projected Monthly Revenue
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 900, color: 'var(--gold)', marginTop: 4 }}>
                ₹{(totalMonthlyRev / 100000).toFixed(2)}L
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                ₹{((totalMonthlyRev * 12) / 10000000).toFixed(2)} Cr Annualized
              </div>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid rgba(34,197,94,0.3)', padding: 16, borderRadius: 4 }}>
              <div style={{ fontSize: 11, color: '#86efac', textTransform: 'uppercase', letterSpacing: 1 }}>
                Aggregator Fees Saved
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 900, color: '#4ade80', marginTop: 4 }}>
                ₹{(commissionSavedMonthly / 100000).toFixed(2)}L
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                Kept in-house every month
              </div>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 16, borderRadius: 4 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Gross Contribution Profit
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: '#fff', marginTop: 4 }}>
                ₹{(netContribution / 100000).toFixed(2)}L
              </div>
              <div style={{ fontSize: 11, color: 'var(--gold-light)' }}>
                Blended {blendedMarginPct}% margin
              </div>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 16, borderRadius: 4 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Predictable Tiffin MRR
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: 'var(--saffron)', marginTop: 4 }}>
                ₹{(tiffinMRR / 100000).toFixed(2)}L
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                Pre-sold before kitchen opens
              </div>
            </div>
          </div>

          {/* Revenue Mix Bar */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 16, borderRadius: 4 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 10 }}>
              Channel Revenue Mix Breakdown
            </div>
            <div style={{ display: 'flex', height: 14, borderRadius: 99, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ width: `${(directRev / totalMonthlyRev) * 100}%`, background: '#f97316' }} title="Direct D2C" />
              <div style={{ width: `${(dineInRev / totalMonthlyRev) * 100}%`, background: '#fbbf24' }} title="Dine-In" />
              <div style={{ width: `${(tiffinMRR / totalMonthlyRev) * 100}%`, background: '#22c55e' }} title="Tiffin MRR" />
              <div style={{ width: `${(cateringRev / totalMonthlyRev) * 100}%`, background: '#a855f7' }} title="Catering" />
              <div style={{ width: `${(aggregatorRev / totalMonthlyRev) * 100}%`, background: '#52525b' }} title="Aggregators" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 11.5, color: 'var(--muted)' }}>
              <span><strong style={{ color: '#f97316' }}>■</strong> Direct D2C ({Math.round((directRev / totalMonthlyRev) * 100)}%)</span>
              <span><strong style={{ color: '#fbbf24' }}>■</strong> Dine-In ({Math.round((dineInRev / totalMonthlyRev) * 100)}%)</span>
              <span><strong style={{ color: '#22c55e' }}>■</strong> Tiffin MRR ({Math.round((tiffinMRR / totalMonthlyRev) * 100)}%)</span>
              <span><strong style={{ color: '#a855f7' }}>■</strong> Catering ({Math.round((cateringRev / totalMonthlyRev) * 100)}%)</span>
              <span><strong style={{ color: '#71717a' }}>■</strong> Aggregators ({Math.round((aggregatorRev / totalMonthlyRev) * 100)}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Business Models Deep Dive */}
      <div className="ba-models-grid">
        {BUSINESS_MODELS.map((bm) => (
          <div key={bm.id} className="ba-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 28,
                  color: 'var(--saffron)',
                  letterSpacing: 2,
                }}
              >
                MODEL {bm.number}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: '#4ade80',
                  background: 'rgba(22,163,74,0.12)',
                  border: '1px solid rgba(34,197,94,0.28)',
                  padding: '4px 10px',
                  borderRadius: 2,
                }}
              >
                {bm.marginProfile}
              </span>
            </div>

            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 23, fontWeight: 900 }}>
              {bm.title}
            </h3>
            <p style={{ fontSize: 12.5, color: 'var(--gold)', marginTop: 3, marginBottom: 14 }}>
              {bm.subtitle}
            </p>

            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 10 }}>
              <strong style={{ color: '#fff' }}>Problem Solved:</strong> {bm.problemSolved}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 16 }}>
              <strong style={{ color: '#fff' }}>Execution Engine:</strong> {bm.mechanism}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
              {bm.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface)',
                    padding: '10px 8px',
                    borderRadius: 3,
                    textAlign: 'center',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--gold)' }}>{kpi.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{kpi.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11.5, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <CheckCircle2 size={13} color="#fbbf24" /> {bm.uiTouchpoint}
              </span>
              <button
                className="custom-btn"
                onClick={() => onJumpToTouchpoint(touchpointMap[bm.id] || 'menu')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Layers size={12} /> Test Live Module <TrendingUp size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
