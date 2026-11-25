import React, { useState } from 'react';
import { Clock, Flame, Plus, X } from 'lucide-react';
import { Dish, DishAddon, SpiceLevel } from '../types';

interface DishCustomizerModalProps {
  dish: Dish;
  onClose: () => void;
  onAddConfigured: (
    dish: Dish,
    spice: SpiceLevel,
    addons: DishAddon[],
    qty: number
  ) => void;
}

export const DishCustomizerModal: React.FC<DishCustomizerModalProps> = ({
  dish,
  onClose,
  onAddConfigured,
}) => {
  const [spice, setSpice] = useState<SpiceLevel>(dish.spiceDefault);
  const [selectedAddons, setSelectedAddons] = useState<DishAddon[]>([]);
  const [qty, setQty] = useState(1);

  const toggleAddon = (addon: DishAddon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const totalPrice = (dish.price + addonTotal) * qty;

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className={`diet-mark ${dish.isVeg ? 'veg' : 'nonveg'}`} />
              <span style={{ fontSize: 11, color: '#fbbf24', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {dish.hindiName}
              </span>
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900 }}>
              {dish.name}
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
            height: 180,
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 16,
            border: '1px solid var(--border)',
          }}
        >
          <img
            src={dish.img}
            alt={dish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 10 }}>
          {dish.desc}
        </p>
        <div
          style={{
            background: 'rgba(251, 191, 36, 0.06)',
            borderLeft: '2px solid var(--gold)',
            padding: '10px 12px',
            fontSize: 12.5,
            color: 'rgba(250,248,245,0.82)',
            marginBottom: 18,
            fontStyle: 'italic',
          }}
        >
          Chef&apos;s Note: {dish.story}
        </div>

        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Clock size={13} color="#fbbf24" /> {dish.prepTime}
          </span>
          <span>•</span>
          <span>{dish.calories}</span>
          <span>•</span>
          <span>★ {dish.stars}.0 ({dish.reviewsCount} reviews)</span>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Flame size={12} color="#f97316" /> Select Spice Profile
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {(['mild', 'medium', 'fiery'] as SpiceLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSpice(lvl)}
                style={{
                  padding: '10px 8px',
                  borderRadius: 3,
                  border: spice === lvl ? '1px solid var(--saffron)' : '1px solid var(--border)',
                  background: spice === lvl ? 'rgba(249,115,22,0.16)' : 'var(--surface)',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                {lvl === 'mild' ? 'Mild Cream' : lvl === 'medium' ? 'Delhi Medium' : 'Agra Fiery'}
              </button>
            ))}
          </div>
        </div>

        {dish.addons.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="form-label">Recommended Chef Pairings (Optional)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dish.addons.map((addon) => {
                const checked = selectedAddons.some((a) => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: 3,
                      border: checked ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: checked ? 'rgba(251,191,36,0.1)' : 'var(--surface)',
                      color: '#fff',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    <span>
                      {checked ? '✓ ' : '+ '}
                      {addon.name}
                    </span>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>+₹{addon.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '8px 12px',
              borderRadius: 3,
            }}
          >
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}
            >
              −
            </button>
            <span style={{ minWidth: 18, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}
            >
              +
            </button>
          </div>
          <button
            className="btn-submit"
            onClick={() => {
              onAddConfigured(dish, spice, selectedAddons, qty);
              onClose();
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Plus size={16} /> Add to Order · ₹{totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
};
