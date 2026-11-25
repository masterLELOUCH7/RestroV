import React, { useState } from 'react';
import {
  Bike,
  CheckCircle2,
  Coins,
  ShoppingBag,
  Sparkles,
  Store,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { OFFERS } from '../data/restaurantData';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedPromo: string | null;
  onApplyPromo: (code: string | null) => void;
  onChangeQty: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onCheckoutSuccess: (orderSummary: {
    orderId: string;
    total: number;
    coinsEarned: number;
    mode: 'delivery' | 'pickup';
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  appliedPromo,
  onApplyPromo,
  onChangeQty,
  onRemoveItem,
  onCheckoutSuccess,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [customerAddress, setCustomerAddress] = useState('Flat 402, Pocket B, Sector 10, Dwarka');

  if (!isOpen) return null;

  const subtotal = cart.reduce((s, item) => s + item.unitPrice * item.qty, 0);
  const baseDeliveryFee = fulfillment === 'delivery' && subtotal > 0 ? 49 : 0;

  const activeOffer = OFFERS.find((o) => o.code === appliedPromo);
  let discount = 0;
  let deliveryFee = baseDeliveryFee;
  let promoStatus = '';

  if (activeOffer) {
    if (subtotal < activeOffer.minOrder) {
      promoStatus = `Add ₹${activeOffer.minOrder - subtotal} more to unlock ${activeOffer.code}`;
    } else if (activeOffer.discountType === 'percent') {
      discount = Math.round((subtotal * activeOffer.discountValue) / 100);
      promoStatus = `${activeOffer.code} active (-₹${discount})`;
    } else if (activeOffer.discountType === 'flat') {
      discount = activeOffer.discountValue;
      promoStatus = `${activeOffer.code} active (-₹${discount})`;
    } else if (activeOffer.discountType === 'freeDelivery') {
      deliveryFee = 0;
      promoStatus = `${activeOffer.code} active (Free Delivery)`;
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  const aggregatorFeeSaved = Math.round(subtotal * 0.24);
  const coinsEarned = Math.max(5, Math.round(grandTotal * 0.05));

  const handleApplyInput = () => {
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;
    onApplyPromo(clean);
    setPromoInput('');
  };

  const handleCheckout = () => {
    const orderId = `VIK-${Math.floor(10000 + Math.random() * 90000)}`;
    onCheckoutSuccess({
      orderId,
      total: grandTotal,
      coinsEarned,
      mode: fulfillment,
    });
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="cart-drawer">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 16,
            borderBottom: '1px solid var(--border)',
            marginBottom: 16,
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 900 }}>
              Direct Order Cart
            </h3>
            <span style={{ fontSize: 11, color: '#4ade80' }}>
              0% App Commission · Fresh from Dwarka Kitchen
            </span>
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

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '70px 20px', color: 'var(--muted)', flex: 1 }}>
            <ShoppingBag size={44} style={{ opacity: 0.35, marginBottom: 14 }} />
            <p style={{ fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>Your cart is empty</p>
            <p style={{ fontSize: 12.5 }}>
              Explore our menu, build a Royal Thali, or start a Tiffin Subscription.
            </p>
          </div>
        ) : (
          <>
            {/* Fulfillment Mode Toggle */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 6,
                background: 'var(--surface)',
                padding: 4,
                borderRadius: 4,
                marginBottom: 14,
              }}
            >
              <button
                onClick={() => setFulfillment('delivery')}
                style={{
                  padding: '8px 10px',
                  border: 'none',
                  borderRadius: 3,
                  background: fulfillment === 'delivery' ? 'var(--saffron)' : 'transparent',
                  color: fulfillment === 'delivery' ? '#060608' : 'var(--muted)',
                  fontWeight: 700,
                  fontSize: 11.5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                <Bike size={14} /> 45-Min Delivery
              </button>
              <button
                onClick={() => setFulfillment('pickup')}
                style={{
                  padding: '8px 10px',
                  border: 'none',
                  borderRadius: 3,
                  background: fulfillment === 'pickup' ? 'var(--saffron)' : 'transparent',
                  color: fulfillment === 'pickup' ? '#060608' : 'var(--muted)',
                  fontWeight: 700,
                  fontSize: 11.5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                <Store size={14} /> Sector 10 Pickup
              </button>
            </div>

            {fulfillment === 'delivery' && (
              <div style={{ marginBottom: 12 }}>
                <input
                  className="form-input"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Delivery address in Dwarka..."
                  style={{ fontSize: 12, padding: '9px 12px' }}
                />
              </div>
            )}

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cart.map((item) => (
                <div
                  key={item.cartKey}
                  style={{
                    display: 'flex',
                    gap: 12,
                    padding: 12,
                    background: 'var(--card)',
                    borderRadius: 4,
                    border: '1px solid var(--border)',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 3, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className={`diet-mark ${item.isVeg ? 'veg' : 'nonveg'}`} />
                      <div style={{ fontWeight: 700, fontSize: 13.5, truncate: true } as React.CSSProperties}>
                        {item.name}
                      </div>
                    </div>
                    {item.spice && (
                      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'capitalize' }}>
                        Spice: {item.spice}
                        {item.selectedAddons && item.selectedAddons.length > 0
                          ? ` · +${item.selectedAddons.map((a) => a.name).join(', ')}`
                          : ''}
                      </div>
                    )}
                    {item.customSummary && (
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                        {item.customSummary}
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          onClick={() => onChangeQty(item.cartKey, -1)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 2,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: '#fff',
                            cursor: 'pointer',
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                        <button
                          onClick={() => onChangeQty(item.cartKey, 1)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 2,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: '#fff',
                            cursor: 'pointer',
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 14 }}>
                        ₹{item.unitPrice * item.qty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.cartKey)}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', alignSelf: 'flex-start' }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Box */}
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  className="form-input"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (e.g. DIWALI30, VIKFREE)"
                  style={{ padding: '9px 12px', fontSize: 12 }}
                />
                <button
                  onClick={handleApplyInput}
                  style={{
                    padding: '0 14px',
                    background: 'var(--surface2)',
                    border: '1px solid var(--border-bright)',
                    color: 'var(--gold)',
                    borderRadius: 3,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Apply
                </button>
              </div>
              {promoStatus && (
                <div
                  style={{
                    fontSize: 11.5,
                    color: discount > 0 || deliveryFee === 0 ? '#4ade80' : '#fbbf24',
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <Tag size={12} /> {promoStatus}
                  </span>
                  <button
                    onClick={() => onApplyPromo(null)}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 11, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* D2C Savings Banner */}
              <div
                style={{
                  background: 'rgba(22, 163, 74, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  borderRadius: 4,
                  padding: '8px 12px',
                  fontSize: 11.5,
                  color: '#86efac',
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={13} /> Direct D2C Advantage
                </span>
                <span>~₹{aggregatorFeeSaved} saved vs food apps</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12.5, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                    <span>Promo Discount ({appliedPromo})</span>
                    <span>−₹{discount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>{fulfillment === 'delivery' ? 'Express Dispatch' : 'Counter Pickup'}</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 8,
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Grand Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: 'var(--gold)' }}>
                    ₹{grandTotal}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Coins size={12} /> You will earn +{coinsEarned} Spice Coins on this order
                </div>
              </div>

              <button
                className="btn-submit"
                onClick={handleCheckout}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <CheckCircle2 size={16} /> Place Direct Order · ₹{grandTotal}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};
