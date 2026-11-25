import React, { useMemo, useState } from 'react';
import { Heart, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { DISHES } from '../data/restaurantData';
import { Dish, DishAddon, DishCategory, SpiceLevel } from '../types';
import { DishCustomizerModal } from './DishCustomizerModal';

interface MenuSectionProps {
  wishlist: number[];
  onToggleWish: (id: number) => void;
  onQuickAdd: (dish: Dish) => void;
  onAddConfigured: (
    dish: Dish,
    spice: SpiceLevel,
    addons: DishAddon[],
    qty: number
  ) => void;
}

const CATEGORIES: { key: 'all' | DishCategory; label: string }[] = [
  { key: 'all', label: 'All Dishes' },
  { key: 'bestseller', label: 'Best Sellers' },
  { key: 'veg', label: 'Pure Veg' },
  { key: 'nonveg', label: 'Non-Veg' },
  { key: 'biryani', label: 'Dum Biryani' },
  { key: 'starter', label: 'Tandoor Starters' },
  { key: 'dessert', label: 'Royal Mithai' },
  { key: 'drinks', label: 'Kulhad Drinks' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  wishlist,
  onToggleWish,
  onQuickAdd,
  onAddConfigured,
}) => {
  const [cat, setCat] = useState<'all' | DishCategory>('all');
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [customDish, setCustomDish] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    return DISHES.filter((d) => {
      if (vegOnly && !d.isVeg) return false;
      if (cat !== 'all' && !d.category.includes(cat)) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.desc.toLowerCase().includes(q) ||
          d.hindiName.includes(search)
        );
      }
      return true;
    });
  }, [cat, search, vegOnly]);

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="menu-top">
          <div>
            <div className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Direct Digital Menu</span>
            </div>
            <h2 className="section-title">
              Chef Vik&apos;s <em>Fan Favourites</em>
            </h2>
          </div>

          <div className="menu-controls">
            <button
              className={`veg-toggle ${vegOnly ? 'on' : ''}`}
              onClick={() => setVegOnly(!vegOnly)}
            >
              <span className="diet-mark veg" />
              Pure Veg Only
            </button>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search biryani, tikka, dal…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={15} className="search-icon" />
            </div>
          </div>
        </div>

        <div className="filter-bar">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`fbtn ${cat === c.key ? 'active' : ''}`}
              onClick={() => setCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 20px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--muted)',
            }}
          >
            No dishes match &ldquo;{search}&rdquo;. Try clearing your filter or search term.
          </div>
        ) : (
          <div className="dishes-grid">
            {filtered.map((dish) => {
              const wished = wishlist.includes(dish.id);
              return (
                <div key={dish.id} className="d-card">
                  <div className="d-img" onClick={() => setCustomDish(dish)}>
                    <img src={dish.img} alt={dish.name} loading="lazy" />
                    <div className="d-overlay" />
                    {dish.badge && (
                      <div className={`d-badge badge-${dish.badge}`}>
                        {dish.badge === 'hot'
                          ? 'Best Seller'
                          : dish.badge === 'veg'
                          ? 'Pure Veg'
                          : dish.badge === 'bestseller'
                          ? "Chef's Pick"
                          : 'New'}
                      </div>
                    )}
                    <button
                      className={`d-wish ${wished ? 'on' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWish(dish.id);
                      }}
                      aria-label="Favorite dish"
                    >
                      <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
                    </button>
                    <div className="d-stars">
                      ★ {dish.stars}.0 ({dish.reviewsCount})
                    </div>
                  </div>

                  <div className="d-body">
                    <div className="d-title-row">
                      <div className="d-name">{dish.name}</div>
                      <span className={`diet-mark ${dish.isVeg ? 'veg' : 'nonveg'}`} />
                    </div>
                    <div className="d-hindi">{dish.hindiName}</div>
                    <div className="d-desc">{dish.desc}</div>
                    <div className="d-meta-chips">
                      <span className="d-meta-chip">{dish.prepTime}</span>
                      <span className="d-meta-chip">{dish.calories}</span>
                      <span className="d-meta-chip" style={{ textTransform: 'capitalize' }}>
                        {dish.spiceDefault} spice
                      </span>
                    </div>

                    <div className="d-foot">
                      <div>
                        {dish.oldPrice && <div className="d-old">₹{dish.oldPrice}</div>}
                        <div className="d-price">₹{dish.price}</div>
                      </div>
                      <div className="d-actions">
                        <button className="custom-btn" onClick={() => setCustomDish(dish)}>
                          <SlidersHorizontal size={12} style={{ display: 'inline', marginRight: 4 }} />
                          Customize
                        </button>
                        <button className="add-btn" onClick={() => onQuickAdd(dish)}>
                          <Plus size={15} /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {customDish && (
        <DishCustomizerModal
          dish={customDish}
          onClose={() => setCustomDish(null)}
          onAddConfigured={onAddConfigured}
        />
      )}
    </section>
  );
};
