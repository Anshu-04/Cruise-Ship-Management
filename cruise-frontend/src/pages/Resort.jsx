import React from 'react';

const Resort = () => {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#059669', 
        color: 'white', 
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
          Voyager Resort Services
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.1rem', opacity: '0.9' }}>
          Luxury spa, dining, and relaxation experiences aboard the Voyager
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Services Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '30px',
            marginBottom: '50px'
          }}>
            <div style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{ color: '#059669', marginBottom: '15px', fontSize: '1.4rem' }}>
                Spa & Wellness
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Rejuvenate your body and mind with our full-service spa treatments and wellness programs.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Swedish and deep tissue massage</li>
                <li>Facial treatments and skincare</li>
                <li>Couples massage packages</li>
                <li>Yoga and meditation sessions</li>
                <li>Sauna and steam room access</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{ color: '#059669', marginBottom: '15px', fontSize: '1.4rem' }}>
                Pool & Deck Services
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Enjoy premium poolside amenities and exclusive deck experiences with ocean views.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Private cabana rentals</li>
                <li>Poolside food and beverage service</li>
                <li>Towel and lounger service</li>
                <li>Infinity pool access</li>
                <li>Sunset deck experiences</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{ color: '#059669', marginBottom: '15px', fontSize: '1.4rem' }}>
                Exclusive Dining
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Indulge in gourmet dining experiences with our chef's table and specialty restaurants.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Chef's table tasting menu</li>
                <li>Wine pairing dinners</li>
                <li>Private dining rooms</li>
                <li>Specialty cuisine restaurants</li>
                <li>Room service upgrades</li>
              </ul>
            </div>
          </div>

          {/* Featured Packages */}
          <div style={{ 
            backgroundColor: '#ecfdf5', 
            padding: '40px', 
            borderRadius: '12px',
            marginBottom: '40px'
          }}>
            <h3 style={{ color: '#059669', marginBottom: '30px', fontSize: '1.8rem', textAlign: 'center' }}>
              Featured Packages
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#059669', marginBottom: '10px', fontSize: '1.2rem' }}>
                  Couples Retreat
                </h4>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>
                  Spa treatments + Private cabana + Romantic dinner
                </p>
                <p style={{ color: '#059669', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  $299 per couple
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#059669', marginBottom: '10px', fontSize: '1.2rem' }}>
                  Ultimate Relaxation
                </h4>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>
                  Full spa day + Pool service + Gourmet meal
                </p>
                <p style={{ color: '#059669', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  $199 per person
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#059669', marginBottom: '10px', fontSize: '1.2rem' }}>
                  VIP Experience
                </h4>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>
                  All services + Priority booking + Exclusive access
                </p>
                <p style={{ color: '#059669', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  $449 per person
                </p>
              </div>
            </div>
          </div>

          {/* Book Now */}
          <div style={{ 
            backgroundColor: '#059669', 
            color: 'white', 
            padding: '40px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '2rem' }}>
              Book Your Resort Experience
            </h2>
            <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', opacity: '0.9' }}>
              Treat yourself to luxury and relaxation during your cruise
            </p>
            <button style={{ 
              backgroundColor: 'white', 
              color: '#059669', 
              padding: '15px 40px', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Make Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resort;
