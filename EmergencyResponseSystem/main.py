import time
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

# Sample emergency responders (volunteers) and their locations
volunteers = {
    'Volunteer1': (40.7128, -74.0060),  # New York City
    'Volunteer2': (34.0522, -118.2437),  # Los Angeles
    'Volunteer3': (41.8781, -87.6298),   # Chicago
    # Add more volunteers and their locations here
}

def find_nearest_volunteer(emergency_location):
    nearest_volunteer = None
    min_distance = float('inf')

    for volunteer, location in volunteers.items():
        distance = geodesic(emergency_location, location).miles
        if distance < min_distance:
            min_distance = distance
            nearest_volunteer = volunteer

    return nearest_volunteer

def report_emergency():
    print("Please enter your emergency location:")
    try:
        location_name = input()

        geolocator = Nominatim(user_agent="location_converter")
        location = geolocator.geocode(location_name, exactly_one=True)

        if location:
            emergency_location = (location.latitude, location.longitude)

            nearest_volunteer = find_nearest_volunteer(emergency_location)
            if nearest_volunteer:
                print(f"Emergency reported! The nearest volunteer is {nearest_volunteer}.")
                # Here, you could connect with a real emergency service or notify the volunteer
            else:
                print("No volunteer available at the moment. Please try again later.")
        else:
            print("Location not found for the given place name. Please check the spelling and try again.")

    except Exception as e:
        print("An error occurred:", e)

def main():
    print("Welcome to the Emergency Response System!")
    while True:
        print("\nMenu:")
        print("1. Report Emergency")
        print("2. Exit")

        choice = input("Enter your choice (1 or 2): ")

        if choice == '1':
            report_emergency()
        elif choice == '2':
            print("Exiting the Emergency Response System. Stay safe!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
