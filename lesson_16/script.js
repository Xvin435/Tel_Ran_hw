class Employee {
    #id;
    #name="Anonymous";
    title;
    #salary;
    constructor(name,title, salary, id) {
        this.#id= undefined;
        this.setName(name);
        this.title=title;
        this.setSalary(salary);
        this.setId(id);
    }
    setName(name) {
        if((name&&typeof name=='string') && name.trim() !== '')
            this.#name=name.trim();
        else    
            throw new Error("Invalid name");
    }

    setTitle(title) {
        if (title && typeof title === 'string' && title.trim() !== '')
            this.title = title.trim();
        else
            throw new Error("Invalid title");
    }


    setSalary(salary) {
        if (typeof salary=='number' && salary >= 0)
            this.#salary=salary;
        else
            throw new Error("Invalid salary");
    }

    setId(id) {
        if (typeof id === 'number' && id >= 0)
            this.#id = id;
        else 
            throw new Error("Invalid id");
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

    /* StartPage */
    #companyNameInput;
    #submitCompanyNameButton;

    //
    #contentDiv = document.getElementById("content");

    /* MainManagerPage */

    #employeeSearchInput;
    #employeeSearchTypeSelect;
    #employeeTable;

    //CARDS
    //--
    //add
    #employeeNameInput;
    #employeeTitleInput;
    #employeeSalaryInput;
    #employeeIdInput
    #employeeAction;
    #employeeSubmitButton

    //remove
    #removeEmpIdInput;
    #removeEmpButton;

    //other
    #greatH1 = "greatH1";

    main() {
        this.initStartPage();

        this.#submitCompanyNameButton.addEventListener("click", () => {
            let companyName = this.#companyNameInput.value.trim();
            if (!this.regexTest(companyName)) {
                this.showInvalidInput(this.#companyNameInput, "Invalid Company Name!");
                return;
            }
            this.closeStartPage();
            this.#company = new Company(companyName);
            this.initManagerPage();
        });
    }

    initStartPage() {
        let createCompanyDiv = document.createElement("div");
        createCompanyDiv.id = "createCompanyDiv";
        this.#contentDiv.appendChild(createCompanyDiv);

        let welcomeMessage = document.createElement("h1");
        welcomeMessage.className = this.#greatH1;
        welcomeMessage.textContent = "Create Company";
        createCompanyDiv.appendChild(welcomeMessage);

        this.#companyNameInput = document.createElement("input");
        this.#companyNameInput.id = "companyNameInput";
        this.#companyNameInput.placeholder = "Company Name";
        createCompanyDiv.appendChild(this.#companyNameInput);

        this.#submitCompanyNameButton = document.createElement("button");
        this.#submitCompanyNameButton.id = "createCompanyButton";
        this.#submitCompanyNameButton.textContent = "Create";
        createCompanyDiv.appendChild(this.#submitCompanyNameButton);

    }

    closeStartPage() {
        let startPage = document.getElementById("createCompanyDiv");
        if (startPage) {
            startPage.remove();
        }
    }

    initManagerPage() {
        let header = document.createElement("div");
        header.id = "header";
        this.#contentDiv.append(header);

        let welcomeText = document.createElement("h1");
        welcomeText.innerHTML = 
            `Welcome to <span id="companyName">${this.#company.getCompanyName()}</span> company!`;
        header.appendChild(welcomeText);

        //poisk
        let searchBar = document.createElement("div");
        searchBar.id = "searchBar";
        header.append(searchBar);

        let searchTitle = document.createElement("h2");
        searchTitle.className = this.#greatH1;
        searchTitle.textContent = "Search Employee";

        let searchBox = document.createElement("div");
        searchBox.className = "searchBox";

        this.#employeeSearchInput = document.createElement("input");
        this.#employeeSearchInput.placeholder = "Search employee...";

        this.#employeeSearchTypeSelect =
        document.createElement("select");

        ["Global","Name","Title","Salary","Id"].forEach(type => {
            let option = document.createElement("option");

            option.value = type;

            option.textContent = type;

            this.#employeeSearchTypeSelect.appendChild(option);
        });

        searchBox.appendChild(this.#employeeSearchInput);
        searchBox.appendChild(this.#employeeSearchTypeSelect);

        searchBar.appendChild(searchTitle);
        searchBar.appendChild(searchBox);

        // tb
        let employeeList = document.createElement("div");
        employeeList.id = "employeeList";
        this.#contentDiv.append(employeeList);

        this.#employeeTable = document.createElement("table");
        this.#employeeTable.id = "employeeTable";
        this.#employeeTable.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Salary</th>
            </tr>
        </thead>

        <tbody id="employeeTableBody">

            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>

        </tbody>`;

        employeeList.appendChild(this.#employeeTable);

        //controls
        let employeeControls = document.createElement("div");
        employeeControls.id = "employeeControls";
        this.#contentDiv.append(employeeControls);

        let editorCard = document.createElement("div");
        editorCard.className = "employeeCard";
        employeeControls.appendChild(editorCard);

        let editorTitle = document.createElement("h3");
        editorTitle.textContent = "Employee Editor";
        editorCard.appendChild(editorTitle);

        this.#employeeIdInput = document.createElement("input");
        this.#employeeIdInput.placeholder = "ID not required";
        this.#employeeIdInput.disabled = true;
        editorCard.appendChild(this.#employeeIdInput);

        this.#employeeNameInput = document.createElement("input");
        this.#employeeNameInput.placeholder = "Employee Name";
        editorCard.appendChild(this.#employeeNameInput);

        this.#employeeTitleInput = document.createElement("input");
        this.#employeeTitleInput.placeholder = "Employee Title"
        editorCard.append(this.#employeeTitleInput);

        this.#employeeSalaryInput = document.createElement("input");
        this.#employeeSalaryInput.placeholder = "Employee Salary"
        editorCard.append(this.#employeeSalaryInput);

        let actionRow = document.createElement("div");
        actionRow.className = "actionRow";
        editorCard.appendChild(actionRow);

        this.#employeeAction = document.createElement("select");
        actionRow.appendChild(this.#employeeAction);

        ["Add","Update"]
        .forEach(text=>{
            let option = document.createElement("option");
            option.value = text.toLowerCase();
            option.textContent = text;

            this.#employeeAction.appendChild(option);
        });

        this.#employeeSubmitButton = document.createElement("button");
        this.#employeeSubmitButton.textContent = "Submit";
        actionRow.appendChild(this.#employeeSubmitButton);

        let removeCard = document.createElement("div");
        removeCard.className = "employeeCard";
        employeeControls.appendChild(removeCard);

        let removeTitle = document.createElement("h3");
        removeTitle.textContent = "Employee remove";
        removeCard.appendChild(removeTitle);

        this.#removeEmpIdInput = document.createElement("input");
        this.#removeEmpIdInput.placeholder = "Employee ID";
        removeCard.appendChild(this.#removeEmpIdInput);

        this.#removeEmpButton = document.createElement("button");
        this.#removeEmpButton.textContent = "Remove";
        removeCard.append(this.#removeEmpButton)
    }

    showInvalidInput(input, message = "Invalid input") {
        let originalPlaceholder = input.placeholder;

        input.classList.add("invalidInput");
        input.value = "";
        input.placeholder = message;
        input.addEventListener("input", () => {
            input.classList.remove("invalidInput");
            input.placeholder = originalPlaceholder;
        });
    }

    regexTest(value) {
        let regex = /^[a-zA-ZÐ°-ÑÐ-Ð¯\s]+$/;
        return regex.test(value);
    }
}

let app = new Application();
app.main();