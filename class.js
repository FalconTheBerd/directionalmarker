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
          Monday: ['English - Mrs Dawkins - B403', 'Maths - Mr McLaren - B504', 'Science - Mrs Altmann - B237', 'Agile Minds - Mr Arsenic - B342'],
          Tuesday: ['Sport', 'Genius Hour - Mr Callaghan - B537', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths - Mr McLaren - B504', 'English - Mrs Dawkins - B403', 'Agile Minds - Mr Arsenic - B342', 'Science - Mrs Altmann - B237'],
          Thursday: ['Elective 2', 'Elective 1', 'English - Mrs Dawkins - B403', 'Maths - Mr McLaren - B504'],
          Friday: ['Science - Mrs Altmann - B237', 'Agile Minds - Mr Arsenic - B342', 'Elective 2', 'Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
      },      
        '9B': {
          Monday: ['English - Dr Run - B405', 'Maths -  Mr Morris - B507', 'Science - Mr OConnor - B238', 'Agile Minds - Mr Marzullo - B343'],
          Tuesday: ['Sport', 'Genius Hour - Miss Labam - B538', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths - Mr Morris - B507','English - Dr Run - B405','Agile Minds - Mr Marzullo - B343','Science - Mr OConnor - B238'],
          Thursday: ['Elective 2','Elective 1','English - Dr Run - B405','Maths - Mr Morris - B507'],
          Friday: ['Science - Mr OConnor - B238','Agile Minds - Mr Marzullo - B343','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9C': {
          Monday: ['English - Mr Arsenic', 'Maths - Ms Keka', 'Science - Ms Keka', 'Agile Minds - Mr Richards'],
          Tuesday: ['Sport', 'Genius Hour - Mr Lopez', 'Elective 1', 'Elective 2'],
          Wednesday: ['Maths - Ms Keka','English - Mr Arsenic','Agile Minds - Mr Richards','Science - Ms Keka'],
          Thursday: ['Elective 2','Elective 1','English - Mr Arsenic','Maths - Ms Keka'],
          Friday: ['Science - Ms Keka','Agile Minds - Mr Richards','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9D': {
          Monday: ['Maths - Mr Ashby', 'Agile Minds - Mr Lloyd', 'English - Ms Vale', 'Science - Mrs Altmann'],
          Tuesday: ['Sport', 'Genius Hour - Mrs Waters', 'Elective 1', 'Elective 2'],
          Wednesday: ['Agile Minds - Mr Lloyd','Maths - Mr Ashby','Science - Mrs Altmann','English - Ms Vale'],
          Thursday: ['Elective 2','Elective 1','Maths - Mr Ashby','Agile Minds - Mr Lloyd'],
          Friday: ['English - Ms Vale','Science - Mrs Altmann','Elective 2','Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },
        '9E': {
          Monday: ['Maths - Mrs Sardouk', 'Agile Minds - Mr Maas', 'English - Miss Hyndman', 'Science - Ms Keka'],
          Tuesday: ['Sport', 'Genius Hour - TEABNX', 'Elective 1', 'Elective 2'],
          Wednesday: ['Agile Minds - Mr Maas', 'Maths - Mrs Sardouk', 'Science - Ms Keka', 'English - Miss Hyndman'],
          Thursday: ['Elective 2', 'Elective 1', 'Maths - Mrs Sardouk', 'Agile Minds - Mr Maas'],
          Friday: ['English - Miss Hyndman', 'Science - Ms Keka', 'Elective 2', 'Elective 1'],
          Saturday: ['No class'],
          Sunday: ['No class']
        },        
        '9F': {
          Monday: ['Maths - Mr OConnor', 'Agile Minds - Mr Marzullo', 'English - Ms Ozich', 'Science - Mr Ryan'],
          Tuesday: ['Sport', 'Genius Hour - Miss Daley', 'Elective 1', 'Elective 2'],
          Wednesday: ['Agile Minds - Mr Marzullo', 'Maths - Mr OConnor', 'Science', 'English'],
          Thursday: ['Elective 2', 'Elective 1', 'Maths', 'Agile Minds'],
          Friday: ['English', 'Science', 'Elective 2', 'Elective 1'],
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
  