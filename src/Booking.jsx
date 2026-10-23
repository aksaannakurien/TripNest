
import { useState } from 'react'
import './Booking.css'

const transportOptions = [
  {
    id: 'ksrtc',
    type: 'Bus',
    name: 'KSRTC Kerala',
    route: 'Kochi → Munnar',
    departure: '07:30 AM',
    arrival: '12:00 PM',
    price: 188,
    note: 'Non-AC bus · Road transfer',
  },
  {
    id: 'megha',
    type: 'Bus',
    name: 'AC Tourist Bus',
    route: 'Kochi → Munnar',
    departure: '08:00 AM',
    arrival: '12:15 PM',
    price: 522,
    note: 'AC seater · Sample option',
  },
  {
    id: 'cab',
    type: 'Private cab',
    name: 'Private SUV Transfer',
    route: 'Kochi → Munnar',
    departure: 'Your preferred time',
    arrival: 'Approx. 4–5 hours',
    price: 3500,
    note: 'Private vehicle · Per vehicle',
  },
  {
    id: 'train',
    type: 'Train + road transfer',
    name: 'Rail connection to Aluva',
    route: 'Rail station → road transfer → Munnar',
    departure: 'Depends on train',
    arrival: 'Depends on connection',
    price: 850,
    note: 'Illustrative combined fare; not a train timetable',
  },
  {
    id: 'flight',
    type: 'Flight + road transfer',
    name: 'Cochin Airport connection',
    route: 'Airport → road transfer → Munnar',
    departure: 'Depends on flight',
    arrival: 'Depends on connection',
    price: 1800,
    note: 'Illustrative transfer estimate; flight not included',
  },
]

const hotels = [
  {
    id: 'tea-county',
    name: 'KTDC Tea County',
    location: 'Munnar town, Kerala',
    room: 'Standard room',
    price: 3500,
    note: 'Hill resort',
  },
  {
    id: 'panoramic',
    name: 'The Panoramic Getaway',
    location: 'Chithirapuram, Munnar',
    room: 'Deluxe room',
    price: 5500,
    note: 'Resort-style stay',
  },
  {
    id: 'fragrant',
    name: 'Fragrant Nature Munnar',
    location: 'Pothamedu, Munnar',
    room: 'Mountain-view room',
    price: 6500,
    note: 'Premium stay',
  },
]

const seats = Array.from({ length: 20 }, (_, index) =>
  `S${String(index + 1).padStart(2, '0')}`
)

function Booking({ trip, onBack }) {
  const today = new Date().toLocaleDateString('en-CA')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Kochi',
    date: '2026-12-20',
    returnDate: '2026-12-23',
    travellers: '1',
    transportType: 'Bus',
    hotelId: 'tea-county',
    roomType: 'Standard room',
    rooms: '1',
  })

  const [transportId, setTransportId] = useState('ksrtc')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [booking, setBooking] = useState(null)

  const options = transportOptions.filter(
    (option) => option.type === form.transportType
  )

  const selectedTransport =
    options.find((option) => option.id === transportId) || options[0]

  const selectedHotel =
    hotels.find((hotel) => hotel.id === form.hotelId) || hotels[0]

  const nights =
    form.date && form.returnDate && form.returnDate > form.date
      ? Math.round(
          (new Date(`${form.returnDate}T12:00:00`) -
            new Date(`${form.date}T12:00:00`)) /
            86400000
        )
      : 0

  const travellers = Number(form.travellers)
  const roomCount = Number(form.rooms)

  const transportCost =
    selectedTransport?.type === 'Private cab'
      ? selectedTransport.price
      : (selectedTransport?.price || 0) * travellers

  const hotelCost = selectedHotel.price * nights * roomCount
  const packageCost = trip.price * travellers
  const totalPrice = packageCost + transportCost + hotelCost

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))

    if (name === 'transportType') {
      const nextOption = transportOptions.find(
        (option) => option.type === value
      )
      setTransportId(nextOption?.id || '')
      setSelectedSeats([])
    }
  }

  function toggleSeat(seat) {
    setSelectedSeats((previous) => {
      if (previous.includes(seat)) {
        return previous.filter((item) => item !== seat)
      }

      if (previous.length >= travellers) {
        return previous
      }

      return [...previous, seat]
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (form.returnDate < form.date) {
      setError('Return date must be on or after departure.')
      return
    }

    if (nights < 1) {
      setError('Choose a return date after your departure date.')
      return
    }

    if (!selectedTransport) {
      setError('Please select a transport option.')
      return
    }

    if (selectedSeats.length !== travellers) {
      setError(`Please select ${travellers} seat(s) for your travellers.`)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          source: form.source,
          destination: trip.name,
          travelDate: form.date,
          returnDate: form.returnDate,
          travellers,
          transportType: selectedTransport.type,
          transportName: selectedTransport.name,
          transportRoute: selectedTransport.route,
          departureTime: selectedTransport.departure,
          arrivalTime: selectedTransport.arrival,
          transportPrice: transportCost,
          selectedSeats,
          hotelName: selectedHotel.name,
          hotelLocation: selectedHotel.location,
          roomType: form.roomType || selectedHotel.room,
          rooms: roomCount,
          hotelPricePerNight: selectedHotel.price,
          hotelNights: nights,
          totalPrice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Booking failed.')
      }

      setBooking(data.booking)
    } catch (err) {
      setError(
        err.message.includes('Failed to fetch')
          ? 'Cannot connect to the backend. Check that the backend is running.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  if (booking) {
    return (
      <main className="booking-page">
        <div className="booking-card success-card">
          <div className="success-icon">✓</div>
          <p className="booking-eyebrow">TRIPNEST BOOKING</p>
          <h1>Booking request saved!</h1>
          <p>
            Thank you, {booking.customerName}. Your request has been saved.
          </p>
          <div className="booking-summary">
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>From:</strong> {booking.source}</p>
            <p><strong>Destination:</strong> {booking.destination}</p>
            <p><strong>Departure:</strong> {booking.travelDate}</p>
            <p><strong>Return:</strong> {booking.returnDate}</p>
            <p><strong>Transport:</strong> {booking.transportName}</p>
            <p><strong>Seats:</strong> {booking.selectedSeats?.join(', ')}</p>
            <p><strong>Hotel:</strong> {booking.hotelName}</p>
            <p><strong>Room:</strong> {booking.roomType}</p>
            <p>
              <strong>Total estimate:</strong>{' '}
              ₹{booking.totalPrice?.toLocaleString('en-IN')}
            </p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>
          <p className="demo-note">
            Demo booking only. Transport and hotel reservations have not been
            confirmed with the providers.
          </p>
          <button className="booking-submit" onClick={onBack}>
            Back to packages
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="booking-page">
      <button className="back-button" onClick={onBack}>
        ← Back to packages
      </button>

      <div className="booking-layout">
        <section className="booking-card">
          <p className="booking-eyebrow">PLAN YOUR GETAWAY</p>
          <h1>Customize your trip</h1>
          <p className="booking-description">
            Select transport, seats and accommodation.
          </p>

          <form onSubmit={handleSubmit}>
            <h2>Traveller details</h2>

            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name}
              onChange={handleChange} required />

            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" value={form.email}
              onChange={handleChange} required />

            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" value={form.phone}
              onChange={handleChange} required />

            <label htmlFor="source">Starting location</label>
            <input id="source" name="source" value={form.source}
              onChange={handleChange} required />

            <label htmlFor="date">Departure date</label>
            <input id="date" name="date" type="date" value={form.date}
              min={today} onChange={handleChange} required />

            <label htmlFor="returnDate">Return date</label>
            <input id="returnDate" name="returnDate" type="date"
              value={form.returnDate} min={form.date || today}
              onChange={handleChange} required />

            <label htmlFor="travellers">Travellers</label>
            <select id="travellers" name="travellers"
              value={form.travellers} onChange={(event) => {
                handleChange(event)
                setSelectedSeats([])
              }}>
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? 'traveller' : 'travellers'}
                </option>
              ))}
            </select>

            <h2>1. Choose transport</h2>

            <label htmlFor="transportType">Transport type</label>
            <select id="transportType" name="transportType"
              value={form.transportType} onChange={handleChange}>
              <option value="Bus">Bus</option>
              <option value="Train + road transfer">Train + road transfer</option>
              <option value="Flight + road transfer">Flight + road transfer</option>
              <option value="Private cab">Private cab</option>
            </select>

            <div className="travel-options">
              {options.map((option) => (
                <label className="travel-option" key={option.id}>
                  <input type="radio" name="transportChoice"
                    checked={transportId === option.id}
                    onChange={() => {
                      setTransportId(option.id)
                      setSelectedSeats([])
                    }} />
                  <span>
                    <strong>{option.name}</strong>
                    <small>{option.route}</small>
                    <small>{option.departure} · {option.arrival}</small>
                    <small>{option.note}</small>
                  </span>
                  <strong>
                    ₹{option.price.toLocaleString('en-IN')}
                    {option.type === 'Private cab' ? '/vehicle' : '/person'}
                  </strong>
                </label>
              ))}
            </div>

            <h2>2. Select your seats</h2>
            <p className="booking-description">
              Select {travellers} seat(s). The sample seat map is not live
              provider inventory.
            </p>

            <div className="seat-grid">
              {seats.map((seat, index) => (
                <button
                  type="button"
                  key={seat}
                  className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                  onClick={() => toggleSeat(seat)}
                  aria-pressed={selectedSeats.includes(seat)}
                  title={`Sample seat ${seat}`}
                >
                  {seat}
                </button>
              ))}
            </div>
            <p className="demo-note">
              Selected seats: {selectedSeats.join(', ') || 'None yet'}
            </p>

            <h2>3. Choose a hotel</h2>

            <label htmlFor="hotelId">Hotel in the destination area</label>
            <select id="hotelId" name="hotelId" value={form.hotelId}
              onChange={handleChange}>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </select>

            <div className="hotel-details">
              <h3>{selectedHotel.name}</h3>
              <p>{selectedHotel.location}</p>
              <p>{selectedHotel.note}</p>
              <p>Sample rate: ₹{selectedHotel.price.toLocaleString('en-IN')} per room per night</p>
            </div>

            <label htmlFor="roomType">Room type</label>
            <select id="roomType" name="roomType" value={form.roomType}
              onChange={handleChange}>
              <option value="Standard room">Standard room</option>
              <option value="Deluxe room">Deluxe room</option>
              <option value="Mountain-view room">Mountain-view room</option>
              <option value="Family room">Family room</option>
            </select>

            <label htmlFor="rooms">Number of rooms</label>
            <select id="rooms" name="rooms" value={form.rooms}
              onChange={handleChange}>
              {[1, 2, 3, 4].map((number) => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>

            <h2>4. Price summary</h2>
            <div className="booking-summary">
              <p>Package: ₹{packageCost.toLocaleString('en-IN')}</p>
              <p>Transport: ₹{transportCost.toLocaleString('en-IN')}</p>
              <p>Hotel ({nights} nights): ₹{hotelCost.toLocaleString('en-IN')}</p>
              <p><strong>Total estimate: ₹{totalPrice.toLocaleString('en-IN')}</strong></p>
            </div>

            {error && <p role="alert" className="booking-error">{error}</p>}

            <button className="booking-submit" type="submit"
              disabled={loading}>
              {loading ? 'Saving booking...' : 'Save booking request →'}
            </button>
          </form>
        </section>

        <aside className="trip-summary">
          <img src={trip.image} alt={trip.name} />
          <div className="trip-summary-content">
            <span className="summary-tag">{trip.category}</span>
            <h2>{trip.name}</h2>
            <p>📍 {trip.location}</p>
            <p>◷ {trip.days}</p>
            <div className="summary-price">
              <span>Package price per person</span>
              <strong>₹{trip.price.toLocaleString('en-IN')}</strong>
            </div>
            <p className="summary-note">
              Transport and hotel rates are illustrative. No live availability
              or provider reservation is confirmed.
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Booking
