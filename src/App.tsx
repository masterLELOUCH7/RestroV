import { useEffect, useState } from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { AuthLoyaltyModal } from './components/AuthLoyaltyModal';
import { BusinessBlueprintView } from './components/BusinessBlueprintView';
import { CartDrawer } from './components/CartDrawer';
import { CateringConfigurator } from './components/CateringConfigurator';
import { ChefTableSection } from './components/ChefTableSection';
import { FloorplanReservation } from './components/FloorplanReservation';
import { Hero } from './components/Hero';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { OffersSection } from './components/OffersSection';
import { SubscriptionSection } from './components/SubscriptionSection';
import { TestimonialsGalleryContact } from './components/TestimonialsGalleryContact';
import { ThaliBuilder } from './components/ThaliBuilder';
import { MARQUEE_ITEMS, OFFERS } from './data/restaurantData';
import {
  CartItem,
  Dish,
  DishAddon,
  ReservationRecord,
  SpiceLevel,
  SubscriptionPlan,
} from './types';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function App() {
  const [activeView, setActiveView] = useState<'guest' | 'ba'>('guest');
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('cvr_cart', []));
  const [wishlist, setWishlist] = useState<number[]>(() => readStorage('cvr_wish', [1, 2]));
  const [spiceCoins, setSpiceCoins] = useState<number>(() => readStorage('cvr_coins', 120));
  const [userName, setUserName] = useState<string | null>(() => readStorage('cvr_user', null));
  const [reservations, setReservations] = useState<ReservationRecord[]>(() =>
    readStorage('cvr_reservations', [])
  );
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<{
    orderId: string;
    total: number;
    coinsEarned: number;
    mode: 'delivery' | 'pickup';
  } | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('cvr_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cvr_wish', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cvr_coins', JSON.stringify(spiceCoins));
  }, [spiceCoins]);

  useEffect(() => {
    localStorage.setItem('cvr_user', JSON.stringify(userName));
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('cvr_reservations', JSON.stringify(reservations));
  }, [reservations]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const upsertCartItem = (newItem: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.cartKey === newItem.cartKey);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + newItem.qty };
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const handleQuickAdd = (dish: Dish) => {
    const cartKey = `dish-${dish.id}-${dish.spiceDefault}-none`;
    upsertCartItem({
      cartKey,
      id: dish.id,
      name: dish.name,
      price: dish.price,
      unitPrice: dish.price,
      img: dish.img,
      qty: 1,
      isVeg: dish.isVeg,
      spice: dish.spiceDefault,
      itemType: 'dish',
    });
    showToast(`${dish.name} added to direct cart`);
    setCartOpen(true);
  };

  const handleAddConfigured = (
    dish: Dish,
    spice: SpiceLevel,
    addons: DishAddon[],
    qty: number
  ) => {
    const addonKey = addons
      .map((a) => a.id)
      .sort()
      .join(',');
    const addonTotal = addons.reduce((s, a) => s + a.price, 0);
    upsertCartItem({
      cartKey: `dish-${dish.id}-${spice}-${addonKey || 'none'}`,
      id: dish.id,
      name: dish.name,
      price: dish.price,
      unitPrice: dish.price + addonTotal,
      img: dish.img,
      qty,
      isVeg: dish.isVeg,
      spice,
      selectedAddons: addons,
      itemType: 'dish',
    });
    showToast(`Customized ${dish.name} added to cart`);
    setCartOpen(true);
  };

  const handleAddThali = (summary: string, price: number, isVeg: boolean) => {
    upsertCartItem({
      cartKey: `thali-${summary}`,
      id: 9001,
      name: isVeg ? 'Custom Veg Royal Thali' : 'Custom Shahi Non-Veg Thali',
      price,
      unitPrice: price,
      img: '/images/royal-thali.jpg',
      qty: 1,
      isVeg,
      customSummary: summary,
      itemType: 'thali',
    });
    showToast('Custom Royal Thali added to cart');
    setCartOpen(true);
  };

  const handleSubscribe = (
    plan: SubscriptionPlan,
    cycle: 'weekly' | 'monthly',
    price: number
  ) => {
    upsertCartItem({
      cartKey: `sub-${plan.id}-${cycle}`,
      id: 9500,
      name: `${plan.name} (${cycle === 'weekly' ? 'Weekly' : 'Monthly'})`,
      price,
      unitPrice: price,
      img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80',
      qty: 1,
      isVeg: plan.isVegOption,
      customSummary: `${plan.mealsPerWeek} meals/week · Zero-waste morning prep`,
      itemType: 'subscription',
    });
    showToast(`${plan.name} added to cart`);
    setCartOpen(true);
  };

  const handleBookCateringDeposit = (summary: string, depositAmount: number) => {
    upsertCartItem({
      cartKey: `catering-${summary}`,
      id: 9800,
      name: 'Event Catering Date Lock (20% Deposit)',
      price: depositAmount,
      unitPrice: depositAmount,
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80',
      qty: 1,
      isVeg: true,
      customSummary: summary,
      itemType: 'catering-deposit',
    });
    showToast('20% Catering Deposit added to cart');
    setCartOpen(true);
  };

  const handleApplyPromo = (code: string | null) => {
    if (!code) {
      setAppliedPromo(null);
      return;
    }
    const found = OFFERS.find((o) => o.code === code);
    if (!found) {
      showToast(`Code "${code}" not recognized — try DIWALI30 or VIKFREE`);
      return;
    }
    navigator.clipboard?.writeText(code).catch(() => {});
    setAppliedPromo(code);
    showToast(`Promo "${code}" applied & copied!`);
  };

  const handleChangeQty = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleToggleWish = (id: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      showToast(exists ? 'Removed from favourites' : 'Saved to favourites');
      return exists ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const handleConfirmReservation = (record: ReservationRecord) => {
    setReservations((prev) => [record, ...prev]);
    setSpiceCoins((c) => c + 25);
    showToast(`Table ${record.tableLabel} confirmed! Pass ${record.id} (+25 Spice Coins)`);
  };

  const totalCartItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div>
      <div className="grain-overlay" />

      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={totalCartItems}
        spiceCoins={spiceCoins}
        userName={userName}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onScrollTo={scrollToSection}
      />

      {activeView === 'ba' ? (
        <BusinessBlueprintView
          onBackToSite={() => {
            setActiveView('guest');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onJumpToTouchpoint={(sectionId) => {
            setActiveView('guest');
            setTimeout(() => scrollToSection(sectionId), 80);
          }}
        />
      ) : (
        <main>
          <Hero
            onScrollTo={scrollToSection}
            onOpenBA={() => {
              setActiveView('ba');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <div className="marquee-strip">
            <div className="marquee-track">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="m-item">
                  {item}
                  <span className="m-dot" />
                </span>
              ))}
            </div>
          </div>

          <OffersSection appliedPromo={appliedPromo} onApplyCode={handleApplyPromo} />

          <MenuSection
            wishlist={wishlist}
            onToggleWish={handleToggleWish}
            onQuickAdd={handleQuickAdd}
            onAddConfigured={handleAddConfigured}
          />

          <ThaliBuilder onAddThaliToCart={handleAddThali} />

          <ChefTableSection onQuickAdd={handleQuickAdd} />

          <SubscriptionSection onSubscribe={handleSubscribe} />

          <FloorplanReservation
            onConfirmReservation={handleConfirmReservation}
            recentReservations={reservations}
          />

          <CateringConfigurator
            onBookDeposit={handleBookCateringDeposit}
            onRequestQuote={(summary) =>
              showToast(`Proposal sent to Chef Vik Event Concierge (${summary})`)
            }
          />

          <TestimonialsGalleryContact
            onScrollTo={scrollToSection}
            onOpenBA={() => {
              setActiveView('ba');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {/* Floating Cart Button */}
      {totalCartItems > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 900,
            background: 'linear-gradient(135deg, var(--saffron) 0%, #f59e0b 100%)',
            color: '#060608',
            border: 'none',
            padding: '13px 22px',
            borderRadius: 4,
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 14px 36px rgba(249,115,22,0.45)',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          <ShoppingBag size={16} /> View Direct Cart ({totalCartItems})
        </button>
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onChangeQty={handleChangeQty}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={(summary) => {
          setCart([]);
          setAppliedPromo(null);
          setCartOpen(false);
          setSpiceCoins((c) => c + summary.coinsEarned);
          setTrackedOrder(summary);
        }}
      />

      {trackedOrder && (
        <LiveOrderTrackerModal
          order={trackedOrder}
          onClose={() => setTrackedOrder(null)}
        />
      )}

      {authOpen && (
        <AuthLoyaltyModal
          onClose={() => setAuthOpen(false)}
          userName={userName}
          spiceCoins={spiceCoins}
          wishlist={wishlist}
          reservations={reservations}
          onSignIn={(name) => {
            setUserName(name);
            showToast(`VIP Member Pass activated for ${name}!`);
          }}
        />
      )}

      {toastMsg && (
        <div className="toast-pill">
          <CheckCircle2 size={15} color="#4ade80" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}

export default App;
