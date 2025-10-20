"use client"

import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeslotsCardProps {
  doctorId: string
  doctorName: string
}

// Mock timeslots data - in a real app, this would come from an API
const generateTimeslots = () => {
  const slots = []
  const today = new Date()

  for (let day = 0; day < 14; day++) {
    const date = new Date(today)
    date.setDate(today.getDate() + day)

    // Skip Sundays for this example
    if (date.getDay() === 0) continue

    const daySlots = []
    const startHour = 9
    const endHour = 17

    for (let hour = startHour; hour < endHour; hour++) {
      for (const minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        const isBooked = Math.random() < 0.3 // 30% chance of being booked

        daySlots.push({
          time,
          available: !isBooked,
        })
      }
    }

    slots.push({
      date: date.toISOString().split("T")[0],
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      slots: daySlots,
    })
  }

  return slots
}

export function TimeslotsCard({ doctorId, doctorName }: TimeslotsCardProps) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [currentWeekStart, setCurrentWeekStart] = useState(0)

  const timeslots = generateTimeslots()
  const currentWeek = timeslots.slice(currentWeekStart, currentWeekStart + 7)

  const handlePrevWeek = () => {
    if (currentWeekStart > 0) {
      setCurrentWeekStart(currentWeekStart - 7)
      setSelectedDate("")
      setSelectedTime("")
    }
  }

  const handleNextWeek = () => {
    if (currentWeekStart + 7 < timeslots.length) {
      setCurrentWeekStart(currentWeekStart + 7)
      setSelectedDate("")
      setSelectedTime("")
    }
  }

  const selectedDay = timeslots.find((day) => day.date === selectedDate)
  const availableSlots =
    selectedDay?.slots.filter((slot) => slot.available) || []

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      // In a real app, this would navigate to the booking form
      window.location.href = `/book?doctor=${doctorId}&date=${selectedDate}&time=${selectedTime}`
    }
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevWeek}
            disabled={currentWeekStart === 0}
            aria-label="Previous week"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">
            {currentWeek[0]?.month} {currentWeek[0]?.dayNumber} -{" "}
            {currentWeek[currentWeek.length - 1]?.month}{" "}
            {currentWeek[currentWeek.length - 1]?.dayNumber}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextWeek}
            disabled={currentWeekStart + 7 >= timeslots.length}
            aria-label="Next week"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Date Selection */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Select Date
          </h4>
          <div className="grid grid-cols-7 gap-1">
            {currentWeek.map((day) => (
              <button
                type="button"
                key={day.date}
                onClick={() => {
                  setSelectedDate(day.date)
                  setSelectedTime("")
                }}
                className={`p-2 text-center rounded-lg border transition-colors ${
                  selectedDate === day.date
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                }`}
                aria-label={`Select ${day.dayName} ${day.month} ${day.dayNumber}`}
              >
                <div className="text-xs font-medium">{day.dayName}</div>
                <div className="text-sm">{day.dayNumber}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Available Times ({availableSlots.length} slots)
            </h4>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {availableSlots.map((slot) => (
                <button
                  type="button"
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    selectedTime === slot.time
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label={`Select time ${slot.time}`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            {availableSlots.length === 0 && (
              <p className="text-sm text-gray-600 text-center py-4">
                No available slots for this date
              </p>
            )}
          </div>
        )}

        {/* Selected Appointment Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Selected Appointment
            </h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Doctor:</strong> {doctorName}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
            </div>
          </div>
        )}

        {/* Book Button */}
        <Button
          onClick={handleBookAppointment}
          disabled={!selectedDate || !selectedTime}
          className="w-full"
          size="lg"
        >
          {selectedDate && selectedTime
            ? "Book Appointment"
            : "Select Date & Time"}
        </Button>

        {/* Note */}
        <p className="text-xs text-gray-600 text-center">
          Appointments can be cancelled up to 24 hours in advance
        </p>
      </CardContent>
    </Card>
  )
}
