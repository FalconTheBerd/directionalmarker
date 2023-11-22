document.addEventListener("DOMContentLoaded", function () {
    const classSelect = document.getElementById("classSelect");
    const daySelect = document.getElementById("daySelect");
    const classBoxes = document.querySelectorAll(".class-box");
  
    classSelect.addEventListener("change", function () {
      updateSchedule(classSelect.value, daySelect.value);
    });
  
    daySelect.addEventListener("change", function () {
      updateSchedule(classSelect.value, daySelect.value);
    });
  
    function updateSchedule(selectedClass, selectedDay) {
      const classSchedule = {
        '8A': {
          Monday: ['Math', 'Science', 'History', 'English'],
          Tuesday: ['Science', 'History', 'English', 'Math'],
          Wednesday: ['History', 'English', 'Math', 'Science'],
          Thursday: ['English', 'Math', 'Science', 'History'],
          Friday: ['Math', 'Science', 'History', 'English'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '8B': {
        // Define schedule for 8B for each day
        },
        '8C': {
        // Define schedule for 8B for each day
          },
        '8D': {
        // Define schedule for 8B for each day
        },
        '8E': {
            Monday: ['Global Venture', 'Agile Minds', 'Math', 'Science'],
            Tuesday: ['Genius Hour', 'Making Meaning', 'English', 'Global Venture'],
            Wednesday: ['Agile Minds', 'Math', 'Science', 'Making Meaning'],
            Thursday: ['English', 'Global Venture', 'Agile Minds', 'Sport'],
            Friday: ['Math', 'Science', 'Making Meaning', 'English'],
            Saturday: ['No class'],
            Sunday: ['No class']
        },
        '8F': {
            Monday: ['Next Discovery', 'Future Fit', 'Math', 'Science'],
            Tuesday: ['Genius Hour', 'Creative Lab', 'English', 'Next Discovery'],
            Wednesday: ['Future Fit', 'Math', 'Science', 'Creative Lab'],
            Thursday: ['English', 'Next Discovery', 'Future Fit', 'Sport'],
            Friday: ['Math', 'Science', 'Creative Lab', 'English'],
            Saturday: ['No class'],
            Sunday: ['No class']
        },
        // Add schedules for other classes
      };
  
      const schedule = classSchedule[selectedClass][selectedDay];
  
      classBoxes.forEach((box, index) => {
        box.textContent = schedule[index] || 'No class';
      });
    }
  
    updateSchedule(classSelect.value, daySelect.value);
  });
  