// src/recoil/authState.js
import { atom, selector } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    isLoading: true,
    isLoggedIn: false,
    user: null,
  },
});

export const checkAuthSelector = selector({
  key: 'checkAuthSelector',
  get: async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/checkauth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const { data } = await response.json();
        return { isLoggedIn: true, user: data };
      } else {
        return { isLoggedIn: false, user: null };
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
      // window.location.href="/signin"
      return { isLoggedIn: false, user: null };
    }
  },
});