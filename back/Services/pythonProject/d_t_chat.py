class Passenger:
    def __init__(self, name, preference, companion=None):
        self.name = name
        self.preference = preference
        self.companion = companion

class Seat:
    def __init__(self, seat_number):
        self.seat_number = seat_number

def assign_seat(passenger):
    available_seats = [seat.seat_number for seat in seats if seat.seat_number not in assigned_seats.values()]
    if passenger.preference == "sleep":
        # Assign seats at the front for passengers who want to sleep
        if 1 in available_seats:
            return [1]
        else:
            return available_seats[:1]
    elif passenger.preference == "watch_movie":
        # Assign seats in the middle for passengers who want to watch a movie
        if 2 in available_seats:
            return [2]
        else:
            return available_seats[:1]
    elif passenger.preference == "read":
        # Assign seats in the middle for passengers who want to read
        if 3 in available_seats:
            return [3]
        else:
            return available_seats[:1]
    elif passenger.preference == "knit":
        # Assign seats in the back for passengers who want to knit
        if 4 in available_seats:
            return [4]
        else:
            return available_seats[:1]
    elif passenger.preference == "work":
        # Assign seats in the back for passengers who want to work
        if 5 in available_seats:
            return [5]
        else:
            return available_seats[:1]
    elif passenger.preference == "talk":
        # Assign any available seat for passengers who want to talk
        return available_seats[:1]  # Assign first available seat

# Define passengers and seats
passengers = [
    Passenger("Alice", "sleep", companion=2),
    Passenger("Bob", "read"),
    Passenger("Charlie", "talk"),
    Passenger("Diana", "talk"),
    Passenger("Eve", "talk")
]

seats = [Seat(i) for i in range(1, 11)]  # Assuming 10 seats in the plane
assigned_seats = {}  # Store assigned seats to avoid double assignment

# Assign seats to passengers based on preferences
for passenger in passengers:
    assigned_seats[passenger.name] = assign_seat(passenger)[0]  # Only the first seat is assigned
    print(f"{passenger.name} assigned to seat: {assigned_seats[passenger.name]}")
