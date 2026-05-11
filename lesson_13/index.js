class Employee {
    #id;
    #name="Anonymous";
    title;
    #salary;
    constructor(id,name,title, salary) {
        this.#id=id;
        this.setName(name);
        this.title=title;
        this.setSalary(salary);
    }
    setName(name) {
        if(name&&typeof name=='string') {
            this.#name=name;
        }
    }


    setSalary(salary) {
        if (typeof salary=='number'&& salary>10000) {
            this.#salary=salary;
        }
    }
    getName(){
        return this.#name;
    }
    getSalary(){
        return this.#salary;
    }
    getId(){
        return this.#id;
    }
    toString(){
        return `Employee ${this.#name} ${this.#salary} ${this.title} `;
    }
}

class Company{
    #employees=[];

    hireEmployee(employee) {
        if (employee instanceof Employee) {
            this.#employees.push(employee);
        }
    }

    fireEmployee(id) {
        let temp = 0;
        for (let i = 0; i < this.#employees.length; i++)
            if (this.#employees[i].getId() === id)
                temp++;

        if (temp > 1)
            throw new Error(temp + " Employees with the same id");

        this.#employees = this.#employees.filter(employee => employee.getId() !== id);
    }

    getAllEmployee() {
        return [...this.#employees];
    }

    getTotalSalary() {
        return this.#employees.reduce((total, employee) => total + employee.getSalary(), 0);
    }

    getEmployeeMinSalary() {
        let min = 0;
        for (let employee of this.#employees) 
            if (employee.getSalary() < min) 
                min = employee.getSalary();
        return min;
    }
}