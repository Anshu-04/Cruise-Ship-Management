import React from 'react';

const Stationery = () => {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#1e3a8a', 
        color: 'white', 
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
          Voyager Stationery Services
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.1rem', opacity: '0.9' }}>
          Premium stationery and ship merchandise delivered to your cabin
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Categories Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.3rem' }}>
                Writing Materials
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Premium paper, envelopes, pens, and writing accessories for all your correspondence needs.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Voyager branded letterhead</li>
                <li>Luxury fountain pens</li>
                <li>Leather-bound journals</li>
                <li>Postcard collections</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.3rem' }}>
                Ship Merchandise
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Exclusive Voyager branded items and souvenirs to commemorate your cruise experience.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Voyager t-shirts & hoodies</li>
                <li>Coffee mugs & water bottles</li>
                <li>Keychains & magnets</li>
                <li>Photo albums</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.3rem' }}>
                Business Services
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Professional printing and business support services for your work needs at sea.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Document printing</li>
                <li>Business cards</li>
                <li>Presentation materials</li>
                <li>Shipping services</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{ 
            backgroundColor: '#1e3a8a', 
            color: 'white', 
            padding: '40px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '2rem' }}>
              Order Now
            </h2>
            <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', opacity: '0.9' }}>
              Items will be delivered to your cabin within 24 hours
            </p>
            <button style={{ 
              backgroundColor: 'white', 
              color: '#1e3a8a', 
              padding: '15px 40px', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Browse Full Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stationery;