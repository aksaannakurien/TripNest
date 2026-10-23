
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    source: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    travelDate: { type: String, required: true },
    returnDate: { type: String, required: true },
    travellers: { type: Number, required: true, min: 1 },

    transportType: {
      type: String,
      required: true,
      enum: [
        'Bus',
        'Train + road transfer',
        'Flight + road transfer',
        'Private cab',
      ],
    },
    transportName: { type: String, required: true },
    transportRoute: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    transportPrice: { type: Number, required: true, min: 0 },
    selectedSeats: {
      type: [String],
      required: true,
      validate: {
        validator: function (seats) {
          return seats.length === this.travellers
        },
        message: 'Select one seat for each traveller.',
      },
    },

    hotelName: { type: String, required: true },
    hotelLocation: { type: String, required: true },
    roomType: { type: String, required: true },
    rooms: { type: Number, required: true, min: 1 },
    hotelPricePerNight: { type: Number, required: true, min: 0 },
    hotelNights: { type: Number, required: true, min: 1 },

    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', bookingSchema)

app.get('/', (req, res) => {
  res.send('TripNest backend is running!')
})

// Create a booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      travelDate,
      returnDate,
      travellers,
      selectedSeats,
      transportPrice,
      hotelPricePerNight,
      hotelNights,
      rooms,
      totalPrice,
    } = req.body

    if (!travelDate || !returnDate || returnDate <= travelDate) {
      return res.status(400).json({
        message: 'Return date must be after departure date.',
      })
    }

    if (
      !Array.isArray(selectedSeats) ||
      selectedSeats.length !== Number(travellers)
    ) {
      return res.status(400).json({
        message: 'Select one seat for each traveller.',
      })
    }

    if (
      !Number.isFinite(Number(transportPrice)) ||
      !Number.isFinite(Number(hotelPricePerNight)) ||
      !Number.isFinite(Number(hotelNights)) ||
      !Number.isFinite(Number(rooms)) ||
      !Number.isFinite(Number(totalPrice))
    ) {
      return res.status(400).json({
        message: 'Invalid price or room details.',
      })
    }

    const booking = await Booking.create(req.body)

    res.status(201).json({
      message: 'Booking request saved successfully!',
      booking,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Could not save booking.',
      error: error.message,
    })
  }
})

// Retrieve all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({
      message: 'Could not retrieve bookings.',
    })
  }
})

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from your .env file.')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully!')

    app.listen(PORT, () => {
      console.log(`TripNest backend running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Backend startup failed:', error.message)
    process.exit(1)
  }
}

startServer()
