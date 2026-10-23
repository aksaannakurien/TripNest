
import { useState } from 'react'
import './App.css'
import Booking from './Booking'

const packages = [
  {
    id: 1,
    name: 'Misty Munnar',
    location: 'Kerala, India',
    days: '3 Days / 2 Nights',
    price: 4999,
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Alleppey Backwaters',
    location: 'Kerala, India',
    days: '2 Days / 1 Night',
    price: 3499,
    category: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Goa Beach Escape',
    location: 'Goa, India',
    days: '4 Days / 3 Nights',
    price: 7999,
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Coorg Green Trails',
    location: 'Karnataka, India',
    days: '3 Days / 2 Nights',
    price: 5499,
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Jaipur Heritage Tour',
    location: 'Rajasthan, India',
    days: '3 Days / 2 Nights',
    price: 6499,
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Himalayan Adventure',
    location: 'Himachal Pradesh, India',
    days: '5 Days / 4 Nights',
    price: 9999,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    name: 'Wayanad Forest Retreat',
    location: 'Kerala, India',
    days: '3 Days / 2 Nights',
    price: 4499,
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    name: 'Kochi Coastal Explorer',
    location: 'Kerala, India',
    days: '2 Days / 1 Night',
    price: 2999,
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    name: 'Varkala Cliff & Beach',
    location: 'Kerala, India',
    days: '2 Days / 1 Night',
    price: 3299,
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    name: 'Thekkady Wildlife Escape',
    location: 'Kerala, India',
    days: '3 Days / 2 Nights',
    price: 4999,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    name: 'Kovalam Beach Holiday',
    location: 'Kerala, India',
    days: '3 Days / 2 Nights',
    price: 4599,
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 12,
    name: 'Ooty Mountain Getaway',
    location: 'Tamil Nadu, India',
    days: '3 Days / 2 Nights',
    price: 5999,
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 13,
    name: 'Kodaikanal Misty Hills',
    location: 'Tamil Nadu, India',
    days: '3 Days / 2 Nights',
    price: 5499,
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 14,
    name: 'Mysuru Royal Weekend',
    location: 'Karnataka, India',
    days: '2 Days / 1 Night',
    price: 3799,
    category: 'Culture',
    image:  'https://commons.wikimedia.org/wiki/Special:FilePath/Mysore_Palace,_Mysuru,_Karnataka,_India.jpg?width=800',
  },
  {
    id: 15,
    name: 'Agra Taj Mahal Escape',
    location: 'Uttar Pradesh, India',
    days: '2 Days / 1 Night',
    price: 4999,
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 16,
    name: 'Udaipur Lake City',
    location: 'Rajasthan, India',
    days: '3 Days / 2 Nights',
    price: 6999,
    category: 'Culture',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/City_Palace_by_lake_Pichola,_Udaipur.jpg?width=800',
  },
  {
    id: 17,
    name: 'Rishikesh River Adventure',
    location: 'Uttarakhand, India',
    days: '3 Days / 2 Nights',
    price: 5999,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 18,
    name: 'Andaman Island Escape',
    location: 'Andaman and Nicobar Islands, India',
    days: '5 Days / 4 Nights',
    price: 14999,
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
  },
]

const itineraries = {
  1: [
    { day: 'Day 1', title: 'Arrival & Tea Gardens', places: 'Arrive in Munnar, check in, visit tea plantations and enjoy the mountain views.' },
    { day: 'Day 2', title: 'Munnar Sightseeing', places: 'Explore Mattupetty Dam, Echo Point and Kundala Lake.' },
    { day: 'Day 3', title: 'Nature & Departure', places: 'Visit Eravikulam National Park if open and time permits, then depart.' },
  ],
  2: [
    { day: 'Day 1', title: 'Backwater Experience', places: 'Arrive in Alleppey, explore the canals and enjoy a backwater cruise.' },
    { day: 'Day 2', title: 'Beach & Departure', places: 'Visit Alappuzha Beach, enjoy the coastal views and depart.' },
  ],
  3: [
    { day: 'Day 1', title: 'Beach Arrival', places: 'Check in and spend the evening at Baga or Calangute Beach.' },
    { day: 'Day 2', title: 'North Goa Exploration', places: 'Explore Fort Aguada, Anjuna Beach and nearby markets.' },
    { day: 'Day 3', title: 'Old Goa', places: 'Visit Old Goa churches and explore Panjim.' },
    { day: 'Day 4', title: 'Relax & Depart', places: 'Enjoy breakfast, take a final beach walk and depart.' },
  ],
  4: [
    { day: 'Day 1', title: 'Arrive in Coorg', places: 'Check in, visit Raja’s Seat and enjoy the sunset.' },
    { day: 'Day 2', title: 'Coffee & Nature', places: 'Explore a coffee estate and visit Abbey Falls.' },
    { day: 'Day 3', title: 'Local Exploration', places: 'Visit Madikeri Fort and depart.' },
  ],
  5: [
    { day: 'Day 1', title: 'Pink City Arrival', places: 'Visit Hawa Mahal, City Palace and local markets.' },
    { day: 'Day 2', title: 'Forts & Views', places: 'Explore Amber Fort and Jaigarh Fort.' },
    { day: 'Day 3', title: 'Culture & Departure', places: 'Visit Jantar Mantar and enjoy a final local-food stop.' },
  ],
  6: [
    { day: 'Day 1', title: 'Arrive in the Hills', places: 'Check in and explore Shimla Mall Road.' },
    { day: 'Day 2', title: 'Mountain Views', places: 'Visit Kufri, subject to weather and local conditions.' },
    { day: 'Day 3', title: 'Explore Shimla', places: 'Visit Jakhoo Temple and nearby viewpoints.' },
    { day: 'Day 4', title: 'Scenic Journey', places: 'Enjoy a relaxed mountain day or a local excursion.' },
    { day: 'Day 5', title: 'Departure', places: 'Have breakfast, check out and depart.' },
  ],
  7: [
    { day: 'Day 1', title: 'Forest Getaway', places: 'Arrive in Wayanad and visit Pookode Lake.' },
    { day: 'Day 2', title: 'Waterfalls & Caves', places: 'Explore Soochipara Falls and Edakkal Caves, subject to access.' },
    { day: 'Day 3', title: 'Nature & Departure', places: 'Enjoy a relaxed morning and depart.' },
  ],
  8: [
    { day: 'Day 1', title: 'Historic Fort Kochi', places: 'Explore Fort Kochi, the Chinese fishing nets and St. Francis Church.' },
    { day: 'Day 2', title: 'Culture & Departure', places: 'Visit Mattancherry Palace and Jew Town before departing.' },
  ],
  9: [
    { day: 'Day 1', title: 'Cliffside Escape', places: 'Arrive in Varkala and enjoy the cliff walk and beach.' },
    { day: 'Day 2', title: 'Beach Morning', places: 'Relax at Papanasam Beach and depart.' },
  ],
  10: [
    { day: 'Day 1', title: 'Into Thekkady', places: 'Check in and explore Kumily town.' },
    { day: 'Day 2', title: 'Wildlife & Spice', places: 'Explore Periyar Tiger Reserve activities and a spice garden.' },
    { day: 'Day 3', title: 'Relax & Depart', places: 'Enjoy breakfast and depart.' },
  ],
  11: [
    { day: 'Day 1', title: 'Kovalam Coast', places: 'Visit Lighthouse Beach and enjoy the sunset.' },
    { day: 'Day 2', title: 'Coastal Relaxation', places: 'Explore Hawa Beach and nearby coastal viewpoints.' },
    { day: 'Day 3', title: 'Last Beach Morning', places: 'Enjoy a relaxed breakfast and depart.' },
  ],
  12: [
    { day: 'Day 1', title: 'Welcome to Ooty', places: 'Explore Ooty Lake and the town centre.' },
    { day: 'Day 2', title: 'Gardens & Hills', places: 'Visit the Government Botanical Garden and Doddabetta Peak.' },
    { day: 'Day 3', title: 'Scenic Morning', places: 'Enjoy a local tea stop and depart.' },
  ],
  13: [
    { day: 'Day 1', title: 'Arrive in Kodaikanal', places: 'Explore Kodaikanal Lake and Bryant Park.' },
    { day: 'Day 2', title: 'Valleys & Viewpoints', places: 'Visit Coaker’s Walk and Pillar Rocks.' },
    { day: 'Day 3', title: 'Morning in the Hills', places: 'Enjoy the town and depart.' },
  ],
  14: [
    { day: 'Day 1', title: 'Royal Mysuru', places: 'Visit Mysore Palace and explore Devaraja Market.' },
    { day: 'Day 2', title: 'Hilltop & Departure', places: 'Visit Chamundi Hills and depart.' },
  ],
  15: [
    { day: 'Day 1', title: 'Taj Mahal', places: 'Visit the Taj Mahal and explore Agra Fort.' },
    { day: 'Day 2', title: 'Agra Morning', places: 'Explore local handicrafts and depart.' },
  ],
  16: [
    { day: 'Day 1', title: 'Lakeside Udaipur', places: 'Explore Lake Pichola and the old city.' },
    { day: 'Day 2', title: 'Palaces & Gardens', places: 'Visit City Palace and Saheliyon-ki-Bari.' },
    { day: 'Day 3', title: 'Culture & Departure', places: 'Explore local markets and depart.' },
  ],
  17: [
    { day: 'Day 1', title: 'Arrive in Rishikesh', places: 'Explore the riverside and attend the evening Ganga Aarti.' },
    { day: 'Day 2', title: 'River Adventure', places: 'Try a permitted rafting trip or explore local bridges and cafes.' },
    { day: 'Day 3', title: 'Peaceful Morning', places: 'Visit a riverside ashram area and depart.' },
  ],
  18: [
    { day: 'Day 1', title: 'Island Arrival', places: 'Arrive in Port Blair and explore the waterfront.' },
    { day: 'Day 2', title: 'Island History', places: 'Visit Cellular Jail and attend the light-and-sound show if available.' },
    { day: 'Day 3', title: 'Beach Day', places: 'Travel to Havelock Island and explore Radhanagar Beach, subject to ferry schedules.' },
    { day: 'Day 4', title: 'Island Exploration', places: 'Enjoy a beach visit or optional water activity.' },
    { day: 'Day 5', title: 'Return & Departure', places: 'Allow time for ferry and airport transfers before departure.' },
  ],
}


function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedTrip, setSelectedTrip] = useState(null)

  const filteredPackages = packages.filter((trip) => {
    const matchesSearch =
      trip.name.toLowerCase().includes(search.toLowerCase()) ||
      trip.location.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || trip.category === category

    return matchesSearch && matchesCategory
  })

  // Show the booking page when a package is selected.
  if (selectedTrip) {
    return (
      <Booking
        trip={selectedTrip}
        onBack={() => setSelectedTrip(null)}
      />
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <a className="logo" href="#">✈ TripNest</a>

        <div className="nav-links">
          <a href="#packages">Explore</a>
          <a href="#about">About</a>
          <a className="nav-button" href="#packages">Find a Trip</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h1>
            Discover places.
            <br />
            Create <span>memories.</span>
          </h1>

          <p>
            Find your perfect getaway without the planning headache.
          </p>

          <a className="primary-button" href="#packages">
            Explore Packages ↓
          </a>
        </div>
      </header>

      <main>
        <section className="packages-section" id="packages">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>Explore travel packages</h2>
              <p>
                From peaceful escapes to unforgettable adventures.
              </p>
            </div>

            <span className="trip-count">
              {filteredPackages.length} trips
            </span>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="🔍 Search destinations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="All">All experiences</option>
              <option value="Nature">Nature</option>
              <option value="Beach">Beach</option>
              <option value="Relaxation">Relaxation</option>
              <option value="Culture">Culture</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>

          <div className="package-grid">
            {filteredPackages.map((trip) => (
              <article className="trip-card" key={trip.id}>
                <div className="trip-image">
                  <img src={trip.image} alt={trip.name} />
                  <span className="category-tag">
                    {trip.category}
                  </span>
                </div>

                <div className="trip-info">
                  <p className="trip-location">
                    📍 {trip.location}
                  </p>

                  <h3>{trip.name}</h3>

                  <p className="trip-duration">
                    ◷ {trip.days}
                  </p>

                  <div className="trip-footer">
                    <div>
                      <span className="price-label">
                        Starting from
                      </span>

                      <p className="trip-price">
                        ₹{trip.price.toLocaleString('en-IN')}
                        <span> / person</span>
                      </p>
                    </div>

                    <button
                      className="book-button"
                      onClick={() => setSelectedTrip(trip)}
                    >
                      View Trip ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <p className="empty-state">
              No trips found. Try another destination!
            </p>
          )}
        </section>

        <section className="about-section" id="about">
          <span className="eyebrow">TRAVEL YOUR WAY</span>

          <h2>
            Less planning stress.
            <br />
            More moments to remember.
          </h2>

          <p>
            Discover destinations, compare travel packages and find an
            adventure that fits your budget.
          </p>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#">✈ TripNest</a>
        <p>Made for your next great escape.</p>
        <span>© 2026 TripNest · Demo project</span>
      </footer>
    </div>
  )
}

export default App
