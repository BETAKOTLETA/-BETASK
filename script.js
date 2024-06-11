document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login");
    const tableBody = document.getElementById("table-body");
    const clearbut = document.getElementById("clear-button");

    clearbut.addEventListener("click", () => {
        localStorage.clear();
        const tableRows = document.querySelectorAll("#table-body tr");
        tableRows.forEach(row => {
            row.innerHTML = ""; 
        });
    });

    let counter = parseInt(localStorage.getItem('counter')) || 1; 

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const ageInput = document.getElementById("age");
        const age = parseInt(ageInput.value, 10);

        if (age < 18 || age > 125) {
            alert("Age must be between 18 and 125");
            ageInput.value = "";
            return;
        }

        if (surname === "" || name === ""){
            alert("Name and surname cannot be empty");
            return;
        }

        const studentData = { name, surname, age };
        addTableRow(studentData);

        save(name, surname, age, counter);
        form.reset();

        counter++;
        localStorage.setItem('counter', counter); 
    });

    function addTableRow(studentData) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${counter}</td>
            <td>${studentData.name}</td>
            <td>${studentData.surname}</td>
            <td>${studentData.age}</td>
        `;
        tableBody.appendChild(row);
    }

    function save(name, surname, age, counter) {
        const data = { name, surname, age };
        localStorage.setItem(`student${counter}`, JSON.stringify(data));
    }
    function loadFromLocalStorage() {
        for (let i = 1; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("student")) {
                const studentData = JSON.parse(localStorage.getItem(key));
                addTableRow(studentData);
            }
        }
    }

    loadFromLocalStorage();
});
