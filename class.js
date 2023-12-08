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
          Monday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Tuesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Wednesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Thursday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Friday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '8B': {
          Monday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Tuesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Wednesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Thursday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Friday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '8C': {
          Monday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Tuesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Wednesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Thursday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Friday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Saturday: ['No class'],
          Sunday: ['No class']
          },
        '8D': {
          Monday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Tuesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Wednesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Thursday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Friday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '8E': {
            Monday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Tuesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Wednesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Thursday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Friday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Saturday: ['No class'],
            Sunday: ['No class']
        },
        '8F': {
            Monday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Tuesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Wednesday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Thursday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
            Friday: ['School Holidays', 'School Holidays', 'School Holidays', 'School Holidays'],
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
  
