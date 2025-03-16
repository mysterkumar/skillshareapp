import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { Colors } from "../constants/styles";
import { supabase } from "../config/supabase";
import AddEventModal from "../components/Events/AddEventModal"; // Add this import
import { AuthContext } from "../store/auth-context";

function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      Alert.alert("Error", "Could not fetch events");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddEvent(newEvent) {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      let imageUrl = newEvent.image;

      // If the image is from device (not a Picsum URL)
      if (!imageUrl.includes("picsum")) {
        const file = newEvent.image.split("/").pop();
        const path = `events/${Date.now()}_${file}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("events")
          .upload(path, {
            uri: newEvent.image,
            type: "image/jpeg",
            name: file,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("events").getPublicUrl(path);

        imageUrl = publicUrl;
      }

      const { data, error } = await supabase
        .from("events")
        .insert([{ ...newEvent, image: imageUrl, user_id: userData.user.id }])
        .select();

      if (error) throw error;

      setEvents((currentEvents) => [data[0], ...currentEvents]);
      setShowAddModal(false);
      Alert.alert("Success", "Event added successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Error adding event:", error);
    }
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary500} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.title}>Upcoming Events</Text>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => {
              // Handle event selection
              console.log("Selected event:", item);
            }}
          >
            <Image
              source={{
                uri:
                  item.image || `https://picsum.photos/seed/${item.id}/300/200`,
              }}
              style={styles.eventImage}
            />
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>Date: {item.date}</Text>
              <Text style={styles.eventLocation}>
                Location: {item.location}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events found</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Event</Text>
      </TouchableOpacity>

      <AddEventModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddEvent}
      />
    </View>
  );
}

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  eventItem: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  eventImage: {
    width: "100%",
    height: 150,
  },
  eventDetails: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: Colors.primary500,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});
