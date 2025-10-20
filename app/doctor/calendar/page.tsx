"use client"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Settings,
  Users,
  Video,
} from "lucide-react"
import { useState } from "react"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockAppointments = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    time: "09:00 AM",
    duration: "30 min",
    type: "Consultation",
    status: "Confirmed",
    mode: "Video Call",
  },
  {
    id: "2",
    patientName: "Michael Chen",
    time: "10:30 AM",
    duration: "45 min",
    type: "Follow-up",
    status: "Confirmed",
    mode: "In-Person",
  },
  {
    id: "3",
    patientName: "Emily Davis",
    time: "02:00 PM",
    duration: "30 min",
    type: "Consultation",
    status: "Pending",
    mode: "Video Call",
  },
  {
    id: "4",
    patientName: "David Wilson",
    time: "03:30 PM",
    duration: "30 min",
    type: "Check-up",
    status: "Confirmed",
    mode: "In-Person",
  },
]

const timeSlots = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const stats = [
  {
    title: "Today's Appointments",
    value: "8",
    icon: CalendarDays,
    change: "+2",
  },
  { title: "This Week", value: "32", icon: Users, change: "+12%" },
  { title: "Available Hours", value: "6.5h", icon: Clock, change: "remaining" },
]

export default function DoctorCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "default"
      case "Pending":
        return "secondary"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getModeIcon = (mode: string) => {
    return mode === "Video Call" ? Video : MapPin
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/doctor" },
          { label: "Calendar", href: "/doctor/calendar", isActive: true },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule and appointments
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Availability
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
              />

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Block Time
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Set Availability
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Calendar View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="day" className="w-full">
                <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                  <TabsTrigger value="day">Day View</TabsTrigger>
                  <TabsTrigger value="week">Week View</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>

                <TabsContent value="day" className="space-y-4">
                  <div className="space-y-2">
                    {timeSlots.map((time) => {
                      const appointment = mockAppointments.find(
                        (apt) => apt.time === time
                      )
                      const ModeIcon = appointment
                        ? getModeIcon(appointment.mode)
                        : null

                      return (
                        <div
                          key={time}
                          className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50"
                        >
                          <div className="w-20 text-sm font-medium text-muted-foreground">
                            {time}
                          </div>
                          <div className="flex-1">
                            {appointment ? (
                              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border">
                                <div className="flex items-center space-x-3">
                                  {ModeIcon && (
                                    <ModeIcon className="h-4 w-4 text-primary" />
                                  )}
                                  <div>
                                    <p className="font-medium">
                                      {appointment.patientName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {appointment.type} •{" "}
                                      {appointment.duration}
                                    </p>
                                  </div>
                                </div>
                                <Badge
                                  variant={getStatusVariant(appointment.status)}
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                            ) : (
                              <div className="p-3 border-2 border-dashed border-muted rounded-lg text-center text-muted-foreground">
                                Available
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="week" className="space-y-4">
                  <div className="grid grid-cols-8 gap-2">
                    <div className="p-2"></div>
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        className="p-2 text-center font-medium text-sm"
                      >
                        {day}
                      </div>
                    ))}
                    {timeSlots.slice(0, 10).map((time) => (
                      <>
                        <div
                          key={time}
                          className="p-2 text-xs text-muted-foreground"
                        >
                          {time}
                        </div>
                        {weekDays.map((day) => (
                          <div key={`${day}-${time}`} className="p-1">
                            <div className="h-12 border rounded text-xs bg-muted/20"></div>
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="appointments" className="space-y-4">
                  <div className="space-y-4">
                    {mockAppointments.map((appointment) => {
                      const ModeIcon = getModeIcon(appointment.mode)
                      return (
                        <Card key={appointment.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <ModeIcon className="h-4 w-4 text-primary" />
                                  <div>
                                    <p className="font-medium">
                                      {appointment.patientName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {appointment.time} •{" "}
                                      {appointment.duration}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    {appointment.type}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {appointment.mode}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={getStatusVariant(appointment.status)}
                                >
                                  {appointment.status}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
