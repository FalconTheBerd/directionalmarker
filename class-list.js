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
    { name: 'Torr Benevuti', class: '10A'},
    { name: 'Ryan Adams', class: '10A'},
    { name: 'Sophia Bailey', class: '10A'},
    { name: 'Xavier Beckey', class: '10A'},
    { name: 'Jay Chen', class: '10A'},
    { name: 'Mabel Collins', class: '10A'},
    { name: 'Sasha Foster', class: '10A'},
    { name: 'Charlotte Hammond Tracy'},
    { name: 'Toni Holani', class: '10A'},
    { name: 'Emily Noble-Shea', class: '10A'},
    { name: 'Natalie Redford', class: '10A'},
    { name: 'Caine Simmons', class: '10A'},
    { name: 'Blake Szymanski', class: '10A'},
    { name: 'Brooklyn Waerea', class: '10A'},
    { name: 'Eline Zapuskalova', class: '10A'},

    { name: 'Charlize Heron', class: '10B' },
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
    { name: 'Jai Briggs', class: '10C'},
    { name: 'Rohan Fairbairn', class: '10C'},
    { name: 'Sunday Yelevich', class: '10C'},
    { name: 'Lachlan Coote', class: '10C'},
    { name: 'Benjamin Gongora Campillay', class: '10C'},
    { name: 'Lylah Grogan', class: '10C'},
    { name: 'Fodhla Kusabs', class: '10C'},
    { name: 'Annabelle Martin', class: '10C'},
    { name: 'Noah Mcintyre', class: '10C'},
    { name: 'Elliott Nagle', class: '10C'},
    { name: 'Odessa Scriha', class: '10C'},
    { name: 'Annabel So', class: '10C'},
    { name: "Anh Thu (Lily) Tran", class: '10C'},
    { name: "Tevita Tu'amoheloa", class: '10C'},
    { name: "Milla Tu'uholoaki", class: '10C'},
    { name: 'Parker Vitayapanit', class: '10C'},
    { name: 'Sophia Von Treifeldt', class: '10C'},

    { name: 'Kylie Bogdanovski', class: '10D' },
    { name: 'Valentina Perez-Milsom', class: '10D'},
    { name: 'Caleb Starling', class: '10D'},
    { name: 'Zion Finua', class: '10D'},
    { name: 'Liam Malone', class: '10D'},
    { name: 'Sari Woodward', class: '10D'},
    { name: 'Sullivan Green', class: '10D'},
    { name: 'Melika Reid', class: '10D'},
    { name: 'Jolie Bendl', class: '10D'},
    { name: 'Kate Malone', class: '10D'},
    { name: 'Caidan Bishop', class: '10D'},
    { name: 'Jordan Holko', class: '10D'},
    { name: 'Alex Homer', class: '10D'},
    { name: 'Jensen Johnson', class: '10D'},
    { name: 'Gaza Lakhdari', class: '10D'},
    { name: 'Isaac Matthews', class: '10D'},
    { name: 'Annalise Nicholaou', class: '10D'},
    { name: 'Pearl Quigley', class: '10D'},
    { name: 'Eloise Quinn', class: '10D'},
    { name: 'Matthew Rodgers', class: '10D'},
    { name: 'Ayesha Stephens', class: '10D'},

    { name: 'Lachlan Dwyer', class: '10E' },
    { name: 'June Hee Sohn (Doug)', class: '10E'},
    { name: 'Lucy Rowlinson', class: '10E'},
    { name: 'Mika Paraskevas', class: '10E'},
    { name: 'Ava Herring', class: '10E'},
    { name: 'Ester Matayas', class: '10E'},
    { name: 'Ruby Stephens-Amor', class: '10E'},
    
    { name: 'Lalita-Grace Preston-Haira', class: '10F' },
    { name: 'Lachlan Hall', class: '10F' },
    { name: 'Edie Leehy', class: '10F'},
    { name: 'Oliver Mcarthy', class: '10F'},
    { name: 'Abigail Bates', class: '10F'},
    { name: 'Madeline Saw', class: '10F'},
    { name: 'Holly Rabbidge', class: '10F'},
    { name: 'Ermia Rashidi', class: '10F'},
    { name: 'Voldina Mputu Ilua', class: '10F'}
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
