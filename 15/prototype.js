var idCounter = 0;

function Employee(name, dept) {
   this.name = name || '';
   this.dept = dept || 'general';
   this.id = idCounter++;
}

function Manager(name, dept, reports) {}
Manager.prototype = new Employee;

function WorkerBee(name, dept, projs) {}
WorkerBee.prototype = new Employee;

function Engineer(name, projs, mach) {}
Engineer.prototype = new WorkerBee;

function SalesPerson(name, projs, quota) {}
SalesPerson.prototype = new WorkerBee;

var mac = new Engineer('Wood, Mac');
console.log(mac.id);
