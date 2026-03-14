import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ArrowRight, Heart } from 'lucide-react-native';
import { ShareIcon } from '../Icons';
import { EventCardProps } from './interface';
import { useStyles } from './styles';
import { useTheme } from '../../hooks/useTheme';

const EventCard: React.FC<EventCardProps> = ({
  event,
  onToggleFavorite,
  onPress,
}) => {
  const { isDark } = useTheme();
  const styles = useStyles({ theme: isDark ? 'dark' : 'light' });

  const imageUrl = useMemo(() => {
    if (!event.image) {
      return {
        uri: 'https://via.placeholder.com/150/000000/FFFFFF?text=DANCE',
      };
    }

    if (typeof event.image === 'string') {
      return { uri: event.image };
    }

    return event.image;
  }, [event.image]);

  const iconColor = isDark ? '#FFF' : '#000';

  return (
    <TouchableOpacity style={styles.eventCard} onPress={() => onPress(event)}>
      <Image source={imageUrl} style={styles.eventImage} resizeMode="cover" />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {event.title}
          </Text>
          <View style={styles.arrowButton}>
            <ArrowRight size={18} color={iconColor} />
          </View>
        </View>

        <Text style={styles.eventDate}>
          {event.date} {event.endDate ? `– ${event.endDate}` : ''}
          {event.time ? ` @ ${event.time}` : ''}
        </Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
        <Text style={styles.eventPrice}>{event.price || '€30 - €100'}</Text>

        <View style={styles.eventFooter}>
          <View style={styles.eventTags}>
            {event.tags?.map((tag, index) => (
              <View key={`${tag}-${index}`} style={styles.eventTag}>
                <Text style={styles.eventTagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.eventActions}>
            <TouchableOpacity style={styles.actionButton}>
              <ShareIcon width={18} height={18} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => onToggleFavorite(event.id || '')}
            >
              <Heart
                size={18}
                color={event.isFavorite ? '#21D393' : iconColor}
                fill={event.isFavorite ? '#21D393' : 'none'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(EventCard);
