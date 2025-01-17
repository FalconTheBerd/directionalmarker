document.addEventListener("DOMContentLoaded", function () {
  const classSelector = document.getElementById('classSelector');
  const searchBar = document.getElementById('searchBar');
  const rosterContainer = document.getElementById('rosterContainer');

  const classRosters = [
    { name: 'Terry Tsoukalas', class: '10A' },
    { name: 'Nerea Fierro Estrada', class: '10A' },

    { name: 'N/A', class: '10B' },

    { name: 'N/A', class: '10C' },

    { name: 'Kylie Bogdanovski', class: '10D' },
    { name: 'Terry Tsoukalas', class: '10D' },

    { name: 'Lachlan Dwyer', class: '10E' },
    

    { name: 'Lalita-Grace Preston-Haira', class: '10F' },
    { name: 'Lachlan Hall', class: '10F' },
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
