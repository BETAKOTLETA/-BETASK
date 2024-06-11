document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login");
    const tableBody = document.getElementById("table-body");
    let counter = 1;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const ageInput = document.getElementById("age");
        const age = parseInt(ageInput.value, 10);

        console.log(`Name=${name}, Surname=${surname}, Age=${age}`);

        if (age < 18 || age > 125) {
            alert("Age must be between 18 and 125");
            ageInput.value = "";
            return;
        }

        if (surname === "" || name === ""){
            alert("Name and surname cannot be empty");
            return;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${counter}</td>
            <td>${name}</td>
            <td>${surname}</td>
            <td>${age}</td>
        `;

        save(name, surname, age, counter);

        tableBody.appendChild(row);

        form.reset();

        let studentData = localStorage.getItem(`student${counter}`);
        if (studentData) {
            const student = JSON.parse(studentData);
            console.log(`Student ${counter} data:`, student);
        } else {
            console.log(`No data stored under the key 'student${counter}'`);
        }
        counter++;
    });
});

function save(name, surname, age, counter) {
    const data = { name, surname, age };
    localStorage.setItem(`student${counter}`, JSON.stringify(data)); // i steal this part of code
}

