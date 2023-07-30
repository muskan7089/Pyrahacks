import tkinter as tk
from tkinter import messagebox

# Temporary dictionary of shelters (replace with actual data)
shelters_data = {
    "Shelter A": "123 Main Street, City A",
    "Shelter B": "456 Park Avenue, City B",
    "Shelter C": "789 Oak Road, City C",
    "Shelter D": "555 Elm Lane, City D",
    "Shelter E": "111 Pine Court, City E"
}

def find_shelters():
    location = entry_location.get().strip()
    if not location:
        messagebox.showerror("Error", "Please enter your city.")
        return

    # Search for shelters in the temporary dictionary based on the city name
    found_shelters = [name for name, address in shelters_data.items() if location.lower() in address.lower()]

    if found_shelters:
        shelters_listbox.delete(0, tk.END)
        for shelter in found_shelters:
            shelters_listbox.insert(tk.END, f"{shelter} - {shelters_data[shelter]}")
    else:
        messagebox.showwarning("No Results", f"No shelters found in {location}.")

# Main application window
root = tk.Tk()
root.title("Homeless Shelter Finder")

# Label and Entry
tk.Label(root, text="Enter Your City:").grid(row=0, column=0, padx=10, pady=5)
entry_location = tk.Entry(root)
entry_location.grid(row=0, column=1, padx=10, pady=5)

# Find Shelters Button
find_shelters_button = tk.Button(root, text="Find Shelters", command=find_shelters)
find_shelters_button.grid(row=1, column=0, columnspan=2, padx=10, pady=10)

# Listbox to display shelters
shelters_listbox = tk.Listbox(root, height=10, width=60)
shelters_listbox.grid(row=2, column=0, columnspan=2, padx=10, pady=5)

root.mainloop()
import tkinter as tk
from tkinter import messagebox

# Temporary dictionary of shelters (replace with actual data)
shelters_data = {
    "Shelter A": "123 Main Street, City A",
    "Shelter B": "456 Park Avenue, City B",
    "Shelter C": "789 Oak Road, City C",
    "Shelter D": "555 Elm Lane, City D",
    "Shelter E": "111 Pine Court, City E"
}

def find_shelters():
    location = entry_location.get().strip()
    if not location:
        messagebox.showerror("Error", "Please enter your city.")
        return

    # Search for shelters in the temporary dictionary based on the city name
    found_shelters = [name for name, address in shelters_data.items() if location.lower() in address.lower()]

    if found_shelters:
        shelters_listbox.delete(0, tk.END)
        for shelter in found_shelters:
            shelters_listbox.insert(tk.END, f"{shelter} - {shelters_data[shelter]}")
    else:
        messagebox.showwarning("No Results", f"No shelters found in {location}.")

# Main application window
root = tk.Tk()
root.title("Homeless Shelter Finder")

# Label and Entry
tk.Label(root, text="Enter Your City:").grid(row=0, column=0, padx=10, pady=5)
entry_location = tk.Entry(root)
entry_location.grid(row=0, column=1, padx=10, pady=5)

# Find Shelters Button
find_shelters_button = tk.Button(root, text="Find Shelters", command=find_shelters)
find_shelters_button.grid(row=1, column=0, columnspan=2, padx=10, pady=10)

# Listbox to display shelters
shelters_listbox = tk.Listbox(root, height=10, width=60)
shelters_listbox.grid(row=2, column=0, columnspan=2, padx=10, pady=5)

root.mainloop()
