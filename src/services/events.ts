import { useQuery } from '@tanstack/react-query';
import { apiClient } from './api';

export interface DanceStyle {
  ds_id: number;
  ds_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EventItem {
  event_id: number;
  event_name: string;
  description: string;
  event_profile_pic: string;
  event_profile_img: string;
  event_url: string;
  event_price_from: number;
  event_price_to: number;
  readable_from_date: string;
  readable_to_date: string;
  isFavorite: number; // 0 or 1 from API
  city: string;
  country: string;
  keywords: string[];
  danceStyles: DanceStyle[];
  event_date_id: number;
}

export interface EventsListingResponse {
  success: boolean;
  message: string;
  data: {
    events: EventItem[];
    total: number;
  };
}

export const fetchEvents = async (filters: Record<string, unknown> = {}) => {
  const { data } = await apiClient.post<EventsListingResponse>('/events-listing', filters);
  return data;
};

export const useEventsListing = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => fetchEvents(filters),
  });
};
