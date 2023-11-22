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
          Monday: ['Making Meaning', 'English', 'Global Venture', 'Agile Minds'],
          Tuesday: ['Genius Hour', 'Maths', 'Science', 'Making Meaning'],
          Wednesday: ['English', 'Global Venture', 'Agile Minds', 'Maths'],
          Thursday: ['Science', 'Making Meaning', 'English', 'Sport'],
          Friday: ['Global Venture', 'Agile Minds', 'Math', 'Science'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '8B': {
          Monday: ['Creative Lab', 'English', 'Next Discovery', 'Future Fit'],
          Tuesday: ['Genius Hour', 'Maths', 'Science', 'Creative Lab'],
          Wednesday: ['English', 'Next Discovery', 'Future Fit', 'Maths'],
          Thursday: ['Science', 'Creative Lab', 'English', 'Sport'],
          Friday: ['Next Discovery', 'Future Fit', 'Math', 'Science'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '8C': {
          Monday: ['Maths', 'Science', 'Making Meaning', 'English'],
          Tuesday: ['Genius Hour', 'Global Venture', 'Agile Minds', 'Maths'],
          Wednesday: ['Science', 'Making Meaning', 'English', 'Global Venture'],
          Thursday: ['Agile Minds', 'Maths', 'Science', 'Sport'],
          Friday: ['Making Meaning', 'English', 'Global Venture', 'Agile Minds'],
          Saturday: ['No class'],
          Sunday: ['No class']
          },
        '8D': {
          Monday: ['Maths', 'Science', 'Creative Lab', 'English'],
          Tuesday: ['Genius Hour', 'Next Discovery', 'Future Fit', 'Maths'],
          Wednesday: ['Science', 'Creative Lab', 'English', 'Next Discovery'],
          Thursday: ['Future Fit', 'Maths', 'Science', 'Sport'],
          Friday: ['Creative Lab', 'English', 'Next Discovery', 'Future Fit'],
          Saturday: ['No class'],
          Sunday: ['No class']
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
  