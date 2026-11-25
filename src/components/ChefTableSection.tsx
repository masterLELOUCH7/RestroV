import React from 'react';
import { Award, Plus } from 'lucide-react';
import { DISHES } from '../data/restaurantData';
import { Dish } from '../types';

interface ChefTableSectionProps {
  onQuickAdd: (dish: Dish) => void;
}

export const ChefTableSection: React.FC<ChefTableSectionProps> = ({ onQuickAdd }) => {
  const chefSpecials = [DISHES[1], DISHES[0], DISHES[2], DISHES[7]];

  return (
    <section id="chef" className="chef-section">
      <div className="container">
        <div className="chef-grid">
          <div className="chef-img-col">
            <div className="chef-award">
              <Award size={13} style={{ display: 'inline', marginRight: 5 }} />
              Delhi Chef of the Year 2024
            </div>
            <div className="chef-main">
              <img
                src="/images/chef-vikram.jpg"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85';
                }}
                alt="Chef Vikram Das plating in tandoor kitchen"
              />
            </div>
          </div>

          <div>
            <div className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Culinary Heritage · Est. 2020</span>
            </div>
            <h2 className="section-title">
              Chef Vik&apos;s <em>Signature Table</em>
            </h2>

            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--gold)',
                }}
              >
                Chef Vikram Das
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginTop: 3,
                }}
              >
                Founder &amp; Culinary Director · Ex-Agra Heritage Kitchens
              </div>
            </div>

            <blockquote className="chef-quote">
              &ldquo;Every dish I plate is a love letter to my mother&apos;s brass kitchen in Agra.
              Slow fire, zero shortcuts, whole ground spices — you do not rush flavour.&rdquo;
            </blockquote>

            <div className="specials-list">
              {chefSpecials.map((dish) => (
                <div key={dish.id} className="special-row" onClick={() => onQuickAdd(dish)}>
                  <div className="s-img">
                    <img src={dish.img} alt={dish.name} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{dish.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{dish.story}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 22,
                        fontWeight: 900,
                        color: 'var(--gold)',
                      }}
                    >
                      ₹{dish.price}
                    </span>
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 3,
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--saffron)',
                      }}
                    >
                      <Plus size={15} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
