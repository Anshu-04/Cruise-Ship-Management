import React from 'react';

const Party = () => {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#7c3aed', 
        color: 'white', 
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
          Voyager Party Services
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.1rem', opacity: '0.9' }}>
          Celebrate life's special moments with unforgettable events at sea
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Event Types */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '50px'
          }}>
            <div style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ color: '#7c3aed', marginBottom: '15px', fontSize: '1.4rem' }}>
                Birthday Celebrations
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Make your special day unforgettable with customized birthday party packages.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Themed decorations and setup</li>
                <li>Custom birthday cake</li>
                <li>Party favors and gifts</li>
                <li>Photography services</li>
                <li>Entertainment and music</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ color: '#7c3aed', marginBottom: '15px', fontSize: '1.4rem' }}>
                Anniversary Parties
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Celebrate your love story with romantic anniversary celebrations.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Elegant venue decorations</li>
                <li>Romantic dinner arrangements</li>
                <li>Live music performances</li>
                <li>Champagne and wine service</li>
                <li>Memory photo displays</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ color: '#7c3aed', marginBottom: '15px', fontSize: '1.4rem' }}>
                Corporate Events
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Host professional meetings and corporate celebrations in style.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Conference room setups</li>
                <li>Audio-visual equipment</li>
                <li>Catering services</li>
                <li>Team building activities</li>
                <li>Networking receptions</li>
              </ul>
            </div>
          </div>

          {/* Venue Options */}
          <div style={{ 
            backgroundColor: '#faf5ff', 
            padding: '40px', 
            borderRadius: '12px',
            marginBottom: '40px'
          }}>
            <h3 style={{ color: '#7c3aed', marginBottom: '30px', fontSize: '1.8rem', textAlign: 'center' }}>
              Premium Venues
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '25px'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#7c3aed', marginBottom: '10px', fontSize: '1.2rem' }}>
                  Grand Ballroom
                </h4>
                <p style={{ color: '#64748b', marginBottom: '10px' }}>
                  Elegant space for large celebrations
                </p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Capacity: 150 guests
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#7c3aed', marginBottom: '10px', fontSize: '1.2rem' }}>
                  Ocean View Terrace
                </h4>
                <p style={{ color: '#64748b', marginBottom: '10px' }}>
                  Outdoor venue with stunning views
                </p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Capacity: 80 guests
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#7c3aed', marginBottom: '10px', fontSize: '1.2rem' }}>
                  Private Dining Room
                </h4>
                <p style={{ color: '#64748b', marginBottom: '10px' }}>
                  Intimate setting for special occasions
                </p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Capacity: 30 guests
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#7c3aed', marginBottom: '10px', fontSize: '1.2rem' }}>
                  Poolside Deck
                </h4>
                <p style={{ color: '#64748b', marginBottom: '10px' }}>
                  Casual outdoor party space
                </p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Capacity: 100 guests
                </p>
              </div>
            </div>
          </div>

          {/* Services Included */}
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '40px', 
            borderRadius: '12px',
            marginBottom: '40px'
          }}>
            <h3 style={{ color: '#7c3aed', marginBottom: '30px', fontSize: '1.8rem', textAlign: 'center' }}>
              What's Included
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '30px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#6b46c1', marginBottom: '15px', fontSize: '1.1rem' }}>
                  Event Planning
                </h4>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Dedicated event coordinator to handle all details from start to finish
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#6b46c1', marginBottom: '15px', fontSize: '1.1rem' }}>
                  Catering Service
                </h4>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Custom menu options with premium ingredients and presentation
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#6b46c1', marginBottom: '15px', fontSize: '1.1rem' }}>
                  Entertainment
                </h4>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Live music, DJ services, and specialized entertainment options
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#6b46c1', marginBottom: '15px', fontSize: '1.1rem' }}>
                  Photography
                </h4>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Professional photographer to capture all your special moments
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div style={{ 
            backgroundColor: '#7c3aed', 
            color: 'white', 
            padding: '40px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '2rem' }}>
              Plan Your Perfect Event
            </h2>
            <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', opacity: '0.9' }}>
              Let our expert event planners create an unforgettable experience for you
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{ 
                backgroundColor: 'white', 
                color: '#7c3aed', 
                padding: '15px 30px', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                Start Planning
              </button>
              <button style={{ 
                backgroundColor: 'transparent', 
                color: 'white', 
                padding: '15px 30px', 
                border: '2px solid white', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                View Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Party;