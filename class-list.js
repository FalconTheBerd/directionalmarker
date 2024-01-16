document.addEventListener("DOMContentLoaded", function () {
  const classSelector = document.getElementById('classSelector');
  const searchBar = document.getElementById('searchBar');
  const rosterContainer = document.getElementById('rosterContainer');
  
  // Sample data - Replace with your actual data
  const classRosters = {
    class1: ['Lachlan Dwyer', 'Jericho Conibeer', 'Joshua Gordon', 'Samuel Clarke', 'Zion Rouvi', 'Emily Noble-Shea', 'Sasha Foster', 'Alex Farley'],
    class2: ['Lalita-Grace Preston-Haira', 'Edie Leehy', 'Isis Bamman', 'Ghena Bader', 'Pearl Quigly', 'Madeline Saw', 'Kylie Bogdanovski','Leo Holmes'],
    class3: ['Oliver Jip', 'Suki Tuxworth', 'Cooper Arhanic', 'Emily Di Guglielmo', 'Holly Rabbidge', 'Jayden Harvey', 'Bayla Perry-Kuhn'],
    class4: ['Terry Tsoukalas', 'Ava Hering', 'Hazel Hansen Gahan', 'Mika Paraskevas'],
    class5: ['Jolie Bendl', 'Nadine Igarinaza', 'Valentina Perez-Milson', 'Sari Woodward', 'Chloe Wall', 'Abbie Giang', 'Lucy Rawlinson','Jude Arrowsmith', 'Lincoln Witherspoon','Tamyka Bedlington'],
    class6: ['Melina Kastanis', 'Eva Michaels De Alberqeque', 'Hudson Kratz', 'Abigail Bates','Koby Camilleri','Huntah Pett'],
  };

  function changeClass() {
    const selectedClass = classSelector.value;
    displayRoster(classRosters[selectedClass]);
  }

  function filterNames() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredRoster = Object.values(classRosters)
      .flat()
      .filter(name => name.toLowerCase().includes(searchTerm));
    displayRoster(filteredRoster);
  }

  function displayRoster(roster) {
    // Sort names alphabetically by last name
    roster.sort((a, b) => {
      const lastNameA = a.split(' ').pop().toLowerCase();
      const lastNameB = b.split(' ').pop().toLowerCase();
      return lastNameA.localeCompare(lastNameB);
    });

    rosterContainer.innerHTML = '';

    roster.forEach(name => {
      const studentDiv = document.createElement('div');
      studentDiv.classList.add('student');
      studentDiv.textContent = name;

      rosterContainer.appendChild(studentDiv);
    });
  }

  // Initial display
  changeClass();

  // Attach event listeners
  classSelector.addEventListener('change', changeClass);
  searchBar.addEventListener('input', filterNames);
});
