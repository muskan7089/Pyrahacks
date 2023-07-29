import tkinter as tk
import random
import tkinter.messagebox as messagebox
from tkinter import ttk

# Dictionary of eco-friendly tips categorized by Food, Home, and Transportation
eco_tips = {
    "Food": [
        "Buy locally sourced and organic food.",
        "Reduce meat consumption and opt for plant-based meals.",
        "Avoid single-use plastic packaging when grocery shopping.",
        "Compost kitchen waste to reduce landfill contributions.",
        "Support sustainable fishing practices and choose sustainable seafood.",
    ],
    "Home": [
        "Turn off lights and unplug devices when not in use.",
        "Reduce water waste by fixing leaky faucets.",
        "Conserve energy by setting your thermostat wisely.",
        "Switch to energy-efficient LED bulbs.",
        "Use natural cleaning products to minimize chemical pollution.",
    ],
    "Transportation": [
        "Use public transportation, walk, or bike instead of driving alone.",
        "Carpool with friends or colleagues to reduce emissions.",
        "Maintain your vehicle regularly for better fuel efficiency.",
        "Plan and combine errands to minimize unnecessary trips.",
        "Support initiatives for electric or hybrid vehicle usage.",
    ],
}

# Initialize the tip counter and total tips count
tip_counter = 0
total_tips = len(eco_tips["Food"]) + len(eco_tips["Home"]) + len(eco_tips["Transportation"])

def get_random_tip(category):
    """Get a random eco-friendly tip from the specified category."""
    return random.choice(eco_tips[category])

def update_progress():
    """Update the progress information in the GUI."""
    progress_label.config(text=f"Tip {tip_counter} of {total_tips}")

def share_on_social_media(tip):
    """Simulate sharing the eco-friendly tip on social media."""
    # Replace this with the actual social media sharing functionality.
    messagebox.showinfo("Social Media Sharing", f"Shared tip: {tip}")

def show_random_tip(category):
    """Display a random eco-friendly tip from the specified category in the GUI."""
    global tip_counter
    tip_counter += 1

    tip = get_random_tip(category)
    tip_label.config(text=tip)

    update_progress()

def submit_tip():
    """Open a new window to allow users to submit their eco-friendly tip."""
    submit_window = tk.Toplevel(app)
    submit_window.title("Submit a Tip")

    tip_entry_label = tk.Label(submit_window, text="Enter your eco-friendly tip:")
    tip_entry_label.pack(pady=10)

    tip_entry = tk.Entry(submit_window, width=40)
    tip_entry.pack(pady=5)

    category_label = tk.Label(submit_window, text="Select a category:")
    category_label.pack(pady=5)

    # Create a dropdown menu to select the category
    category_var = tk.StringVar()
    category_dropdown = ttk.Combobox(submit_window, textvariable=category_var, values=list(eco_tips.keys()))
    category_dropdown.pack(pady=5)

    def submit():
        """Get the user-submitted tip and add it to the tips dictionary."""
        new_tip = tip_entry.get().strip()
        category = category_var.get()

        if new_tip and category:
            if category not in eco_tips:
                eco_tips[category] = []
            eco_tips[category].append(new_tip)
            messagebox.showinfo("Submit a Tip", "Tip submitted successfully!")
            submit_window.destroy()
        else:
            messagebox.showwarning("Submit a Tip", "Please enter a valid tip and select a category.")

    submit_button = tk.Button(submit_window, text="Submit", command=submit)
    submit_button.pack(pady=10)

# Create the main application window
app = tk.Tk()
app.title("Eco-friendly Tips App")

# Set the size of the main window
app_width = 600
app_height = 600
app.geometry(f"{app_width}x{app_height}")
progress_label = tk.Label(app, text="", font=("Arial", 12))
progress_label.pack(pady=5)

# Update progress information on app start
update_progress()
# Create and configure GUI elements
tip_label = tk.Label(app, text="", wraplength=500, justify="center", font=("Arial", 14))
tip_label.pack(pady=30)

food_button = tk.Button(app, text="Food Tips", command=lambda: show_random_tip("Food"), font=("Arial", 12))
food_button.pack(pady=10)

home_button = tk.Button(app, text="Home Tips", command=lambda: show_random_tip("Home"), font=("Arial", 12))
home_button.pack(pady=10)

transportation_button = tk.Button(app, text="Transportation Tips", command=lambda: show_random_tip("Transportation"), font=("Arial", 12))
transportation_button.pack(pady=10)

share_button = tk.Button(app, text="Share on Social Media", command=lambda: share_on_social_media(tip_label.cget("text")), font=("Arial", 12))
share_button.pack(pady=10)

submit_button = tk.Button(app, text="Submit a Tip", command=submit_tip, font=("Arial", 12))
submit_button.pack(pady=10)

exit_button = tk.Button(app, text="Exit", command=app.destroy, font=("Arial", 12))
exit_button.pack(pady=10)

# Start the main event loop
app.mainloop()
