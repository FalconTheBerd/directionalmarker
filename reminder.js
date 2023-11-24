document.addEventListener("DOMContentLoaded", function () {
  const reminderForm = document.getElementById("reminderForm");
  const reminderList = document.getElementById("reminderList");
  let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

  reminders.forEach((reminder, index) => {
    displayReminder(reminder, index);
  });

  reminderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const reminderText = document.getElementById("reminderInput").value;
    const reminderDatetime = document.getElementById("dateInput").value;

    const newReminder = {
      text: reminderText,
      datetime: reminderDatetime
    };

    reminders.push(newReminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));

    displayReminder(newReminder, reminders.length - 1);

    document.getElementById("reminderInput").value = "";
    document.getElementById("dateInput").value = "";
  });

  function displayReminder(reminder, index) {
    const listItem = document.createElement("li");

    const reminderText = document.createElement("span");
    const reminderDate = new Date(reminder.datetime);
    const formattedDate = reminderDate.toLocaleDateString();
    const formattedTime = reminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    reminderText.textContent = `${reminder.text} - ${formattedDate} ${formattedTime}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.display = "block"; // Set the button to display as a block element
    deleteButton.addEventListener("click", function () {
      reminders.splice(index, 1);
      localStorage.setItem('reminders', JSON.stringify(reminders));
      reminderList.removeChild(listItem);
    });

    listItem.appendChild(reminderText);
    listItem.appendChild(deleteButton);
    reminderList.appendChild(listItem);

    // Check if the reminder's time is in the future
    const currentTime = new Date();
    if (currentTime < reminderDate) {
      const timeDifference = reminderDate - currentTime;

      // Set timeout to execute a function when the time is reached
      setTimeout(() => {
        // Run your command or function here
        console.log(`Reminder for ${reminder.text} at ${reminder.datetime} is triggered.`);
        var notify = new Notification(`Reminder for ${reminder.text}`);
        reminders.splice(index, 1);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        reminderList.removeChild(listItem);
        // For example, you could trigger a notification or perform any specific action
      }, timeDifference);
    }
  }
});
