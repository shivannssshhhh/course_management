const apiUrl = "http://localhost:8080/api/courses";

window.onload = loadCourses;

// CREATE or UPDATE
function addOrUpdateCourse() {
    const id = document.getElementById("courseId").value;
    const course = {
        courseName: document.getElementById("courseName").value,
        courseDuration: document.getElementById("courseDuration").value,
        courseFee: document.getElementById("courseFee").value
    };

    if (id === "") {
        // ADD
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course)
        }).then(loadCourses);
    } else {
        // UPDATE
        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course)
        }).then(loadCourses);
    }

    clearForm();
}

// READ
function loadCourses() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("courseTable");
            table.innerHTML = "";

            data.forEach(course => {
                table.innerHTML += `
                    <tr>
                        <td>${course.id}</td>
                        <td>${course.courseName}</td>
                        <td>${course.courseDuration}</td>
                        <td>${course.courseFee}</td>
                        <td>
                            <button class="edit" onclick='editCourse(${JSON.stringify(course)})'>Edit</button>
                            <button class="delete" onclick="deleteCourse(${course.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// DELETE
function deleteCourse(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    }).then(loadCourses);
}

// EDIT
function editCourse(course) {
    document.getElementById("courseId").value = course.id;
    document.getElementById("courseName").value = course.courseName;
    document.getElementById("courseDuration").value = course.courseDuration;
    document.getElementById("courseFee").value = course.courseFee;
}

function clearForm() {
    document.getElementById("courseId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseDuration").value = "";
    document.getElementById("courseFee").value = "";
}
