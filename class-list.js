document.addEventListener("DOMContentLoaded", function () {
  const classSelector = document.getElementById('classSelector');
  const searchBar = document.getElementById('searchBar');
  const rosterContainer = document.getElementById('rosterContainer');

  // Sample data - Replace with your actual data
  const classRosters = [
    { name: 'Lachlan Dwyer', class: '9A' },
    { name: 'Jericho Conibeer', class: '9A' },
    { name: 'Joshua Gordon', class: '9A' },
    { name: 'Samuel Clarke', class: '9A' },
    { name: 'Zion Rouvi', class: '9A' },
    { name: 'Emily Noble-Shea', class: '9A' },
    { name: 'Sasha Foster', class: '9A' },
    { name: 'Alex Farley', class: '9A' },
    { name: 'Julie Horkova', class: '9A' },
    { name: 'Charlize Heron', class: '9A' },
    { name: 'Ryan Adams', class: '9A' },
    { name: 'Xavier Beckey', class: '9A' },
    { name: 'Monique Fallone', class: '9A' },
    { name: 'Lylah Grogan', class: '9A' },
    { name: 'Alex Homer', class: '9A' },
    { name: 'Brock Hunter', class: '9A' },
    { name: 'Fodhla Kusabs', class: '9A' },
    { name: 'Eliza Linner', class: '9A' },
    { name: 'Elliot Nagle', class: '9A' },
    { name: 'Vera Norman', class: '9A' },
    { name: 'Eloise Quinn', class: '9A' },
    { name: 'Sophia Von Treifeldt', class: '9A' },

    { name: 'Lalita-Grace Preston-Haira', class: '9B' },
    { name: 'Edie Leehy', class: '9B' },
    { name: 'Isis Bamman', class: '9B' },
    { name: 'Ghena Bader', class: '9B' },
    { name: 'Pearl Quigly', class: '9B' },
    { name: 'Madeline Saw', class: '9B' },
    { name: 'Kylie Bogdanovski', class: '9B' },
    { name: 'Leo Holmes', class: '9B' },
    { name: 'Nerea Fierro Estrada', class: '9B' },
    { name: 'Jonathan Allan', class: '9B' },
    { name: 'Caidan Bishop', class: '9B' },
    { name: 'Mabel Collins', class: '9B' },
    { name: 'Lachlan Coote', class: '9B' },
    { name: 'Jude Craig', class: '9B' },
    { name: 'Blakely Fallon', class: '9B' },
    { name: 'Zander Lane', class: '9B' },
    { name: 'Isaac Matthews', class: '9B' },
    { name: 'Caine Simmons', class: '9B' },
    { name: 'Tevita Tuamoheloa', class: '9B' },
    { name: 'Sunday Yelavich', class: '9B' },

    { name: 'Oliver Jip', class: '9C' },
    { name: 'Suki Tuxworth', class: '9C' },
    { name: 'Cooper Arhanic', class: '9C' },
    { name: 'Emily Di Guglielmo', class: '9C' },
    { name: 'Holly Rabbidge', class: '9C' },
    { name: 'Jayden Harvey', class: '9C' },
    { name: 'Bayla Perry-Kuhn', class: '9C' },
    { name: 'Blake Szymenski', class: '9C' },
    { name: 'Brooklyn Warea', class: '9C' },

    { name: 'Terry Tsoukalas', class: '9D' },
    { name: 'Ava Hering', class: '9D' },
    { name: 'Hazel Hansen Gahan', class: '9D' },
    { name: 'Mika Paraskevas', class: '9D' },
    { name: 'Annalise Nicholaou', class: '9D' },

    { name: 'Jolie Bendl', class: '9E' },
    { name: 'Nadine Igarinaza', class: '9E' },
    { name: 'Valentina Perez-Milson', class: '9E' },
    { name: 'Sari Woodward', class: '9E' },
    { name: 'Chloe Wall', class: '9E' },
    { name: 'Abbie Giang', class: '9E' },
    { name: 'Lucy Rawlinson', class: '9E' },
    { name: 'Jude Arrowsmith', class: '9E' },
    { name: 'Lincoln Witherspoon', class: '9E' },
    { name: 'Tamyka Bedlington', class: '9E' },
    { name: 'Shaurya Vasa', class: '9E' },

    { name: 'Melina Kastanis', class: '9F' },
    { name: 'Eva Michaels De Alberqeque', class: '9F' },
    { name: 'Hudson Kratz', class: '9F' },
    { name: 'Abigail Bates', class: '9F' },
    { name: 'Koby Camilleri', class: '9F' },
    { name: 'Huntah Pett', class: '9F' },
    { name: 'Oliver McArthy', class: '9F' },
    { name: 'Taleah Stildoph', class: '9F' },
    { name: 'Kate Malone', class: '9F' },
    { name: 'Voldina Mputu Ilua', class: '9F' },
    { name: 'Kayden Ray-Clarke', class: '9F' },
    { name: 'Natalie Redford', class: '9F' },
    { name: 'Matthew Rodgers', class: '9F' },
    { name: 'Thomas Teilmann', class: '9F' },
    { name: 'Isaac Voss', class: '9F' },
    { name: 'Oscar Wilson', class: '9F' },
    { name: 'Donat Yosef Tewlde', class: '9F' },
    { name: 'Stella Cacciola', class: '9F' },
    { name: 'Maxwell Duffin-Macleod', class: '9F' },
    { name: 'Charlotte Hammond-Tracy', class: '9F' },
    { name: 'Jordan Holko', class: '9F' },
    { name: 'Violet Houston-Daw', class: '9F' }
];


  function filterRoster() {
      const selectedClass = classSelector.value;
      const searchTerm = searchBar.value.toLowerCase();

      const filteredRoster = classRosters.filter(student =>
          (selectedClass === 'All' || student.class === selectedClass) &&
          student.name.toLowerCase().includes(searchTerm)
      );

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

  // Initial display
  filterRoster();

  // Attach event listeners
  classSelector.addEventListener('change', filterRoster);
  searchBar.addEventListener('input', filterRoster);
});
