import { roomsData } from '../data/roomsData';

class DataStore {
  constructor() {
    this.rooms = [...roomsData];
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
}

export const dataStore = new DataStore();