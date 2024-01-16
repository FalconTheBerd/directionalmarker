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
        '9A': {
          Monday: ['English', 'Maths', 'Science', 'Agile Minds'],
          Tuesday: ['Sport', 'Genius Hour', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths','English','Agile Minds','Science'],
          Thursday: ['Elective 2','Elective 1','English','Maths'],
          Friday: ['Science','Agile Minds','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9B': {
          Monday: ['English', 'Maths', 'Science', 'Agile Minds'],
          Tuesday: ['Sport', 'Genius Hour', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths','English','Agile Minds','Science'],
          Thursday: ['Elective 2','Elective 1','English','Maths'],
          Friday: ['Science','Agile Minds','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9C': {
          Monday: ['English', 'Maths', 'Science', 'Agile Minds'],
          Tuesday: ['Sport', 'Genius Hour', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths','English','Agile Minds','Science'],
          Thursday: ['Elective 2','Elective 1','English','Maths'],
          Friday: ['Science','Agile Minds','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9D': {
          Monday: ['English', 'Maths', 'Science', 'Agile Minds'],
          Tuesday: ['Sport', 'Genius Hour', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths','English','Agile Minds','Science'],
          Thursday: ['Elective 2','Elective 1','English','Maths'],
          Friday: ['Science','Agile Minds','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9E': {
          Monday: ['English', 'Maths', 'Science', 'Agile Minds'],
          Tuesday: ['Sport', 'Genius Hour', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths','English','Agile Minds','Science'],
          Thursday: ['Elective 2','Elective 1','English','Maths'],
          Friday: ['Science','Agile Minds','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9F': {
          Monday: ['English', 'Maths', 'Science', 'Agile Minds'],
          Tuesday: ['Sport', 'Genius Hour', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths','English','Agile Minds','Science'],
          Thursday: ['Elective 2','Elective 1','English','Maths'],
          Friday: ['Science','Agile Minds','Elective 2','Elective 1'],
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
  