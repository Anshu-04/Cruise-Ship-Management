import React from 'react';

const Movie = () => {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#7c2d12', 
        color: 'white', 
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
          Voyager Cinema
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.1rem', opacity: '0.9' }}>
          Premium movie experience at sea with the latest blockbusters
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Now Showing */}
          <h2 style={{ color: '#7c2d12', marginBottom: '30px', fontSize: '2rem', textAlign: 'center' }}>
            Now Showing
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '30px',
            marginBottom: '50px'
          }}>
            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ 
                backgroundColor: '#374151', 
                height: '200px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <span style={{ fontSize: '1.2rem' }}>Movie Poster</span>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#7c2d12', marginBottom: '10px' }}>Action Adventure</h3>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>
                  Showtimes: 2:00 PM, 5:00 PM, 8:00 PM
                </p>
                <p style={{ color: '#475569', fontSize: '0.9rem' }}>
                  Runtime: 2h 15min | Rating: PG-13
                </p>
              </div>
            </div>

            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ 
                backgroundColor: '#374151', 
                height: '200px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <span style={{ fontSize: '1.2rem' }}>Movie Poster</span>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#7c2d12', marginBottom: '10px' }}>Romantic Comedy</h3>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>
                  Showtimes: 1:00 PM, 4:00 PM, 7:00 PM
                </p>
                <p style={{ color: '#475569', fontSize: '0.9rem' }}>
                  Runtime: 1h 45min | Rating: PG
                </p>
              </div>
            </div>

            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ 
                backgroundColor: '#374151', 
                height: '200px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <span style={{ fontSize: '1.2rem' }}>Movie Poster</span>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#7c2d12', marginBottom: '10px' }}>Family Animation</h3>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>
                  Showtimes: 11:00 AM, 2:00 PM, 5:00 PM
                </p>
                <p style={{ color: '#475569', fontSize: '0.9rem' }}>
                  Runtime: 1h 30min | Rating: G
                </p>
              </div>
            </div>
          </div>

          {/* Theater Features */}
          <div style={{ 
            backgroundColor: '#fef7f0', 
            padding: '40px', 
            borderRadius: '12px',
            marginBottom: '40px'
          }}>
            <h3 style={{ color: '#7c2d12', marginBottom: '20px', fontSize: '1.5rem', textAlign: 'center' }}>
              Theater Features
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px',
              textAlign: 'center'
            }}>
              <div>
                <h4 style={{ color: '#92400e', marginBottom: '10px' }}>Premium Seating</h4>
                <p style={{ color: '#78716c' }}>Reclining leather seats with cup holders</p>
              </div>
              <div>
                <h4 style={{ color: '#92400e', marginBottom: '10px' }}>Dolby Surround</h4>
                <p style={{ color: '#78716c' }}>Immersive audio experience</p>
              </div>
              <div>
                <h4 style={{ color: '#92400e', marginBottom: '10px' }}>Snack Bar</h4>
                <p style={{ color: '#78716c' }}>Popcorn, candy, and beverages</p>
              </div>
            </div>
          </div>

          {/* Book Tickets */}
          <div style={{ 
            backgroundColor: '#7c2d12', 
            color: 'white', 
            padding: '40px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '2rem' }}>
              Book Your Tickets
            </h2>
            <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', opacity: '0.9' }}>
              Reserve your seats now for the best movie experience at sea
            </p>
            <button style={{ 
              backgroundColor: 'white', 
              color: '#7c2d12', 
              padding: '15px 40px', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Select Showtime
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;