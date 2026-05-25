class Employee {
    #id;
    #name="Anonymous";
    #title;
    #salary;
    constructor(name,title, salary) {
        this.#id= undefined;
        this.setName(name);
        this.setTitle(title);
        this.setSalary(salary);
    }
    setName(name) {
        if((name&&typeof name=='string') && name.trim() !== '') {
            this.#name=name.trim();
        }
    }

    setTitle(title) {
        if (title && typeof title === 'string' && title.trim() !== '') {
            this.title = title.trim();
        }
    }


    setSalary(salary) {
        if (typeof salary=='number') {
            this.#salary=salary;
        }
    }
    getName(){
        return this.#name;
    }
    getSalary(){
        return this.#salary;
    }
    getTitle(){
        return this.title;
    }
    setId(id) {
        if (typeof id === 'number' && id >= 0)
            this.#id = id;
        else 
            throw new Error("Invalid id");
    }
    getId(){
        return this.#id;
    }
    toString(){
        return `Employee ${this.#name} ${this.#salary} ${this.title} ${this.#id} `;
    }
}

class Company{
    #name;
    #employees=[];
    #nextId=0;

    constructor(name) {
        this.#name = name;
    }

    addEmployee(employee) {

        if (!(employee instanceof Employee)) 
            throw new Error("Invalid employee");

        if (employee.getId() === undefined || employee.getId() === null) 
            employee.setId(this.#nextId++);

        if (this.#employees.some(e => e.getId() === employee.getId()))
            throw new Error("Employee with the same id already exists");

        this.#employees.push(employee);
    }

    fireEmployee(id) {

        if (!this.#employees.some(e => e.getId() === id))
            throw new Error("Employee not found");

        this.#employees = this.#employees.filter(employee => employee.getId() !== id);
    }

    getAllEmployee() {
        return [...this.#employees];
    }

    getEmployeeById(id) {
        let employee = this.#employees.find(e => e.getId() === id);
        if (!employee)
            throw new Error("Employee not found");
        return employee;
    }

    updateEmployee(id, newName, newTitle, newSalary) {

        let employee = this.#employees.find(e => e.getId() === id);
        if (!employee)
            throw new Error("Employee not found");

        employee.setName(newName);
        employee.setTitle(newTitle);
        employee.setSalary(newSalary);
    }

    getTotalSalary() {
        return this.#employees.reduce((total, employee) => total + employee.getSalary(), 0);
    }

    getEmployeeMinSalary() {

        if (this.#employees.length === 0)
            return 0;

        let min = Infinity;
        for (let employee of this.#employees) 
            if (employee.getSalary() < min) 
                min = employee.getSalary();
        return min;
    }

    getCompanyName() {
        return this.#name;
    }
}

class Application {

    #company;

    #employeeManagerDiv;
    #createCompanyDiv

    main() {

        this.#employeeManagerDiv = document.getElementById("employeeManagerDiv");
        this.#employeeManagerDiv.style.display = "none";

        this.#createCompanyDiv = document.getElementById("createCompanyDiv");

        let createCompanyButton = document.getElementById("createCompanyButton");
        createCompanyButton.addEventListener("click", () => {
            if (!this.regexTest(document.getElementById("companyNameInput").value)) {
                this.showInvalidInput(document.getElementById("companyNameInput"), "Invalid Company Name!");
                return;
            }
            let companyNameInput = document.getElementById("companyNameInput");
            this.onCompanyInit(companyNameInput.value);
        });

        let addEmployeeButton = document.getElementById("addEmployeeButton");
        addEmployeeButton.addEventListener("click", () => this.addEmployee());

        let employeeIdToRemoveButton = document.getElementById("removeEmployeeButton");
        employeeIdToRemoveButton.addEventListener("click", () => this.removeEmployee());

        let employeeIdToUpdateButton = document.getElementById("updateEmployeeButton");
        employeeIdToUpdateButton.addEventListener("click", () => this.updateEmployee());

        let searchInputs = [
            document.getElementById("employeeNameSearchInput"),
            document.getElementById("employeeTitleSearchInput"),
            document.getElementById("employeeSalarySearchInput"),
            document.getElementById("employeeIdSearchInput")
        ];

        searchInputs.forEach(input => {
            input.addEventListener("input", () => {
                let searchData = [];
                searchInputs.forEach(i => searchData.push(i.value.trim()));
                this.searchEmployees(searchData);
            });
        });
    }

    onCompanyInit(input) {
        this.#company = new Company(input);
        document.getElementById("companyName").textContent = this.#company.getCompanyName();

        this.#createCompanyDiv.style.display = "none";
        this.#employeeManagerDiv.style.display = "block";

        /* DEFAULT TEST DATA */
        this.#company.addEmployee(new Employee("Alex", "Manager", 25000));
        this.#company.addEmployee(new Employee("John", "Developer", 18000));
        this.#company.addEmployee(new Employee("Anna", "Designer", 22000));
        this.#company.addEmployee(new Employee("Mike", "Tester", 17000));
        this.#company.addEmployee(new Employee("Sophia", "HR", 20000));
        this.updateTable();
    }

    addEmployee() {
        let isValid = true;

        let employeeNameInput = document.getElementById("employeeNameInput");
        if (!employeeNameInput.value || employeeNameInput.value.trim() === "" || !this.regexTest(employeeNameInput.value)) {
            this.showInvalidInput(employeeNameInput,"Invalid Name!");
            isValid = false;
        }
        let employeeTitleInput = document.getElementById("employeeTitleInput");
        if (!employeeTitleInput.value || employeeTitleInput.value.trim() === "") {
            this.showInvalidInput(employeeTitleInput, "Invalid Title!");
            isValid = false;
        }
        let employeeSalaryInput = document.getElementById("employeeSalaryInput");
        let salary = parseFloat(employeeSalaryInput.value);
        if (isNaN(salary) || salary < 0) {
            this.showInvalidInput(employeeSalaryInput, "Invalid Salary!");
            isValid = false;
        }

        if (!isValid) return;

        let employee = new Employee(employeeNameInput.value, employeeTitleInput.value, salary);
        try {
            this.#company.addEmployee(employee);
            console.log(this.#company.getAllEmployee());
            this.updateTable();
            employeeNameInput.value = "";
            employeeTitleInput.value = "";
            employeeSalaryInput.value = "";
        } catch (error) {
            alert(error.message);
        }
    }

    removeEmployee() {
        let employeeIdToRemoveInput = document.getElementById("employeeIdToRemoveInput");
        let id = parseInt(employeeIdToRemoveInput.value);
        if (isNaN(id)) {
            this.showInvalidInput(employeeIdToRemoveInput, "Invalid ID!");
            return;
        }
        try {
            this.#company.fireEmployee(id);
            this.updateTable();
            employeeIdToRemoveInput.value = "";
        } catch (error) {
            this.showInvalidInput(employeeIdToRemoveInput, error.message);
        }
    }

    updateEmployee() {
        let employeeIdToUpdateInput = document.getElementById("employeeIdToUpdateInput");
        let employeeNameToUpdateInput = document.getElementById("employeeNameToUpdateInput");
        let employeeTitleToUpdateInput = document.getElementById("employeeTitleToUpdateInput");
        let employeeSalaryToUpdateInput = document.getElementById("employeeSalaryToUpdateInput");

        let data = [
            employeeIdToUpdateInput,
            employeeNameToUpdateInput,
            employeeTitleToUpdateInput,
            employeeSalaryToUpdateInput
        ]

        let id = parseInt(employeeIdToUpdateInput.value);
        if (isNaN(id)) {
            this.showInvalidInput(employeeIdToUpdateInput, "Invalid ID!");
            for (let i = 1; i < data.length; i++) 
                this.showInvalidInput(data[i], "");
            return;
        }

        try {
            let employee = this.#company.getEmployeeById(id);
            let newName = employeeNameToUpdateInput.value.trim() || employee.getName();
            let newTitle = employeeTitleToUpdateInput.value.trim() || employee.getTitle();
            let newSalary = parseFloat(employeeSalaryToUpdateInput.value);

            if (isNaN(newSalary) || newSalary < 0) newSalary = employee.getSalary();

            this.#company.updateEmployee(id, newName, newTitle, newSalary);
            this.updateTable();

            for (let input of data)
                input.value = "";
        } catch (error) {
            this.showInvalidInput(employeeIdToUpdateInput, error.message);
            for (let i = 1; i < data.length; i++) 
                this.showInvalidInput(data[i], "");
            return;
        }

        
    }

    updateTable(employees = this.#company.getAllEmployee()) {
        let tbody = document.getElementById("employeeTableBody");
        tbody.innerHTML = "";

        if (employees.length === 0) {
            tbody.innerHTML = "<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
            return;
        }

        for (let employee of employees) {
            let row = '<tr><td>' + employee.getId() + '</td><td>' + employee.getName() + '</td><td>' + employee.getTitle() + '</td><td>' + employee.getSalary() + '</td></tr>';
            tbody.innerHTML += row;
        }
    }

    searchEmployees(input) {

        let [name, title, salary, id] = input;
        let filteredEmployees = this.#company.getAllEmployee().filter(employee => {
            let matches = true;
            if (name) matches = matches && employee.getName().toLowerCase().includes(name.toLowerCase());
            if (title) matches = matches && employee.getTitle().toLowerCase().includes(title.toLowerCase());
            if (salary) matches = matches && employee.getSalary() === parseFloat(salary);
            if (id) matches = matches && employee.getId() === parseInt(id);
            return matches;
        });

        this.updateTable(filteredEmployees);
    }

    showInvalidInput(input, message = "Invalid input") {
        let originalPlaceholder = input.placeholder;

        input.classList.add("invalidInput");
        input.value = "";
        input.placeholder = message;
        input.oninput = () => {
            input.classList.remove("invalidInput");
            input.placeholder = originalPlaceholder;
        };
    }

    regexTest(value) {
        let regex = /^[a-zA-ZÐ°-ÑÐ-Ð¯\s]+$/;
        return regex.test(value);
    }
}

new Application().main();