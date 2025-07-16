import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  chargingStations,
  userFavorites as initialFavorites,
} from "../data/mockData";

// Initial state
const initialState = {
  stations: chargingStations,
  filteredStations: chargingStations,
  selectedStation: null,
  userLocation: null,
  favorites: initialFavorites,
  filters: {
    status: "all",
    operator: "all",
    connectorType: "all",
    powerLevel: "all",
    priceRange: [0, 25],
    amenities: [],
    fastChargingOnly: false,
  },
  searchQuery: "",
  isLoading: false,
  error: null,
  mapCenter: [41.0082, 28.9784], // İstanbul merkez
  mapZoom: 12,
};

// Action types
const ActionTypes = {
  SET_STATIONS: "SET_STATIONS",
  SET_FILTERED_STATIONS: "SET_FILTERED_STATIONS",
  SET_SELECTED_STATION: "SET_SELECTED_STATION",
  SET_USER_LOCATION: "SET_USER_LOCATION",
  TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
  SET_FILTERS: "SET_FILTERS",
  UPDATE_FILTER: "UPDATE_FILTER",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_MAP_CENTER: "SET_MAP_CENTER",
  SET_MAP_ZOOM: "SET_MAP_ZOOM",
  CLEAR_FILTERS: "CLEAR_FILTERS",
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_STATIONS:
      return {
        ...state,
        stations: action.payload,
        filteredStations: action.payload,
      };

    case ActionTypes.SET_FILTERED_STATIONS:
      return {
        ...state,
        filteredStations: action.payload,
      };

    case ActionTypes.SET_SELECTED_STATION:
      return {
        ...state,
        selectedStation: action.payload,
      };

    case ActionTypes.SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };

    case ActionTypes.TOGGLE_FAVORITE:
      const stationId = action.payload;
      const newFavorites = state.favorites.includes(stationId)
        ? state.favorites.filter((id) => id !== stationId)
        : [...state.favorites, stationId];

      // Save to localStorage
      localStorage.setItem("evcharge-favorites", JSON.stringify(newFavorites));

      return {
        ...state,
        favorites: newFavorites,
      };

    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case ActionTypes.UPDATE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };

    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.SET_MAP_CENTER:
      return {
        ...state,
        mapCenter: action.payload,
      };

    case ActionTypes.SET_MAP_ZOOM:
      return {
        ...state,
        mapZoom: action.payload,
      };

    case ActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        searchQuery: "",
        filteredStations: state.stations,
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("evcharge-favorites");
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: ActionTypes.TOGGLE_FAVORITE, payload: favorites });
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    }
  }, []);

  // Filter stations based on current filters and search query
  useEffect(() => {
    let filtered = [...state.stations];

    // Apply search query
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (station) =>
          station.name.toLowerCase().includes(query) ||
          station.address.toLowerCase().includes(query) ||
          station.operator.toLowerCase().includes(query)
      );
    }

    // Apply filters
    const { filters } = state;

    if (filters.status !== "all") {
      filtered = filtered.filter(
        (station) => station.status === filters.status
      );
    }

    if (filters.operator !== "all") {
      filtered = filtered.filter(
        (station) => station.operator.toLowerCase() === filters.operator
      );
    }

    if (filters.connectorType !== "all") {
      filtered = filtered.filter((station) =>
        station.connectorType.toLowerCase().includes(filters.connectorType)
      );
    }

    if (filters.fastChargingOnly) {
      filtered = filtered.filter((station) => station.fastCharging);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (station) =>
          station.pricePerKwh >= filters.priceRange[0] &&
          station.pricePerKwh <= filters.priceRange[1]
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter((station) =>
        filters.amenities.some((amenity) => station.amenities.includes(amenity))
      );
    }

    dispatch({ type: ActionTypes.SET_FILTERED_STATIONS, payload: filtered });
  }, [state.searchQuery, state.filters, state.stations]);

  // Actions
  const actions = {
    setStations: (stations) =>
      dispatch({ type: ActionTypes.SET_STATIONS, payload: stations }),
    setSelectedStation: (station) =>
      dispatch({ type: ActionTypes.SET_SELECTED_STATION, payload: station }),
    setUserLocation: (location) =>
      dispatch({ type: ActionTypes.SET_USER_LOCATION, payload: location }),
    toggleFavorite: (stationId) =>
      dispatch({ type: ActionTypes.TOGGLE_FAVORITE, payload: stationId }),
    setFilters: (filters) =>
      dispatch({ type: ActionTypes.SET_FILTERS, payload: filters }),
    updateFilter: (key, value) =>
      dispatch({ type: ActionTypes.UPDATE_FILTER, payload: { key, value } }),
    setSearchQuery: (query) =>
      dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query }),
    setLoading: (loading) =>
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) =>
      dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    setMapCenter: (center) =>
      dispatch({ type: ActionTypes.SET_MAP_CENTER, payload: center }),
    setMapZoom: (zoom) =>
      dispatch({ type: ActionTypes.SET_MAP_ZOOM, payload: zoom }),
    clearFilters: () => dispatch({ type: ActionTypes.CLEAR_FILTERS }),
  };

  const value = {
    ...state,
    ...actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
