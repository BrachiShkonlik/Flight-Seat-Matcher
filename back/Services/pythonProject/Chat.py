import pulp

class Passenger:
    def __init__(self, name, age, preference, companion=None, occupation=None):
        self.name = name
        self.age = age
        self.preference = preference
        self.companion = companion
        self.occupation = occupation

class Seat:
    def __init__(self, seat_number):
        self.seat_number = seat_number

# Define passengers and seats
passengers = [
    Passenger("Alice", 30, "sleep", companion=2),
    Passenger("Bob", 45, "read"),
    Passenger("Charlie", 25, "talk"),
    Passenger("Diana", 35, "talk"),
    Passenger("Eve", 40, "talk", occupation="architect")
]

num_seats = 10
seats = [Seat(i) for i in range(1, num_seats + 1)]

# Create ILP problem
prob = pulp.LpProblem("Seating Problem", pulp.LpMaximize)

# Define decision variables
passenger_seat_vars = pulp.LpVariable.dicts("PassengerSeat", ((p.name, s.seat_number) for p in passengers for s in seats), cat="Binary")

# Define constraints
# Constraint 1: Each passenger should be assigned exactly one seat
for passenger in passengers:
    prob += pulp.lpSum(passenger_seat_vars[passenger.name, seat.seat_number] for seat in seats) == 1

# Constraint 2: If a passenger has a companion, they should be seated next to each other
for passenger in passengers:
    if passenger.companion:
        companion_seat = passenger.companion
        prob += passenger_seat_vars[passenger.name, companion_seat] + passenger_seat_vars[passenger.name, companion_seat + 1] == 2

# Define objective function
# Maximize the total satisfaction of passengers based on their preferences
total_satisfaction = 0
for passenger in passengers:
    for seat in seats:
        if passenger.preference == "sleep":
            if seat.seat_number == 1:
                total_satisfaction += passenger_seat_vars[passenger.name, seat.seat_number]
        elif passenger.preference == "watch_movie":
            if seat.seat_number in [2, 3]:
                total_satisfaction += passenger_seat_vars[passenger.name, seat.seat_number]
        elif passenger.preference == "read":
            if seat.seat_number in [4, 5]:
                total_satisfaction += passenger_seat_vars[passenger.name, seat.seat_number]
        elif passenger.preference == "knit":
            if seat.seat_number in [6, 7]:
                total_satisfaction += passenger_seat_vars[passenger.name, seat.seat_number]
        elif passenger.preference == "work":
            if seat.seat_number in [8, 9]:
                total_satisfaction += passenger_seat_vars[passenger.name, seat.seat_number]
        elif passenger.preference == "talk":
            if not passenger.companion:  # Skip passengers with companions
                total_satisfaction -= passenger_seat_vars[passenger.name, seat.seat_number] * passenger.age  # Penalize based on age

prob += total_satisfaction

# Solve ILP problem
prob.solve()

# Extract and print solution
for passenger, seat in passenger_seat_vars:
    if passenger_seat_vars[passenger, seat].varValue == 1:
        print(f"{passenger} seated at seat {seat}")
