import { useEffect, useState } from 'react';
export default function Pricing() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch services:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  const grouped = services.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {});

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-header center">
        <span className="accent-label">Investment</span>
        <h2 className="section-title">Curated Offerings</h2>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {Object.keys(grouped).map(category => (
          <div key={category} className="pricing-category">
            <h3 className="pricing-category-title">{category}</h3>
            {grouped[category].map(item => (
              <div key={item.name} className="pricing-item-wrap" style={{ marginBottom: '2rem' }}>
                <div className="pricing-item">
                  <span className="pricing-item-name">{item.name}</span>
                  <div className="pricing-item-dots"></div>
                  <span className="pricing-item-price">{item.price}</span>
                </div>
                <p className="pricing-item-desc">{item.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
