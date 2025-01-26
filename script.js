// Local Storage Keys
const HABIT_NAME_KEY = "habitName";
const STREAK_COUNT_KEY = "streakCount";
const LAST_DONE_KEY = "lastDoneDate";

// Grab elements
const habitNameInput = document.getElementById("habitName");
const streakCountElem = document.getElementById("streakCount");
const markDoneBtn = document.getElementById("markDoneBtn");
const resetBtn = document.getElementById("resetBtn");

// Load existing data from localStorage
let habitName = localStorage.getItem(HABIT_NAME_KEY) || "";
let streakCount = parseInt(localStorage.getItem(STREAK_COUNT_KEY)) || 0;
let lastDoneDate = localStorage.getItem(LAST_DONE_KEY) || null;

// Initialize UI
habitNameInput.value = habitName;
streakCountElem.textContent = streakCount;

// Update Habit Name
habitNameInput.addEventListener("input", () => {
  habitName = habitNameInput.value.trim();
  localStorage.setItem(HABIT_NAME_KEY, habitName);
});

// Mark as done for the day
markDoneBtn.addEventListener("click", () => {
  const today = new Date().toDateString();
  
  // If already done today, do nothing
  if (lastDoneDate === today) {
    alert("You already marked done today!");
    return;
  }

  // Check if yesterday was done
  if (lastDoneDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (new Date(lastDoneDate).toDateString() === yesterday.toDateString()) {
      // Continue the streak
      streakCount++;
    } else {
      // Reset the streak to 1
      streakCount = 1;
    }
  } else {
    // If it's the very first time
    streakCount = 1;
  }

  lastDoneDate = today;
  
  // Update UI and local storage
  streakCountElem.textContent = streakCount;
  localStorage.setItem(STREAK_COUNT_KEY, streakCount);
  localStorage.setItem(LAST_DONE_KEY, lastDoneDate);
});

// Reset the streak manually
resetBtn.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to reset the streak?");
  if (confirmReset) {
    streakCount = 0;
    lastDoneDate = null;
    localStorage.setItem(STREAK_COUNT_KEY, streakCount);
    localStorage.removeItem(LAST_DONE_KEY);
    streakCountElem.textContent = streakCount;
  }
});
