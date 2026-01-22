import React, { useState, useEffect } from "react";
import AppLayout from "../Layout/AppLayout";
import Navbar from "../Navbar/Navbar";
import Carousel from "../Carousel/Carousel";
import BookingCart from "../Booking/BookingCart";
import RoomCard from "../Room/RoomCard";
import RoomDetails from "../Room/RoomDetails";
import ConfirmBooking from "../ConfirmBooking/ConfirmBooking";
import Login from "../Login/Login";
import ChatBot from "../ChatBot/ChatBot";
import { dataStore } from "../../utils/dataStore";

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmBooking, setShowConfirmBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    const rooms = dataStore.getAllRooms();
    setAllRooms(rooms);
    setFilteredRooms(rooms);

    const unsubscribe = dataStore.subscribe((updatedRooms) => {
      setAllRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRemove = (bookingIndex) => {
    setBookings((prev) => prev.filter((_, index) => index !== bookingIndex));
  };

  const handleUpdateGuests = (bookingIndex, guests) => {
    setBookings(prev => prev.map((booking, index) => 
      index === bookingIndex ? { ...booking, guests } : booking
    ));
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRoom(null);
  };

  const handleBookRoom = (room) => {
    setBookings(prev => [...prev, room]);
    setShowDetails(false);
    setSelectedRoom(null);
  };

  const handleReserve = (bookings) => {
    setSelectedBooking(bookings);
    setShowConfirmBooking(true);
  };

  const handleBackToListings = () => {
    setShowConfirmBooking(false);
    setSelectedBooking(null);
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredRooms(allRooms);
    } else {
      const filtered = allRooms.filter(room => 
        room.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  };

  const handleNavbarLogin = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatBotToggle = () => {
    setShowChatBot(!showChatBot);
  };

  if (showLogin) {
    return (
      <Login onLoginSuccess={handleLoginSuccess} onBack={() => setShowLogin(false)} />
    );
  }

  if (showConfirmBooking) {
    return (
      <ConfirmBooking 
        bookings={selectedBooking}
        onBack={handleBackToListings}
      />
    );
  }
  return (
    <>
      {/* Carousel with gap from navbar */}
      <div className="mt-2">
        <Carousel />
      </div>
      
      {/* Main Content */}
      <div className="container py-4">
        <div className="row">
          <div className={bookings.length > 0 ? "col-lg-8" : "col-12"}>
            <h2 className="mb-4 fw-bold">Available Rooms</h2>
            <div className="row g-4">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className={bookings.length > 0 ? "col-md-6 col-lg-4" : "col-md-4 col-lg-3"}
                >
                  <RoomCard room={room} onViewDetails={handleViewDetails} />
                </div>
              ))}
            </div>
          </div>

          {bookings.length > 0 && (
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="sticky-content">
                <BookingCart
                  bookings={bookings}
                  onRemove={handleRemove}
                  onReserve={handleReserve}
                  onUpdateGuests={handleUpdateGuests}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <RoomDetails
        room={selectedRoom}
        show={showDetails}
        onClose={handleCloseDetails}
        onBook={handleBookRoom}
        existingBookings={bookings}
      />

      {/* Fixed Buttons */}
      <div style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000}}>
        {/* Chatbot Button */}
        <button 
          className="btn btn-primary rounded-circle mb-3 shadow"
          style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #ff385c, #e61e4d)', border: 'none'}}
          onClick={handleChatBotToggle}
          title="Chat with us"
        >
          <i className="fas fa-comments fs-5"></i>
        </button>
        
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button 
            className="btn btn-secondary rounded-circle shadow d-block"
            style={{width: '50px', height: '50px'}}
            onClick={scrollToTop}
            title="Scroll to top"
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        )}
      </div>

      {/* ChatBot Component */}
      <ChatBot 
        isOpen={showChatBot} 
        onClose={() => setShowChatBot(false)} 
      />
    </>
  );
};

export default HomePage;

