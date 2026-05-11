"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Minus, Plus, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import locationIcon from "../../assets/images/locationIcon.png"
import userMultiple from "../../assets/images/userMultiple.png"
import refreshIcon from "../../assets/images/refreshIcon.png"
import arrowLeftIcon from "../../assets/images/arrowLeftIcon.png"
import { AudioOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

interface GuestCounts {
  adults: number
  children: number
  infants: number
  pets: boolean
}

export default function BookingSearch() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showGuestSheet, setShowGuestSheet] = useState(false)
  const [selectedCalendarType, setSelectedCalendarType] = useState<"checkin" | "checkout" | null>(null)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: false,
  })
  const [location, setLocation] = useState("")

  const isFormValid = () => {
    return location.trim() !== "" && checkInDate !== null && checkOutDate !== null && getTotalGuests() > 0
  }

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

     
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        (checkInDate && checkInDate.getDate() === day) || (checkOutDate && checkOutDate.getDate() === day)
      const isHighlighted = day === 12 || day === 18 // Based on your image

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`p-2 text-sm rounded-full w-8 h-8 flex items-center justify-center ${isSelected || isHighlighted ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day)

    if (selectedCalendarType === "checkin") {
      setCheckInDate(selectedDate)
    } else if (selectedCalendarType === "checkout") {
      setCheckOutDate(selectedDate)
    }
  }

  const handleCalendarApply = () => {
    setShowCalendar(false)
    setSelectedCalendarType(null)
  }

  const openCalendar = (type: "checkin" | "checkout") => {
    setSelectedCalendarType(type)
    setShowCalendar(true)
  }

  const updateGuestCount = (type: keyof GuestCounts, increment: boolean) => {
    setGuestCounts((prev) => {
      if (type === "pets") {
        return { ...prev, pets: !prev.pets }
      }

      const currentValue = prev[type] as number
      const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1)

      return { ...prev, [type]: newValue }
    })
  }

  const getTotalGuests = () => {
    return guestCounts.adults + guestCounts.children + guestCounts.infants
  }

  const getGuestDisplayText = () => {
    const parts = []

    if (guestCounts.adults > 0) {
      parts.push(`${guestCounts.adults} adult${guestCounts.adults > 1 ? "s" : ""}`)
    }

    if (guestCounts.children > 0) {
      parts.push(`${guestCounts.children} child${guestCounts.children > 1 ? "ren" : ""}`)
    }

    if (guestCounts.infants > 0) {
      parts.push(`${guestCounts.infants} infant${guestCounts.infants > 1 ? "s" : ""}`)
    }

    if (guestCounts.pets) {
      parts.push("pets allowed")
    }

    return parts.length > 0 ? parts.join(", ") : "Select guests"
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const handleUseCurrentLocation = () => {
   
    setLocation("Karachi, Pakistan")

     
    // navigator.geolocation.getCurrentPosition((pos) => {
    //   const { latitude, longitude } = pos.coords
    //   setLocation(`Lat: ${latitude}, Lng: ${longitude}`)
    // })
  }
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white px-4 py-6 flex items-center justify-between border-b">
        <img
          src={arrowLeftIcon}
          alt="arrowLeftIcon"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-medium">Search</h1>
        <img
          src={refreshIcon}
          alt="refreshIcon"
          onClick={() => navigate(0)}
        />

      </div>

      {/* Search Form */}
      <div className="p-4 space-y-6">
        {/* Where */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Where</label>
          <div className="relative">
            <img src={locationIcon} alt="locationIcon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search your next visit..."
              className="pl-10 py-6 text-base"
            />
            <AudioOutlined className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
          </div>
          <Button
            type="button"
            onClick={handleUseCurrentLocation}
            variant="outline"
            className="mt-2 text-sm bg-black text-white px-2 py-5"
          >
            <Target className="w-5 h-5" />
            User current location
          </Button>
        </div>

        {/* When */}
        <div>
          <label className="text-sm font-medium text-black-700 mb-2 block">When</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => openCalendar("checkin")}
              className="flex items-center justify-between p-4 border rounded-lg bg-white text-left"
            >
              <span className="text-gray-500 text-sm">{checkInDate ? formatDate(checkInDate) : "Check-in"}</span>
              <Calendar className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => openCalendar("checkout")}
              className="flex items-center justify-between p-4 border rounded-lg bg-white text-left"
            >
              <span className="text-gray-500 text-sm">{checkOutDate ? formatDate(checkOutDate) : "Check-out"}</span>
              <Calendar className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Who */}
        <div>
          <label className="text-sm font-medium text-black-700 mb-2 block">Who</label>
          <button
            onClick={() => setShowGuestSheet(true)}
            className="flex items-center justify-between w-full p-4 border rounded-lg bg-white text-left"
          >
            <div className="flex items-center space-x-2">
              <img src={userMultiple} alt="targetIcon" className=" w-5 h-5" />
              <span className="text-gray-900">{getGuestDisplayText()}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t grid grid-cols-2 gap-3">
        <Button variant="outline" className="py-3 bg-transparent">
          Cancel
        </Button>
        <Button
          disabled={!isFormValid()}
          className={`py-3 ${isFormValid() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed hover:bg-gray-300"}`}
          style={{
            background: 'linear-gradient(to right, #7BBCEE, #3195E2, #0D67AC)',
            border: 'none'
          }}
        >
          Search
        </Button>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <button>
                <ChevronDown className="w-5 h-5 rotate-90" />
              </button>
              <h2 className="font-medium">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button>
                <ChevronDown className="w-5 h-5 -rotate-90" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="text-xs text-gray-500 text-center p-2 font-medium">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setShowCalendar(false)} className="py-2">
                Cancel
              </Button>
              <Button onClick={handleCalendarApply} className="py-2 bg-blue-500 hover:bg-blue-600"
                style={{
                  background: 'linear-gradient(to right, #7BBCEE, #3195E2, #0D67AC)',
                  border: 'none'
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Guest Selection Bottom Sheet */}
      {showGuestSheet && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-end z-50">
          <div className="bg-white rounded-t-lg w-full p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Guests</h2>
              <Button
                onClick={() => setShowGuestSheet(false)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-1 text-sm"
                style={{
                  background: 'linear-gradient(to right, #7BBCEE, #3195E2, #0D67AC)',
                  border: 'none'
                }}
              >
                Done
              </Button>
            </div>

            <div className="space-y-6">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Adults</div>
                  <div className="text-sm text-gray-500">Ages 13 or above</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGuestCount("adults", false)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{guestCounts.adults}</span>
                  <button
                    onClick={() => updateGuestCount("adults", true)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Children</div>
                  <div className="text-sm text-gray-500">Ages 2-12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGuestCount("children", false)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{guestCounts.children}</span>
                  <button
                    onClick={() => updateGuestCount("children", true)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Infants</div>
                  <div className="text-sm text-gray-500">Under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGuestCount("infants", false)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{guestCounts.infants}</span>
                  <button
                    onClick={() => updateGuestCount("infants", true)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pets */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Pets</div>
                  <div className="text-sm text-gray-500">Bringing a service animal?</div>
                </div>
                <button
                  onClick={() => updateGuestCount("pets", false)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${guestCounts.pets
                      ? "bg-[#0D67AC] border-[#0D67AC]"  
                      : "border-gray-300"
                    }`}
                >
                  {guestCounts.pets && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
