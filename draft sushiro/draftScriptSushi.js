// update htmlElement
const updateTotalPriceHtmlText = (SubTotal) => {
    document.getElementById(
        "totalPrice"
    ).textContent = `Sub Total Price: ${SubTotal.toLocaleString()} THB`;
};

const updateServiceChargeHtmlText = (serviceCharge) => {
    document.getElementById(
        "serviceCharge"
    ).textContent = `Service Charge (10%): ${serviceCharge} THB`;
};


const updateTotalPriceWithServiceChargeHtmlText = (
    totalPriceWithServiceCharge
) => {
    document.getElementById(
        "totalPriceWithServiceCharge"
    ).textContent = `Total Price: ${totalPriceWithServiceCharge} THB`;
};

const updateDishCountOfAllDishHtmlElement = (quantities) => {
    for (let j = 1; j <= quantities.length; j++) {
        document.getElementById(`dish${j}Quantity`).textContent = quantities[j - 1];
    }
};

// total amount from everyone element
const updateTotalAmountFromEveryOneHtmlText = (formattedTotalAmount) => {
    document.getElementById(
        "totalAmountFromEveryone"
    ).textContent = `Total amount from everyone = ${formattedTotalAmount} THB`;
};

const displayTotalAmountFromEveryoneElement = () => {
    const totalAmountFromEveryoneElement = document.getElementById(
        "totalAmountFromEveryone"
    );
    totalAmountFromEveryoneElement.style.display = "block";
};

const hideTotalAmountFromEveryoneElement = () => {
    const totalAmountFromEveryoneElement = document.getElementById(
        "totalAmountFromEveryone"
    );
    totalAmountFromEveryoneElement.style.display = "none";
};

// person element
const createPersonElement = (personCounter, totalPriceWithServiceCharge) => {
    const personElement = document.createElement("h2");
    personElement.id = `Person ${personCounter}`;
    // personElement.textContent = `Person ${personCounter}: ${totalPriceWithServiceCharge} THB`;
    personElement.textContent = `Person ${personCounter}: ${new Intl.NumberFormat().format(totalPriceWithServiceCharge)} THB`;
    // personElement.textContent = `Person ${personCounter}: ${totalPriceWithServiceCharge.toLocaleString()} THB`;
    createdPersonElements.push(personElement);

    const element = document.getElementById("totalPerson"); // get an element of an container totalPerson
    element.appendChild(personElement); // appendChild  = add an element at the end of the element. similar to push() of array. appendChild is for HTMLElement.
};

const getPersonElementById = (personCounter) => {
    const personId = `Person ${personCounter}`;
    return document.getElementById(personId);
};


const updatePersonTotalHtmlText = (personTotals) => {
    for (const [i, total] of personTotals.entries()) {
        getPersonElementById(i + 1).textContent = `Person ${i + 1}: ${total} THB`;
    }
};

const removePersonElement = (personCounter) => {
    const personElement = getPersonElementById(personCounter);

    if (personElement) {
        personElement.remove();
    }
};

const removeAllPersonElements = () => {
    const personElements = document.querySelectorAll("h2[id^='Person']");
    personElements.forEach((element) => {
        element.remove();
    });
};

// helper function

//  const formatNumberWithCommas = (number) => {
//   return number.toLocaleString(); // Using toLocaleString to format with commas
// };

// const formatNumberWithCommas = (number) => {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

const prices = [40, 60, 80, 120, 100, 160]; // Dish prices
const createdPersonElements = [];
const stepHistory = [];

// Initialize the quantities of dishes
let quantities = [0, 0, 0, 0, 0, 0]; // dish1Quantity, dish2Quantity, ..., dish6Quantity
// quantity = { // TODO ลองเปลี่ยน quantities เป็น object
//   dish1: 0,
//   dish2: 0,
//   ...
// }
let totalPrices = [];
let personTotals = [];
let previousQuantities = []; // array of array
let previousPersonTotals = []; // array of array

const calculateSubTotalAndServiceChargeAndTotalPriceWithServiceCharge = (
    quantities
) => {
    let SubTotal = 0;
    let serviceCharge = 0;

    for (let i = 0; i < quantities.length; i++) {
        const dishPrice = quantities[i] * prices[i];
        SubTotal += dishPrice;
    }

    serviceCharge = SubTotal * 0.1;
    const totalPriceWithServiceCharge = SubTotal + serviceCharge;

    return {
        SubTotal,
        serviceCharge,
        totalPriceWithServiceCharge,
    };
};

// Function to update the total price and quantities
const updateTotalPrice = () => {
    const { SubTotal, serviceCharge, totalPriceWithServiceCharge } =
        calculateSubTotalAndServiceChargeAndTotalPriceWithServiceCharge(quantities);

    updateTotalPriceHtmlText(SubTotal);
    updateServiceChargeHtmlText(serviceCharge);
    updateTotalPriceWithServiceChargeHtmlText(totalPriceWithServiceCharge);
    const formattedTotalAmount = totalPriceWithServiceCharge.toLocaleString();
    updateTotalPriceWithServiceChargeHtmlText(formattedTotalAmount);
    updateDishCountOfAllDishHtmlElement(quantities);
};

const addDish = (index) => {
    quantities[index]++;
    updateTotalPrice();
};

const minusDish = (index) => {
    if (quantities[index] > 0) {
        quantities[index]--;
        updateTotalPrice();
    }
};

const updateTotalAmountFromEveryone = () => {
    const totalAmountFromEveryone = personTotals.reduce(
        (total, amount) => total + amount,
        0
    );

    const formattedTotalAmount = totalAmountFromEveryone.toLocaleString();
    updateTotalAmountFromEveryOneHtmlText(formattedTotalAmount);
};

const savePreviousQuantities = () => {
    previousQuantities.push(quantities.slice());
};

const undoLastAction = () => {
    quantities = previousQuantities.pop();
    updateTotalPrice();

    removePersonElement(personTotals.length);

    personTotals.pop();
    if (personTotals.length === 0) {
        hideTotalAmountFromEveryoneElement();
    }
    updateTotalAmountFromEveryone();
};

const CalNextPerson = () => {
    savePreviousQuantities();

    const { SubTotal, serviceCharge, totalPriceWithServiceCharge } =
        calculateSubTotalAndServiceChargeAndTotalPriceWithServiceCharge(quantities);

    totalPrices.push(totalPriceWithServiceCharge);
    personTotals.push(totalPriceWithServiceCharge);

    createPersonElement(personTotals.length, totalPriceWithServiceCharge);
    quantities = [0, 0, 0, 0, 0, 0];
    updateTotalPrice();

    displayTotalAmountFromEveryoneElement();
    updateTotalAmountFromEveryone();
};

const clearPage = () => {
    quantities = [0, 0, 0, 0, 0, 0];
    totalPrices = [];
    personTotals = [];
    updateTotalPrice();

    for (const [i, personElement] of createdPersonElements.entries()) {
        personElement.style.display = "none";
    }

    hideTotalAmountFromEveryoneElement();

    removeAllPersonElements();
};



// function hideSidebar() {
//   const sidebarMenu = document.getElementsByClassName("sidebar_menu")[0];
//   sidebarMenu.style.display = "none";
// }



const opennedSidebar = (event) => {
    event.stopPropagation();
    document.getElementById("check").checked = true;
};

const toggleOutSidebar = () => {
    document.getElementById("check").checked = false;
};



