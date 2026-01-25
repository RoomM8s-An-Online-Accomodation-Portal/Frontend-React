import { roomsData } from '../data/roomsData';

class DataStore {
  constructor() {
    this.rooms = [...roomsData];
    this.bookings = JSON.parse(localStorage.getItem('globalBookings') || '[]');
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notify() {
    this.listeners.forEach(callback => callback(this.rooms));
  }

  getAllRooms() {
    return [...this.rooms];
  }

  getOwnerRooms(ownerEmail) {
    return this.rooms.filter(room => room.ownerEmail === ownerEmail);
  }

  addRoom(roomData) {
    const newRoom = {
      ...roomData,
      id: Math.max(...this.rooms.map(r => r.id), 0) + 1,
      earnAmount: 0
    };
    this.rooms.push(newRoom);
    this.notify();
    return newRoom;
  }

  removeRoom(roomId) {
    this.rooms = this.rooms.filter(room => room.id !== roomId);
    this.notify();
  }

  updateRoom(roomId, updatedData) {
    const index = this.rooms.findIndex(room => room.id === roomId);
    if (index !== -1) {
      this.rooms[index] = { ...this.rooms[index], ...updatedData };
      this.notify();
      return this.rooms[index];
    }
    return null;
  }

  addBooking(booking) {
    const bookingWithId = {
      ...booking,
      bookingId: Date.now(),
      userId: localStorage.getItem('userEmail') || 'anonymous'
    };
    this.bookings.push(bookingWithId);
    localStorage.setItem('globalBookings', JSON.stringify(this.bookings));
    return bookingWithId;
  }

  getAllBookings() {
    return [...this.bookings];
  }

  // Global admin actions
  updateUserStatus(userEmail, status) {
    const adminActions = JSON.parse(localStorage.getItem('adminActions') || '[]');
    const action = {
      id: Date.now(),
      type: 'USER_STATUS_UPDATE',
      userEmail,
      status,
      timestamp: new Date().toISOString(),
      adminEmail: localStorage.getItem('userEmail')
    };
    adminActions.push(action);
    localStorage.setItem('adminActions', JSON.stringify(adminActions));
    
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('adminAction', { detail: action }));
    return action;
  }

  updatePropertyStatus(propertyId, status) {
    const adminActions = JSON.parse(localStorage.getItem('adminActions') || '[]');
    const action = {
      id: Date.now(),
      type: 'PROPERTY_STATUS_UPDATE',
      propertyId,
      status,
      timestamp: new Date().toISOString(),
      adminEmail: localStorage.getItem('userEmail')
    };
    adminActions.push(action);
    localStorage.setItem('adminActions', JSON.stringify(adminActions));
    
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('adminAction', { detail: action }));
    return action;
  }

  deleteProperty(propertyId) {
    const adminActions = JSON.parse(localStorage.getItem('adminActions') || '[]');
    const action = {
      id: Date.now(),
      type: 'PROPERTY_DELETE',
      propertyId,
      timestamp: new Date().toISOString(),
      adminEmail: localStorage.getItem('userEmail')
    };
    adminActions.push(action);
    localStorage.setItem('adminActions', JSON.stringify(adminActions));
    
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('adminAction', { detail: action }));
    return action;
  }

  getAdminActions() {
    return JSON.parse(localStorage.getItem('adminActions') || '[]');
  }

  isRoomAvailable(roomId, checkInDate, checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    return !this.bookings.some(booking => {
      if (booking.id !== roomId) return false;

      const existingCheckIn = new Date(booking.checkInDate);
      const existingCheckOut = new Date(booking.checkOutDate);

      return checkIn < existingCheckOut && checkOut > existingCheckIn;
    });
  }
}

export const dataStore = new DataStore();