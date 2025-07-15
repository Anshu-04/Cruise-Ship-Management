import React from 'react';

const Fitness = () => {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#dc2626', 
        color: 'white', 
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
          Voyager Fitness Center
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.1rem', opacity: '0.9' }}>
          State-of-the-art fitness facilities and wellness programs at sea
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Facilities */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '50px'
          }}>
            <div style={{ 
              backgroundColor: '#fef2f2', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #fecaca'
            }}>
              <h3 style={{ color: '#dc2626', marginBottom: '15px', fontSize: '1.4rem' }}>
                Gym Equipment
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Modern equipment with ocean views to keep you motivated during your workout.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Cardio machines (treadmills, bikes, ellipticals)</li>
                <li>Free weights and resistance equipment</li>
                <li>Functional training area</li>
                <li>Stretching and yoga mats</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#fef2f2', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #fecaca'
            }}>
              <h3 style={{ color: '#dc2626', marginBottom: '15px', fontSize: '1.4rem' }}>
                Group Classes
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Join energizing group fitness classes led by certified instructors.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Morning yoga and meditation</li>
                <li>High-intensity interval training</li>
                <li>Aqua aerobics (pool deck)</li>
                <li>Dance fitness classes</li>
              </ul>
            </div>

            <div style={{ 
              backgroundColor: '#fef2f2', 
              padding: '30px', 
              borderRadius: '12px',
              border: '1px solid #fecaca'
            }}>
              <h3 style={{ color: '#dc2626', marginBottom: '15px', fontSize: '1.4rem' }}>
                Personal Training
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                One-on-one sessions with professional trainers to achieve your fitness goals.
              </p>
              <ul style={{ color: '#475569', lineHeight: '1.8' }}>
                <li>Fitness assessments and goal setting</li>
                <li>Customized workout plans</li>
                <li>Nutrition guidance</li>
                <li>Specialized training programs</li>
              </ul>
            </div>
          </div>

          {/* Class Schedule */}
          <div style={{ 
            backgroundColor: '#fef2f2', 
            padding: '40px', 
            borderRadius: '12px',
            marginBottom: '40px'
          }}>
            <h3 style={{ color: '#dc2626', marginBottom: '30px', fontSize: '1.8rem', textAlign: 'center' }}>
              Today's Schedule
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#dc2626', marginBottom: '10px' }}>7:00 AM</h4>
                <p style={{ color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Sunrise Yoga</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Deck 12 - 45 minutes</p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#dc2626', marginBottom: '10px' }}>9:00 AM</h4>
                <p style={{ color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>HIIT Training</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Fitness Center - 30 minutes</p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#dc2626', marginBottom: '10px' }}>11:00 AM</h4>
                <p style={{ color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Aqua Aerobics</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Pool Deck - 45 minutes</p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#dc2626', marginBottom: '10px' }}>4:00 PM</h4>
                <p style={{ color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Dance Fitness</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Studio - 60 minutes</p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#dc2626', marginBottom: '10px' }}>6:00 PM</h4>
                <p style={{ color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Sunset Yoga</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Deck 12 - 45 minutes</p>
              </div>
            </div>
          </div>

          {/* Book Session */}
          <div style={{ 
            backgroundColor: '#dc2626', 
            color: 'white', 
            padding: '40px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '2rem' }}>
              Book Your Fitness Session
            </h2>
            <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', opacity: '0.9' }}>
              Stay active and healthy during your cruise adventure
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{ 
                backgroundColor: 'white', 
                color: '#dc2626', 
                padding: '15px 30px', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                Join Class
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
                Book Personal Trainer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;