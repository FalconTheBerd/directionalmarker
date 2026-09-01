import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    get,
    update
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";


// ======================================================
// FIREBASE CONFIG
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


// ======================================================
// INITIALISE FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);


// ======================================================
// TIMETABLE SETTINGS
// ======================================================

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];

const periods = [
    "P1",
    "P2",
    "P3",
    "P4"
];

const periodTimes = {
    P1: "9:35 - 10:45",
    P2: "11:15 - 12:25",
    P3: "12:35 - 1:45",
    P4: "2:15 - 3:25"
};


// ======================================================
// COPY GROUPS
// ======================================================
//
// These periods normally contain the same class.
//
// Copying works BOTH WAYS.
//
// Monday P1/P2
//      ↓
// Wednesday P1/P2
//      ↓
// Thursday P3/P4
//
// The same applies regardless of which period the user
// starts editing.
//
// ======================================================

const copyGroups = [

    [
        ["Monday", "P1"],
        ["Monday", "P2"],
        ["Wednesday", "P1"],
        ["Wednesday", "P2"],
        ["Thursday", "P3"],
        ["Thursday", "P4"]
    ],

    [
        ["Monday", "P3"],
        ["Monday", "P4"],
        ["Wednesday", "P3"],
        ["Wednesday", "P4"],
        ["Friday", "P1"],
        ["Friday", "P2"]
    ],

    [
        ["Tuesday", "P3"],
        ["Tuesday", "P4"],
        ["Thursday", "P1"],
        ["Thursday", "P2"],
        ["Friday", "P3"],
        ["Friday", "P4"]
    ]

];


// ======================================================
// DOUBLE PERIOD GROUPS
// ======================================================
//
// Normal double periods:
//
// P1 <-> P2
// P3 <-> P4
//
// ======================================================

const doublePeriods = [

    [
        ["Monday", "P1"],
        ["Monday", "P2"]
    ],

    [
        ["Monday", "P3"],
        ["Monday", "P4"]
    ],

    [
        ["Tuesday", "P1"],
        ["Tuesday", "P2"]
    ],

    [
        ["Tuesday", "P3"],
        ["Tuesday", "P4"]
    ],

    [
        ["Wednesday", "P1"],
        ["Wednesday", "P2"]
    ],

    [
        ["Wednesday", "P3"],
        ["Wednesday", "P4"]
    ],

    [
        ["Thursday", "P1"],
        ["Thursday", "P2"]
    ],

    [
        ["Thursday", "P3"],
        ["Thursday", "P4"]
    ],

    [
        ["Friday", "P1"],
        ["Friday", "P2"]
    ],

    [
        ["Friday", "P3"],
        ["Friday", "P4"]
    ]

];


// ======================================================
// CREATE EMPTY TIMETABLE
// ======================================================

const timetable = {};

days.forEach((day) => {

    timetable[day] = {};

    periods.forEach((period) => {

        timetable[day][period] = null;

    });

});


// ======================================================
// PAGE ELEMENTS
// ======================================================

const modal =
    document.getElementById("classModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalPeriod =
    document.getElementById("modalPeriod");

const classForm =
    document.getElementById("classForm");

const classCodeInput =
    document.getElementById("classCode");

const classNameInput =
    document.getElementById("className");

const teacherNameInput =
    document.getElementById("teacherName");

const roomCodeInput =
    document.getElementById("roomCode");

const closeModalButton =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelButton");

const submitButton =
    document.getElementById("submitButton");

const completionMessage =
    document.getElementById("completionMessage");

const submitStatus =
    document.getElementById("submitStatus");


// ======================================================
// CURRENTLY SELECTED PERIOD
// ======================================================

let selectedDay = null;

let selectedPeriod = null;


// ======================================================
// CURRENT USER
// ======================================================

let currentUser = null;


// ======================================================
// AUTHENTICATION
// ======================================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }


    currentUser = user;


    console.log(
        "Logged in as:",
        user.displayName
    );


    // Load existing timetable

    await loadExistingTimetable();

});


// ======================================================
// LOAD EXISTING TIMETABLE
// ======================================================
//
// This loads the timetable from:
//
// timetables/{uid}
//
// IMPORTANT:
// We do NOT run the automatic copying here.
//
// The database is treated as the source of truth.
//
// This prevents an edge-case timetable from being
// accidentally changed simply because the user opened
// this page.
//
// ======================================================

async function loadExistingTimetable() {

    try {

        submitStatus.textContent =
            "Checking for existing timetable...";


        const timetableRef =
            ref(
                db,
                `timetables/${currentUser.uid}`
            );


        const snapshot =
            await get(timetableRef);


        if (snapshot.exists()) {

            const savedTimetable =
                snapshot.val();


            // ==========================================
            // LOAD SAVED DATA
            // ==========================================

            days.forEach((day) => {

                periods.forEach((period) => {

                    if (
                        savedTimetable[day] &&
                        savedTimetable[day][period]
                    ) {

                        timetable[day][period] =
                            savedTimetable[day][period];

                    }

                });

            });


            console.log(
                "Existing timetable loaded."
            );


            submitStatus.textContent =
                "Existing timetable loaded. You can make changes.";

            submitStatus.style.color =
                "#333";


        } else {

            console.log(
                "No existing timetable found."
            );


            submitStatus.textContent =
                "No existing timetable found. Create your timetable below.";

            submitStatus.style.color =
                "#333";

        }


        // Display timetable

        renderTimetable();

        checkCompletion();


    } catch (error) {

        console.error(
            "Error loading timetable:",
            error
        );


        submitStatus.textContent =
            "Unable to load your existing timetable.";

        submitStatus.style.color =
            "red";


        renderTimetable();

        checkCompletion();

    }

}


// ======================================================
// PERIOD CLICK EVENTS
// ======================================================

document
    .querySelectorAll(".period-card")
    .forEach((card) => {

        card.addEventListener("click", () => {

            selectedDay =
                card.dataset.day;

            selectedPeriod =
                card.dataset.period;


            openClassModal(
                selectedDay,
                selectedPeriod
            );

        });

    });


// ======================================================
// OPEN CLASS MODAL
// ======================================================

function openClassModal(day, period) {

    const existingClass =
        timetable[day][period];


    if (existingClass) {

        modalTitle.textContent =
            "Edit Class";

    } else {

        modalTitle.textContent =
            "Add Class";

    }


    modalPeriod.textContent =
        `${day} • ${period} • ${periodTimes[period]}`;


    if (existingClass) {

        classCodeInput.value =
            existingClass.classCode || "";

        classNameInput.value =
            existingClass.className || "";

        teacherNameInput.value =
            existingClass.teacherName || "";

        roomCodeInput.value =
            existingClass.roomCode || "";

    } else {

        classForm.reset();

    }


    modal.classList.add("active");

    classCodeInput.focus();

}


// ======================================================
// CLOSE MODAL
// ======================================================

function closeModal() {

    modal.classList.remove("active");

    selectedDay = null;

    selectedPeriod = null;

    classForm.reset();

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


cancelButton.addEventListener(
    "click",
    closeModal
);


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeModal();

    }

});


// ======================================================
// FIND COPY GROUP
// ======================================================

function getCopyGroup(day, period) {

    for (const group of copyGroups) {

        const found = group.some(
            ([groupDay, groupPeriod]) =>
                groupDay === day &&
                groupPeriod === period
        );


        if (found) {

            return group;

        }

    }


    return null;

}


// ======================================================
// FIND DOUBLE PERIOD GROUP
// ======================================================

function getDoublePeriodGroup(day, period) {

    for (const group of doublePeriods) {

        const found = group.some(
            ([groupDay, groupPeriod]) =>
                groupDay === day &&
                groupPeriod === period
        );


        if (found) {

            return group;

        }

    }


    return null;

}


// ======================================================
// COPY CLASS TO CONNECTED PERIODS
// ======================================================
//
// Only EMPTY slots are automatically filled.
//
// Existing classes are never overwritten.
//
// ======================================================

function copyClassToConnectedPeriods(
    day,
    period,
    classData
) {

    // ==============================================
    // SPECIAL COPY GROUP
    // ==============================================

    const copyGroup =
        getCopyGroup(day, period);


    if (copyGroup) {

        copyGroup.forEach(
            ([targetDay, targetPeriod]) => {

                if (
                    timetable[targetDay][targetPeriod] === null
                ) {

                    timetable[targetDay][targetPeriod] = {
                        classCode: classData.classCode,
                        className: classData.className,
                        teacherName: classData.teacherName,
                        roomCode: classData.roomCode
                    };

                }

            }
        );

    }


    // ==============================================
    // NORMAL DOUBLE PERIOD
    // ==============================================

    const doubleGroup =
        getDoublePeriodGroup(day, period);


    if (doubleGroup) {

        doubleGroup.forEach(
            ([targetDay, targetPeriod]) => {

                if (
                    timetable[targetDay][targetPeriod] === null
                ) {

                    timetable[targetDay][targetPeriod] = {
                        classCode: classData.classCode,
                        className: classData.className,
                        teacherName: classData.teacherName,
                        roomCode: classData.roomCode
                    };

                }

            }
        );

    }

}


// ======================================================
// SAVE CLASS
// ======================================================

classForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (
            !selectedDay ||
            !selectedPeriod
        ) {

            return;

        }


        const classData = {

            classCode:
                classCodeInput.value
                    .trim()
                    .toUpperCase(),

            className:
                classNameInput.value
                    .trim(),

            teacherName:
                teacherNameInput.value
                    .trim(),

            roomCode:
                roomCodeInput.value
                    .trim()
                    .toUpperCase()

        };


        // ==============================================
        // CHECK FIELDS
        // ==============================================

        if (
            !classData.classCode ||
            !classData.className ||
            !classData.teacherName ||
            !classData.roomCode
        ) {

            return;

        }


        // ==============================================
        // SAVE SELECTED PERIOD
        // ==============================================

        timetable[selectedDay][selectedPeriod] =
            classData;


        // ==============================================
        // AUTOMATICALLY FILL CONNECTED EMPTY PERIODS
        // ==============================================

        copyClassToConnectedPeriods(
            selectedDay,
            selectedPeriod,
            classData
        );


        // ==============================================
        // UPDATE DISPLAY
        // ==============================================

        renderTimetable();

        checkCompletion();


        submitStatus.textContent =
            "Changes have been made. Remember to submit your timetable.";

        submitStatus.style.color =
            "#333";


        closeModal();

    }
);


// ======================================================
// RENDER TIMETABLE
// ======================================================

function renderTimetable() {

    document
        .querySelectorAll(".period-card")
        .forEach((card) => {

            const day =
                card.dataset.day;

            const period =
                card.dataset.period;


            const classData =
                timetable[day][period];


            // ==========================================
            // EMPTY PERIOD
            // ==========================================

            if (!classData) {

                card.innerHTML = `
                    <div class="empty-period">
                        <span>+</span>
                        <small>Add Class</small>
                    </div>
                `;

                return;

            }


            // ==========================================
            // FILLED PERIOD
            // ==========================================

            card.innerHTML = `
                <div class="class-details">

                    <div class="class-code">
                        ${escapeHTML(classData.classCode)}
                    </div>

                    <div class="class-name">
                        ${escapeHTML(classData.className)}
                    </div>

                    <div class="class-info">
                        Teacher:
                        ${escapeHTML(classData.teacherName)}
                        <br>
                        Room:
                        ${escapeHTML(classData.roomCode)}
                    </div>

                </div>
            `;

        });

}


// ======================================================
// CHECK COMPLETION
// ======================================================

function checkCompletion() {

    let complete = true;


    days.forEach((day) => {

        periods.forEach((period) => {

            if (
                timetable[day][period] === null
            ) {

                complete = false;

            }

        });

    });


    if (complete) {

        submitButton.disabled = false;

        completionMessage.textContent =
            "All 20 periods are complete. You can now submit your timetable.";

    } else {

        submitButton.disabled = true;

        completionMessage.textContent =
            "Complete all 20 periods before submitting.";

    }

}


// ======================================================
// SUBMIT TIMETABLE
// ======================================================
//
// This is where we synchronise:
//
// 1. The user's timetable
// 2. The classes directory
//
// Old class memberships are removed.
// New class memberships are added.
//
// ======================================================

submitButton.addEventListener(
    "click",
    async () => {

        if (!currentUser) {

            submitStatus.textContent =
                "You must be logged in to submit.";

            return;

        }


        // ==============================================
        // MAKE SURE ALL 20 PERIODS ARE COMPLETE
        // ==============================================

        let complete = true;


        days.forEach((day) => {

            periods.forEach((period) => {

                if (
                    timetable[day][period] === null
                ) {

                    complete = false;

                }

            });

        });


        if (!complete) {

            submitStatus.textContent =
                "Please complete all 20 periods.";

            return;

        }


        submitButton.disabled = true;

        submitButton.textContent =
            "Submitting...";

        submitStatus.textContent = "";


        try {

            const uid =
                currentUser.uid;


            // ==============================================
            // GET CURRENT DATABASE TIMETABLE
            // ==============================================

            const oldTimetableRef =
                ref(
                    db,
                    `timetables/${uid}`
                );


            const oldTimetableSnapshot =
                await get(oldTimetableRef);


            const oldTimetable =
                oldTimetableSnapshot.exists()
                    ? oldTimetableSnapshot.val()
                    : {};


            // ==============================================
            // FIND ALL OLD CLASS CODES
            // ==============================================

            const oldClassCodes =
                new Set();


            days.forEach((day) => {

                periods.forEach((period) => {

                    const classData =
                        oldTimetable?.[day]?.[period];


                    if (
                        classData &&
                        classData.classCode
                    ) {

                        oldClassCodes.add(
                            classData.classCode
                        );

                    }

                });

            });


            // ==============================================
            // FIND ALL NEW CLASS CODES
            // ==============================================

            const newClassCodes =
                new Set();


            days.forEach((day) => {

                periods.forEach((period) => {

                    const classData =
                        timetable[day][period];


                    if (
                        classData &&
                        classData.classCode
                    ) {

                        newClassCodes.add(
                            classData.classCode
                        );

                    }

                });

            });


            // ==============================================
            // CREATE MULTI-PATH UPDATE
            // ==============================================

            const updates = {};


            // ==============================================
            // SAVE TIMETABLE
            // ==============================================

            days.forEach((day) => {

                periods.forEach((period) => {

                    updates[
                        `timetables/${uid}/${day}/${period}`
                    ] =
                        timetable[day][period];

                });

            });


            // ==============================================
            // SAVE USER INFORMATION
            // ==============================================

            updates[
                `users/${uid}/name`
            ] =
                currentUser.displayName || "";


            updates[
                `users/${uid}/email`
            ] =
                currentUser.email || "";


            // ==============================================
            // REMOVE OLD CLASS MEMBERSHIPS
            // ==============================================
            //
            // Example:
            //
            // Old:
            // STU12C
            //
            // New:
            // STU12A
            //
            // This creates:
            //
            // classes/STU12C/uid = null
            //
            // ==============================================

            oldClassCodes.forEach((classCode) => {

                if (
                    !newClassCodes.has(classCode)
                ) {

                    updates[
                        `classes/${classCode}/${uid}`
                    ] = null;

                }

            });


            // ==============================================
            // ADD CURRENT CLASS MEMBERSHIPS
            // ==============================================

            newClassCodes.forEach((classCode) => {

                updates[
                    `classes/${classCode}/${uid}`
                ] = true;

            });


            // ==============================================
            // SEND EVERYTHING TO FIREBASE
            // ==============================================

            await update(
                ref(db),
                updates
            );


            // ==============================================
            // SUCCESS
            // ==============================================

            submitStatus.textContent =
                "Timetable successfully submitted!";

            submitStatus.style.color =
                "green";

            submitButton.textContent =
                "Submitted";


            console.log(
                "Timetable and class memberships updated."
            );


        } catch (error) {

            console.error(
                "Error submitting timetable:",
                error
            );


            submitStatus.textContent =
                "There was an error submitting your timetable. Please try again.";

            submitStatus.style.color =
                "red";


            submitButton.disabled = false;

            submitButton.textContent =
                "Submit Timetable";

        }

    }
);


// ======================================================
// ESCAPE HTML
// ======================================================
//
// Prevents class information entered by users from being
// interpreted as HTML when displayed in the timetable.
//
// ======================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

