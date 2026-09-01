import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";


// ======================================================
// FIREBASE
// ======================================================

const firebaseConfig = {
    apiKey: "AIzaSyAMQ6qkuWzTOZKJnoal01MrqVaAy32aXlc",
    authDomain: "directionalmarker.firebaseapp.com",
    databaseURL: "https://directionalmarker-default-rtdb.firebaseio.com",
    projectId: "directionalmarker",
    storageBucket: "directionalmarker.appspot.com",
    messagingSenderId: "124118111336",
    appId: "1:124118111336:web:c7ebea9a5869c263c157dd"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ======================================================
// PAGE ELEMENTS
// ======================================================

const searchInput =
    document.getElementById("studentSearch");

const searchResults =
    document.getElementById("searchResults");

const clearSearchButton =
    document.getElementById("clearSearch");

const selectedStudent =
    document.getElementById("selectedStudent");

const studentName =
    document.getElementById("studentName");

const timetableContainer =
    document.getElementById("timetableContainer");

const classModal =
    document.getElementById("classModal");

const closeModalButton =
    document.getElementById("closeModal");

const classModalTitle =
    document.getElementById("classModalTitle");

const classModalDetails =
    document.getElementById("classModalDetails");

const classStudents =
    document.getElementById("classStudents");


// ======================================================
// USERS
// ======================================================

let users = [];


// ======================================================
// LOAD USERS
// ======================================================

async function loadUsers() {

    try {

        const usersRef =
            ref(db, "users");

        const snapshot =
            await get(usersRef);


        if (!snapshot.exists()) {

            console.log("No users found.");

            return;

        }


        const usersData =
            snapshot.val();


        users = [];


        Object.entries(usersData)
            .forEach(([uid, user]) => {

                if (!user) {
                    return;
                }

                users.push({

                    uid: uid,

                    name:
                        user.name || "Unknown"

                });

            });


        users.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );


        console.log(
            `Loaded ${users.length} users.`
        );


    } catch (error) {

        console.error(
            "Error loading users:",
            error
        );

        searchResults.innerHTML = `
            <div class="no-results">
                Unable to load students.
            </div>
        `;

    }

}


loadUsers();


// ======================================================
// SEARCH
// ======================================================

searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        searchResults.innerHTML = "";


        if (!search) {

            return;

        }


        const matches =
            users.filter((user) =>
                user.name
                    .toLowerCase()
                    .includes(search)
            );


        if (matches.length === 0) {

            searchResults.innerHTML = `
                <div class="no-results">
                    No students found.
                </div>
            `;

            return;

        }


        matches
            .slice(0, 20)
            .forEach((user) => {

                const result =
                    document.createElement("div");

                result.className =
                    "search-result";


                result.innerHTML = `
                    <div class="search-result-name">
                        ${escapeHTML(user.name)}
                    </div>
                `;


                result.addEventListener(
                    "click",
                    () => {

                        selectStudent(user);

                    }
                );


                searchResults.appendChild(
                    result
                );

            });

    }
);


// ======================================================
// SELECT STUDENT
// ======================================================

async function selectStudent(user) {

    searchInput.value =
        user.name;

    searchResults.innerHTML = "";


    selectedStudent.style.display =
        "block";

    timetableContainer.style.display =
        "block";


    studentName.textContent =
        `${user.name}'s Timetable`;


    clearTimetable();


    try {

        const timetableRef =
            ref(
                db,
                `timetables/${user.uid}`
            );


        const snapshot =
            await get(timetableRef);


        if (!snapshot.exists()) {

            return;

        }


        const timetable =
            snapshot.val();


        renderTimetable(
            timetable
        );


    } catch (error) {

        console.error(
            "Error loading timetable:",
            error
        );

    }

}


// ======================================================
// CLEAR TIMETABLE
// ======================================================

function clearTimetable() {

    document
        .querySelectorAll(".period-card")
        .forEach((card) => {

            card.innerHTML = `
                <div class="empty-period">
                    <span>—</span>
                </div>
            `;

            card.onclick = null;

        });

}


// ======================================================
// RENDER TIMETABLE
// ======================================================

function renderTimetable(timetable) {

    document
        .querySelectorAll(".period-card")
        .forEach((card) => {

            const day =
                card.dataset.day;

            const period =
                card.dataset.period;


            const classData =
                timetable?.[day]?.[period];


            if (!classData) {

                card.innerHTML = `
                    <div class="empty-period">
                        <span>—</span>
                    </div>
                `;

                return;

            }


            card.innerHTML = `
                <div class="class-details">

                    <div class="class-code">
                        ${escapeHTML(
                            classData.classCode
                        )}
                    </div>

                    <div class="class-name">
                        ${escapeHTML(
                            classData.className
                        )}
                    </div>

                    <div class="class-info">
                        Teacher:
                        ${escapeHTML(
                            classData.teacherName
                        )}
                        <br>
                        Room:
                        ${escapeHTML(
                            classData.roomCode
                        )}
                    </div>

                </div>
            `;


            card.onclick = () => {

                openClassModal(
                    classData
                );

            };

        });

}


// ======================================================
// CLASS MODAL
// ======================================================

async function openClassModal(classData) {

    classModalTitle.textContent =
        classData.classCode;


    classModalDetails.innerHTML = `
        <strong>
            ${escapeHTML(
                classData.className
            )}
        </strong>

        <br>

        Teacher:
        ${escapeHTML(
            classData.teacherName
        )}

        <br>

        Room:
        ${escapeHTML(
            classData.roomCode
        )}
    `;


    classStudents.innerHTML = `
        <div class="loading">
            Loading students...
        </div>
    `;


    classModal.classList.add(
        "active"
    );


    try {

        const classRef =
            ref(
                db,
                `classes/${classData.classCode}`
            );


        const snapshot =
            await get(classRef);


        if (!snapshot.exists()) {

            classStudents.innerHTML = `
                <div class="no-results">
                    No students are registered
                    in this class.
                </div>
            `;

            return;

        }


        const members =
            snapshot.val();


        const memberUIDs =
            Object.keys(members);


        if (memberUIDs.length === 0) {

            classStudents.innerHTML = `
                <div class="no-results">
                    No students are registered
                    in this class.
                </div>
            `;

            return;

        }


        // ==============================================
        // GET STUDENT NAMES
        // ==============================================

        const studentPromises =
            memberUIDs.map(
                async (uid) => {

                    const userRef =
                        ref(
                            db,
                            `users/${uid}`
                        );


                    const userSnapshot =
                        await get(userRef);


                    if (
                        !userSnapshot.exists()
                    ) {

                        return null;

                    }


                    const user =
                        userSnapshot.val();


                    return {

                        uid: uid,

                        name:
                            user.name ||
                            "Unknown"

                    };

                }
            );


        const students =
            await Promise.all(
                studentPromises
            );


        const validStudents =
            students.filter(
                (student) =>
                    student !== null
            );


        validStudents.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );


        // ==============================================
        // DISPLAY NAMES ONLY
        // ==============================================

        classStudents.innerHTML = "";


        validStudents.forEach(
            (student) => {

                const element =
                    document.createElement("div");


                element.className =
                    "class-student";


                element.innerHTML = `
                    <div class="class-student-name">
                        ${escapeHTML(
                            student.name
                        )}
                    </div>
                `;


                classStudents.appendChild(
                    element
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading class members:",
            error
        );


        classStudents.innerHTML = `
            <div class="no-results">
                Unable to load the class list.
            </div>
        `;

    }

}


// ======================================================
// CLOSE MODAL
// ======================================================

function closeClassModal() {

    classModal.classList.remove(
        "active"
    );

}


closeModalButton.addEventListener(
    "click",
    closeClassModal
);


classModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === classModal
        ) {

            closeClassModal();

        }

    }
);


// ======================================================
// CLEAR SEARCH
// ======================================================

clearSearchButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchResults.innerHTML = "";

        searchInput.focus();

    }
);


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
