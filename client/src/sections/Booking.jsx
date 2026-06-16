import { useState } from 'react';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', date: '', time: '', notes: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  if (status === 'success') {
    return (
      <section className="cta-section" id="booking" style={{ background: 'var(--obsidian)' }}>
        <div className="cta-content" style={{textAlign: 'center'}}>
          <h2 className="display-text small" style={{color: 'var(--gold)'}}>RESERVATION CONFIRMED</h2>
          <p style={{marginTop: '1rem', opacity: 0.7}}>Our concierge will contact you shortly to finalize details.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="cta-section" id="booking" style={{ background: 'var(--obsidian)', padding: '10rem 4rem', height: 'auto' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="section-header center">
          <span className="accent-label">Secure Your</span>
          <h2 className="section-title">Appointment</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" className="form-input" placeholder=" " required onChange={handleChange} />
            <label className="form-label">Full Name</label>
          </div>
          <div className="form-group">
            <input type="email" name="email" className="form-input" placeholder=" " required onChange={handleChange} />
            <label className="form-label">Email Address</label>
          </div>
          <div className="form-group">
            <select name="service" className="form-input" required onChange={handleChange} style={{color: 'var(--ivory)'}}>
              <option value="" disabled selected>Select Service</option>
              <option value="Hair Artistry">Hair Artistry</option>
              <option value="Skin Alchemy">Skin Alchemy</option>
              <option value="The Ritual">The Ritual</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="form-group" style={{flex: 1}}>
              <input type="date" name="date" className="form-input" required onChange={handleChange} />
              <label className="form-label">Date</label>
            </div>
            <div className="form-group" style={{flex: 1}}>
              <input type="time" name="time" className="form-input" required onChange={handleChange} />
              <label className="form-label">Time</label>
            </div>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '3rem'}}>
            <button type="submit" className="btn btn-glow" data-cursor="hover" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Processing...' : 'Reserve'}
            </button>
            {status === 'error' && <p style={{color: 'red', marginTop: '1rem'}}>Something went wrong. Please try again.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
