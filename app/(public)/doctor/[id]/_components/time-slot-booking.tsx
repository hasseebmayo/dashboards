"use client"

import { Check, Clock, MapPin, Video } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  isOnline?: boolean
}

interface DaySlot {
  date: string
  dayName: string
  fullDate: string
  slots: TimeSlot[]
}

interface TimeSlotBookingProps {
  doctorName: string
  consultationFee: number
  onBooking?: (slotId: string, type: "online" | "in-person") => void
}

// Mock data for available slots
const mockAvailableSlots: DaySlot[] = [
  {
    date: "Today",
    dayName: "Mon",
    fullDate: "Dec 18, 2023",
    slots: [
      { id: "1", time: "2:30 PM", available: true, isOnline: true },
      { id: "2", time: "3:15 PM", available: true, isOnline: true },
      { id: "3", time: "4:00 PM", available: false },
      { id: "4", time: "5:30 PM", available: true },
    ],
  },
  {
    date: "Tomorrow",
    dayName: "Tue",
    fullDate: "Dec 19, 2023",
    slots: [
      { id: "5", time: "9:00 AM", available: true, isOnline: true },
      { id: "6", time: "10:30 AM", available: true },
      { id: "7", time: "11:15 AM", available: false },
      { id: "8", time: "1:00 PM", available: true, isOnline: true },
      { id: "9", time: "2:45 PM", available: true },
      { id: "10", time: "4:30 PM", available: true, isOnline: true },
    ],
  },
  {
    date: "Wed",
    dayName: "Wed",
    fullDate: "Dec 20, 2023",
    slots: [
      { id: "11", time: "9:30 AM", available: true },
      { id: "12", time: "11:00 AM", available: true, isOnline: true },
      { id: "13", time: "2:00 PM", available: true },
      { id: "14", time: "3:30 PM", available: false },
      { id: "15", time: "4:15 PM", available: true, isOnline: true },
    ],
  },
  {
    date: "Thu",
    dayName: "Thu",
    fullDate: "Dec 21, 2023",
    slots: [
      { id: "16", time: "10:00 AM", available: true, isOnline: true },
      { id: "17", time: "11:30 AM", available: true },
      { id: "18", time: "1:15 PM", available: true },
      { id: "19", time: "3:00 PM", available: true, isOnline: true },
      { id: "20", time: "4:45 PM", available: false },
    ],
  },
  {
    date: "Fri",
    dayName: "Fri",
    fullDate: "Dec 22, 2023",
    slots: [
      { id: "21", time: "9:15 AM", available: true },
      { id: "22", time: "10:45 AM", available: true, isOnline: true },
      { id: "23", time: "12:30 PM", available: true },
      { id: "24", time: "2:15 PM", available: true, isOnline: true },
    ],
  },
]

export function TimeSlotBooking({
  consultationFee,
  onBooking,
}: TimeSlotBookingProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [appointmentType, setAppointmentType] = useState<
    "online" | "in-person"
  >("online")

  const handleSlotSelect = (slotId: string, slot: TimeSlot) => {
    if (!slot.available) return
    setSelectedSlot(slotId)

    // Auto-select appointment type based on slot availability
    if (slot.isOnline) {
      setAppointmentType("online")
    } else {
      setAppointmentType("in-person")
    }
  }

  const handleBooking = () => {
    if (selectedSlot) {
      onBooking?.(selectedSlot, appointmentType)
    }
  }

  const selectedSlotInfo = mockAvailableSlots
    .flatMap((day) =>
      day.slots.map((slot) => ({ ...slot, date: day.fullDate }))
    )
    .find((slot) => slot.id === selectedSlot)

  return (
    <div className="space-y-8">
      {/* Appointment Type Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Choose Consultation Type
        </h3>
        <div className="flex gap-3">
          <Button
            variant={appointmentType === "online" ? "default" : "outline"}
            className={cn(
              "flex-1 h-12 text-left justify-start gap-3 transition-all",
              appointmentType === "online" &&
                "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            )}
            onClick={() => setAppointmentType("online")}
          >
            <div className="p-1.5 rounded-md bg-white/20">
              <Video className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">Video Call</div>
              <div className="text-xs opacity-80">Online consultation</div>
            </div>
          </Button>
          <Button
            variant={appointmentType === "in-person" ? "default" : "outline"}
            className={cn(
              "flex-1 h-12 text-left justify-start gap-3 transition-all",
              appointmentType === "in-person" &&
                "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            )}
            onClick={() => setAppointmentType("in-person")}
          >
            <div className="p-1.5 rounded-md bg-white/20">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">In-Person</div>
              <div className="text-xs opacity-80">Clinic visit</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Available Time Slots</h3>
        </div>

        <div className="space-y-6">
          {mockAvailableSlots.map((day) => (
            <div key={day.date} className="space-y-3">
              {/* Date Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                <div className="flex-shrink-0">
                  <div className="text-base font-semibold text-foreground">
                    {day.date}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {day.dayName}, {day.fullDate.split(",")[0]}
                  </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {day.slots.map((slot) => {
                  const isSelected = selectedSlot === slot.id
                  const isAvailable = slot.available
                  const isOnlineSlot = slot.isOnline

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      className={cn(
                        "relative h-12 rounded-lg border transition-all duration-200 text-sm font-medium",
                        "hover:scale-105 hover:shadow-md active:scale-95",
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/50 ring-offset-2"
                          : isAvailable
                            ? "bg-background border-border hover:border-primary/50 hover:bg-accent"
                            : "bg-muted/50 border-muted cursor-not-allowed opacity-60",
                        !isAvailable && "hover:scale-100 hover:shadow-none"
                      )}
                      disabled={!isAvailable}
                      onClick={() => handleSlotSelect(slot.id, slot)}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-xs font-semibold">
                          {slot.time}
                        </span>
                      </div>

                      {/* Online indicator */}
                      {isOnlineSlot &&
                        appointmentType === "online" &&
                        isAvailable && (
                          <div className="absolute -top-1 -right-1">
                            <div className="h-3 w-3 bg-green-500 rounded-full border-2 border-background">
                              <div className="h-full w-full bg-green-400 rounded-full animate-pulse" />
                            </div>
                          </div>
                        )}

                      {/* Unavailable overlay */}
                      {!isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-0.5 bg-destructive rounded rotate-45" />
                        </div>
                      )}

                      {/* Selection glow effect */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Summary */}
      {selectedSlot && selectedSlotInfo && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Appointment Confirmed
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your slot has been selected and is ready to book
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {selectedSlotInfo.date} at {selectedSlotInfo.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {appointmentType === "online" ? (
                      <Video className="h-4 w-4 text-primary" />
                    ) : (
                      <MapPin className="h-4 w-4 text-primary" />
                    )}
                    <span className="capitalize">{appointmentType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Fee:</span>
                    <span className="font-semibold text-lg text-primary">
                      ${consultationFee}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleBooking}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Confirm Booking
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSlot(null)}
                    className="border-border hover:bg-accent"
                  >
                    Change Time
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
