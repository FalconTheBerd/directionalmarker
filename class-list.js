document.addEventListener("DOMContentLoaded", function () {
  const classSelector = document.getElementById('classSelector');
  const searchBar = document.getElementById('searchBar');
  const rosterContainer = document.getElementById('rosterContainer');

  const classRosters = [
    { name: 'Terry Tsoukalas', class: '10A' },
    { name: 'Nerea Fierro Estrada', class: '10A' },
    { name: 'Melina Kastanis', class: '10A'},
    { name: 'Maxwell Duffin-Macleod', class: '10A'},
    { name: 'Bella Tume', class: '10A'},
    { name: 'Oliver Jip', class: '10A'},
    { name: 'Sofia Von Treifeldt', class: '10A'},

    { name: 'Charlie Hawkins', class: '10B' },
    { name: 'Suki Tuxworth', class: '10B'},
    { name: 'Eloise Jordan', class: '10B'},
    { name: 'Isis Bamman', class: '10B'},
    { name: 'Alex Farley', class: '10B'},
    { name: 'Rose Velthiem', class: '10B'},
    { name: 'Ella Harvey', class: '10B'},

    { name: 'Cooper Arhanic', class: '10C' },
    { name: 'Eva Micheals De Albuquerque', class: '10C'},
    { name: 'Koby Camilleri', class: '10C'},
    { name: 'Monique Fallone', class: '10C'},
    { name: 'Lachlan Coote', class: '10C'},
    { name: 'Nadine Igiraneza', class: '10C'},

    { name: 'Kylie Bogdanovski', class: '10D' },
    { name: 'Valentina Perez Milton', class: '10D'},
    { name: 'Caleb Starling', class: '10D'},
    { name: 'Zion Finua', class: '10D'},
    { name: 'Liam Malone', class: '10D'},
    { name: 'Sari Woodward', class: '10D'},
    { name: 'Sullivan Green', class: '10D'},
    { name: 'Melika Reid', class: '10D'},

    { name: 'Lachlan Dwyer', class: '10E' },
    { name: 'Doug (June Hee Sohn)', class: '10E'},
    { name: 'Lucy Rowlinson', class: '10E'},
    { name: 'Mika Paraskevas', class: '10E'},
    
    { name: 'Lalita-Grace Preston-Haira', class: '10F' },
    { name: 'Lachlan Hall', class: '10F' },
    { name: 'Edie Leehy', class: '10F'},
    { name: 'Oliver Mcarthy', class: '10F'},
    { name: 'Abigail Bates', class: '10F'},
    { name: 'Madeline Saw', class: '10F'},
    { name: 'Holly Rabbidge', class: '10F'}

];


function filterRoster() {
    const selectedClass = classSelector.value;
    const searchTerm = searchBar.value.toLowerCase();

    let filteredRoster = classRosters.filter(student =>
      (selectedClass === 'All' || student.class === selectedClass) &&
      student.name.toLowerCase().includes(searchTerm)
    );

    filteredRoster.sort((a, b) => {
      const lastNameA = a.name.split(' ')[1];
      const lastNameB = b.name.split(' ')[1];
      return lastNameA.localeCompare(lastNameB);
    });

    displayRoster(filteredRoster);
  }
  function displayRoster(roster) {
      rosterContainer.innerHTML = '';

      roster.forEach(student => {
          const studentDiv = document.createElement('div');
          studentDiv.classList.add('student');
          studentDiv.textContent = `${student.name} - ${student.class}`;

          rosterContainer.appendChild(studentDiv);
      });
  }

  filterRoster();

  classSelector.addEventListener('change', filterRoster);
  searchBar.addEventListener('input', filterRoster);
});
