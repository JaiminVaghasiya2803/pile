import React, { useCallback, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react-native";
import { EventsScreenProps } from "./interface";
import { useStyles } from "./styles";
import { RootState, AppDispatch } from "../../store";
import { useTheme } from "../../hooks/useTheme";
import {
  toggleFavorite,
  selectIsFavorite,
} from "../../store/slices/eventsSlice";
import { logout } from "../../store/slices/authSlice";
import { useEventsListing, EventItem } from "../../services/events";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/EventCard/EventCard";

const EventsScreen: React.FC<EventsScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isGuest } = useSelector((state: RootState) => state.auth);
  const { favoriteIds } = useSelector((state: RootState) => state.events);

  const {
    data,
    isLoading: isApiLoading,
    isError,
    refetch,
    isRefetching,
  } = useEventsListing({});

  useEffect(() => {
    if (isError) {
      Alert.alert(
        "Connection Error",
        "Could not fetch the latest events. Please check your internet connection.",
        [{ text: "OK" }],
      );
    }
  }, [isError]);

  const { isDark } = useTheme();
  const styles = useStyles({ theme: isDark ? "dark" : "light" });

  const handleToggleFavorite = useCallback(
    (eventDateId: number) => {
      if (isGuest) {
        Alert.alert(
          "Sign In Required",
          "Please sign in to save events to your favorites.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Sign In", onPress: () => dispatch(logout()) },
          ],
        );
        return;
      }
      dispatch(toggleFavorite(eventDateId));
    },
    [dispatch, isGuest],
  );

  const handleEventPress = useCallback((event: EventItem) => {
    console.log("Event pressed:", event.event_name);
  }, []);

  const events: EventItem[] = useMemo(() => {
    return data?.data?.events ?? [];
  }, [data]);

  const renderEvent = useCallback(
    ({ item }: { item: EventItem }) => (
      <EventCard
        event={item}
        isFavorite={selectIsFavorite(favoriteIds, item.event_date_id)}
        onToggleFavorite={handleToggleFavorite}
        onPress={handleEventPress}
      />
    ),
    [handleToggleFavorite, handleEventPress, favoriteIds],
  );

  const displayName = useMemo(() => {
    if (user) {
      return user.usr_fname || user.usr_username || "there";
    }
    return isGuest ? "Guest" : "there";
  }, [user, isGuest]);

  const headerComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello {displayName}!</Text>
          <Text style={styles.subtitle}>Are you ready to dance?</Text>
        </View>
      </View>
    ),
    [styles, displayName, isDark],
  );

  const emptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No events found</Text>
      </View>
    ),
    [styles.emptyContainer, styles.emptyText],
  );

  const loadingComponent = useMemo(
    () => (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#21D393" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      </SafeAreaView>
    ),
    [styles],
  );

  const listComponent = useMemo(
    () => (
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.event_date_id.toString()}
        style={styles.listContainer}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#21D393"
            colors={["#21D393"]}
          />
        }
      />
    ),
    [
      events,
      renderEvent,
      styles.eventsList,
      styles.listContainer,
      emptyComponent,
      isRefetching,
      refetch,
    ],
  );

  if (isApiLoading && events.length === 0) {
    return loadingComponent;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {headerComponent}
      {listComponent}
    </SafeAreaView>
  );
};

export default EventsScreen;
