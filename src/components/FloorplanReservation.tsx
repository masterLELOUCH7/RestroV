import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, Sparkles, Users } from 'lucide-react';
import { DINING_TABLES } from '../data/restaurantData';
import { DiningTable, ReservationRecord } from '../types';

interface FloorplanReservationProps {
  onConfirmReservation: (record: ReservationRecord) => void;
  recentReservations: ReservationRecord[];
}

export const FloorplanReservation: React.FC<FloorplanReservationProps> = ({
  onConfirmReservation,
  recentReservations,
}) => {
  const [selectedTable, setSelectedTable] = useState<DiningTable>(DINING_TABLES[0]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-26');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState('2 Persons');
  const [occasion, setOccasion] = useState('Regular Dining');
  const [requests, setRequests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName.trim() || 'Guest'} ${lastName.trim()}`.trim();
    const record: ReservationRecord = {
      id: `TBL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: fullName,
      phone: phone.trim() || '+91 98765 43210',
      date,
      time,
      guests,
      occasion,
      tableLabel: selectedTable.label,
      zone: selectedTable.zone,
      requests: requests.trim() || 'Standard chef hospitality',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    onConfirmReservation(record);
    setFirstName('');
    setLastName('');
    setRequests('');
  };

  return (
    <section id="reservation" className="res-section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Experiential Seating &amp; Yield Floorplan</span>
        </div>
        <h2 className="section-title">
          Choose Your Exact <em>Dwarka Table</em>
        </h2>
        <p className="section-sub">
          Tap any available zone on our live dining floorplan — from the glowing Charcoal Tandoor
          Bar to our 14-seat Agra Royal Private Dining Room.
        </p>

        <div className="res-grid">
          <div className="floorplan-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>
                Sector 10 Flagship Floorplan · Tonight
              </span>
              <span style={{ fontSize: 11, color: '#4ade80' }}>6 of 7 Zones Available</span>
            </div>

            <div className="floorplan-canvas">
              <span className="fp-stage-label">Live Charcoal Tandoor &amp; Kitchen Pass</span>
              {DINING_TABLES.map((tbl) => {
                const isSelected = selectedTable.id === tbl.id;
                const isBooked = tbl.status === 'booked';
                return (
                  <button
                    key={tbl.id}
                    type="button"
                    disabled={isBooked}
                    onClick={() => setSelectedTable(tbl)}
                    className={`fp-table ${tbl.status} ${isSelected ? 'selected' : ''}`}
                    style={{
                      left: `${tbl.x}%`,
                      top: `${tbl.y}%`,
                      width: `${tbl.w}%`,
                      height: `${tbl.h}%`,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 800, color: isSelected ? '#fbbf24' : '#fff' }}>
                      {tbl.label}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
                      <Users size={10} style={{ display: 'inline', marginRight: 3 }} />
                      {tbl.seats} Seats · {isBooked ? 'Booked' : `Min ₹${tbl.minSpend}`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="fp-legend">
              <span>
                <span className="fp-dot" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }} />
                Available
              </span>
              <span>
                <span className="fp-dot" style={{ background: 'rgba(249,115,22,0.45)', border: '1px solid var(--saffron)' }} />
                Selected Zone
              </span>
              <span>
                <span className="fp-dot" style={{ background: 'transparent', border: '1px solid #fbbf24' }} />
                1 Slot Left
              </span>
              <span>
                <span className="fp-dot" style={{ background: 'var(--surface)', opacity: 0.4 }} />
                Booked
              </span>
            </div>

            {/* Selected Table Perks Card */}
            <div
              style={{
                marginTop: 18,
                padding: 16,
                background: 'var(--surface)',
                borderRadius: 4,
                border: '1px solid var(--border-bright)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--saffron)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    {selectedTable.zone}
                  </span>
                  <h4 style={{ fontSize: 17, fontWeight: 700 }}>{selectedTable.label}</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Min Spend Commitment</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)' }}>
                    ₹{selectedTable.minSpend.toLocaleString()}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {selectedTable.perks.map((perk, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: 11.5,
                      color: 'rgba(250,248,245,0.82)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <Sparkles size={11} color="#fbbf24" /> {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: 28,
            }}
          >
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, marginBottom: 4 }}>
              Lock In <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{selectedTable.label}</span>
            </h3>
            <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 20 }}>
              Instant table pass + WhatsApp concierge confirmation. Groups up to 30 accommodated.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  className="form-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Rahul"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  className="form-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sharma"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time Slot</label>
                <input
                  className="form-input"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Party Size</label>
                <select className="form-input" value={guests} onChange={(e) => setGuests(e.target.value)}>
                  <option>2 Persons</option>
                  <option>4 Persons</option>
                  <option>6 Persons</option>
                  <option>8 Persons</option>
                  <option>10–14 Persons (PDR)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Occasion</label>
                <select className="form-input" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                  <option>Regular Dining</option>
                  <option>Couple&apos;s Date Night (DATE20)</option>
                  <option>Birthday Celebration</option>
                  <option>Anniversary</option>
                  <option>Corporate Hosting</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone / WhatsApp</label>
              <input
                className="form-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dietary / Decor Notes</label>
              <textarea
                className="form-input"
                rows={2}
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="Jain prep, anniversary cake note, corner seating…"
              />
            </div>

            <button
              type="submit"
              className="btn-submit"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <CalendarCheck size={16} /> Confirm {selectedTable.label}
            </button>

            {recentReservations.length > 0 && (
              <div
                style={{
                  marginTop: 18,
                  padding: 12,
                  background: 'rgba(22, 163, 74, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: 4,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={14} /> Latest Confirmed Pass ({recentReservations[0].id})
                </div>
                <div style={{ fontSize: 12, color: 'var(--white)' }}>
                  {recentReservations[0].name} · {recentReservations[0].tableLabel} · {recentReservations[0].date} @ {recentReservations[0].time}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
