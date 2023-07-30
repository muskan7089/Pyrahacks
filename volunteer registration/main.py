import tkinter as tk
from tkinter import messagebox


def save_volunteer():
    name = entry_name.get()
    email = entry_email.get()
    phone = entry_phone.get()
    selected_cause = listbox_causes.get(listbox_causes.curselection())

    if name and email and phone and selected_cause:
        with open("volunteers.txt", "a") as file:
            file.write(f"Name: {name}\n")
            file.write(f"Email: {email}\n")
            file.write(f"Phone: {phone}\n")
            file.write(f"Cause: {selected_cause}\n")
            file.write("-" * 30 + "\n")

        entry_name.delete(0, tk.END)
        entry_email.delete(0, tk.END)
        entry_phone.delete(0, tk.END)
        listbox_causes.selection_clear(0, tk.END)
        messagebox.showinfo("Success", "Thank you for signing up as a volunteer!")
    else:
        messagebox.showerror("Error", "Please fill in all the required fields.")


# Main application window
root = tk.Tk()
root.title("Volunteer Sign-up Application")

# Labels
tk.Label(root, text="Name:").grid(row=0, column=0, padx=10, pady=5)
tk.Label(root, text="Email:").grid(row=1, column=0, padx=10, pady=5)
tk.Label(root, text="Phone:").grid(row=2, column=0, padx=10, pady=5)
tk.Label(root, text="Select a Cause:").grid(row=3, column=0, padx=10, pady=5)

# Entry widgets
entry_name = tk.Entry(root)
entry_email = tk.Entry(root)
entry_phone = tk.Entry(root)

entry_name.grid(row=0, column=1, padx=10, pady=5)
entry_email.grid(row=1, column=1, padx=10, pady=5)
entry_phone.grid(row=2, column=1, padx=10, pady=5)

# List of available causes
causes = ["Environment Cleanup", "Food Drive", "Educational Outreach", "Community Health Camp",
          "Homeless Shelter Support"]
listbox_causes = tk.Listbox(root, selectmode=tk.SINGLE, height=5)
for cause in causes:
    listbox_causes.insert(tk.END, cause)
listbox_causes.grid(row=3, column=1, padx=10, pady=5)

# Submit button
submit_button = tk.Button(root, text="Sign up as Volunteer", command=save_volunteer)
submit_button.grid(row=4, column=0, columnspan=2, padx=10, pady=10)

root.mainloop()
