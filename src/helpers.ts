export function getCurrentDateFormatted(): string {
  const today: Date = new Date();

  const year: number = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return `${year}-${month}-${day}`;
}

// storage.js
export const Storage = {
  /**
   * Store data with optional expiration
   * @param {string} key - Storage key
   * @param {any} value - Data to store
   * @param {number} expiresInHours - Expiration time in hours (optional)
   */
  set: <T>(key: string, value: T, expiresInHours?: number): void => {
    const data = {
      value,
      ...(expiresInHours && { 
        expiresAt: Date.now() + (expiresInHours * 60 * 60 * 1000) 
      })
    };
    localStorage.setItem(key, JSON.stringify(data));
  },

  /**
   * Retrieve data if still valid
   * @param {string} key - Storage key
   * @returns {T|null} Stored value or null if expired/missing
   */
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const { value, expiresAt } = JSON.parse(item);
      
      if (expiresAt && Date.now() > expiresAt) {
        Storage.remove(key);
        return null;
      }
      
      return value as T;
    } catch (e) {
      console.error(`Failed to parse storage data for key "${key}"`, e);
      Storage.remove(key);
      return null;
    }
  },

  /**
   * Remove stored data
   * @param {string} key - Storage key
   */
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  /**
   * Check if data exists and is valid
   * @param {string} key - Storage key
   */
  has: (key: string): boolean => {
    return Storage.get(key) !== null;
  }
};


// storage.js
export const Session = {
  /**
   * Store data with optional expiration
   * @param {string} key - Storage key
   * @param {any} value - Data to store
   * @param {number} expiresInHours - Expiration time in hours (optional)
   */
  set: <T>(key: string, value: T, expiresInHours?: number): void => {
    const data = {
      value,
      ...(expiresInHours && { 
        expiresAt: Date.now() + (expiresInHours * 60 * 60 * 1000) 
      })
    };
    sessionStorage.setItem(key, JSON.stringify(data));
  },

  /**
   * Retrieve data if still valid
   * @param {string} key - Storage key
   * @returns {T|null} Stored value or null if expired/missing
   */
  get: <T>(key: string): T | null => {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    try {
      const { value, expiresAt } = JSON.parse(item);
      
      if (expiresAt && Date.now() > expiresAt) {
        Storage.remove(key);
        return null;
      }
      
      return value as T;
    } catch (e) {
      console.error(`Failed to parse storage data for key "${key}"`, e);
      Storage.remove(key);
      return null;
    }
  },

  /**
   * Remove stored data
   * @param {string} key - Storage key
   */
  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  },

  /**
   * Check if data exists and is valid
   * @param {string} key - Storage key
   */
  has: (key: string): boolean => {
    return Storage.get(key) !== null;
  }
};


export const AuthStorage = {
  setToken: (token: string, expiresInHours = 24): void => {
    Session.set('auth', { token }, expiresInHours);
  },
  getToken: (): string | null => {
    const data = Session.get<{ token: string }>('auth');
    return data?.token || null;
  },
  clearToken: (): void => {
    Session.remove('auth');
  },
  hasToken: (): boolean => {
    return Session.has('auth');
  }
};

// authStorage.js - Example of specialized wrapper
export const UserStorage = {
  setData: (data: string, expiresInHours = 24): void => {
    Storage.set('user-data', { data }, expiresInHours);
  },
  getData: (): string | null => {
    const data = Storage.get<{ data: string }>('user-data');
    return data?.data || null;
  },
  clearData: (): void => {
    Storage.remove('user-data');
  },
  hasData: (): boolean => {
    return Storage.has('user-data');
  }
};