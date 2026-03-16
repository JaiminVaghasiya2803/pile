import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ArrowRight, Heart } from "lucide-react-native";
import { ShareIcon } from "../Icons";
import { EventCardProps } from "./interface";
import { useStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import { formatEventPrice } from "../../store/slices/eventsSlice";

const EventCard: React.FC<EventCardProps> = ({
  event,
  onToggleFavorite,
  onPress,
  isFavorite,
}) => {
  const { isDark } = useTheme();
  const styles = useStyles({ theme: isDark ? "dark" : "light" });

  const imageSource = useMemo(() => {
    if (event.event_profile_img) {
      return { uri: event.event_profile_img };
    }
    return {
      uri: "https://via.placeholder.com/150/1A1A2E/FFFFFF?text=DANCE",
    };
  }, [event.event_profile_img]);

  const iconColor = isDark ? "#FFF" : "#000";

  const locationText = useMemo(() => {
    const parts = [event.city, event.country].filter(Boolean);
    return parts.join(", ");
  }, [event.city, event.country]);

  const dateText = useMemo(() => {
    if (event.readable_from_date && event.readable_to_date) {
      return `${event.readable_from_date} – ${event.readable_to_date}`;
    }
    return event.readable_from_date || "";
  }, [event.readable_from_date, event.readable_to_date]);

  const priceText = useMemo(() => formatEventPrice(event), [event]);

  // Tags: use keywords from API, fallback to dance style names
  const tags = useMemo(() => {
    if (event.keywords && event.keywords.length > 0) {
      return event.keywords.slice(0, 3);
    }
    if (event.danceStyles && event.danceStyles.length > 0) {
      return event.danceStyles.map((ds) => ds.ds_name).slice(0, 3);
    }
    return [];
  }, [event.keywords, event.danceStyles]);

  return (
    <TouchableOpacity style={styles.eventCard} onPress={() => onPress(event)}>
      <Image
        source={imageSource}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {event.event_name}
          </Text>
          <View style={styles.arrowButton}>
            <ArrowRight size={18} color={iconColor} />
          </View>
        </View>

        <View style={styles.eventDateRow}>
          <Text style={styles.eventDate} numberOfLines={1}>
            {dateText}
          </Text>
          <Text style={styles.eventLocation} numberOfLines={1}>
            {locationText}
          </Text>
        </View>
        <Text style={styles.eventPrice}>{priceText}</Text>

        <View style={styles.eventFooter}>
          <View style={styles.eventTags}>
            {tags.map((tag, index) => (
              <View key={`${tag}-${index}`} style={styles.eventTag}>
                <Text style={styles.eventTagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.eventActions}>
            <TouchableOpacity style={styles.actionButton}>
              <ShareIcon width={24} height={24} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => onToggleFavorite(event.event_date_id)}
            >
              <Heart
                size={24}
                color={isFavorite ? "#21D393" : iconColor}
                fill={isFavorite ? "#21D393" : "none"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(EventCard);
