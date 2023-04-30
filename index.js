/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employee) {
    const [firstName, familyName, title, payPerHour] = employee;

    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employees) {
    return employees.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    const event = {
        type: "TimeIn",
        date,
        hour: parseInt(hour),
    };

    this.timeInEvents.push(event);

    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    const event = {
        type: "TimeOut",
        date,
        hour: parseInt(hour),
    };

    this.timeOutEvents.push(event);

    return this;
}

function hoursWorkedOnDate(date) {
    const { timeInEvents, timeOutEvents } = this;
    const len = timeInEvents.length;

    let totHrs = 0;

    for (let i = 0; i < len; ++i) {
        const timeInEvent = timeInEvents[i];
        const timeOutEvent = timeOutEvents[i];

        if (timeInEvent.date != date) continue;

        totHrs = timeOutEvent.hour - timeInEvent.hour;
        break;
    }

    totHrs /= 100;
    return totHrs;
}

function wagesEarnedOnDate(date) {
    const { payPerHour } = this;

    return hoursWorkedOnDate.call(this, date) * payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    return employees.reduce((acc, employee, index) => {
        const { timeInEvents, timeOutEvents, payPerHour } = employee;
        const len = employee.timeInEvents.length;

        let totHrs = 0;

        for (let i = 0; i < len; ++i) {
            const timeInEvent = timeInEvents[i];
            const timeOutEvent = timeOutEvents[i];

            totHrs += (timeOutEvent.hour - timeInEvent.hour) / 100;
        }

        return acc + totHrs * payPerHour;
    }, 0);
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(
        function (memo, d) {
            return memo + wagesEarnedOnDate.call(this, d);
        }.bind(this),
        0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};
