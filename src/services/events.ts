import { useQuery } from '@tanstack/react-query';
import { apiClient } from './api';

export interface EventItem {
  id?: number | string;
  event_id?: number | string;
  title?: string;
  event_name?: string;
  date?: string;
  event_date?: string;
  endDate?: string;
  time?: string;
  event_time?: string;
  location?: string;
  event_location?: string;
  price?: string;
  event_price?: string;
  tags?: string[];
  category?: string;
  isFavorite?: boolean;
  [key: string]: unknown;
}

export interface EventsListingResponse {
  data: {
    events?: EventItem[];
    // Adjust based on if it's paginated or just an array
    [key: string]: unknown;
  };
  message?: string;
  success?: boolean;
}

export const fetchEvents = async (filters: Record<string, unknown> = {}) => {
  // Using POST method as per Postman collection for fetching the listing
  const { data } = await apiClient.post<EventsListingResponse>(
    '/events-listing',
    filters,
  );
  return data;
};

export const useEventsListing = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => fetchEvents(filters),
  });
};
