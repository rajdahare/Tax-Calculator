



const inputs = document.querySelectorAll("input, select");
const errorIcons = document.querySelectorAll(".bi-exclamation-circle");
const errorTexts = document.querySelectorAll(
  ".bi-exclamation-circle .tooltiptext"
);
const ageGroup = document.querySelector("#age-group");
const overallIncome = document.querySelector("#overall-income");
const resultDiv = document.querySelector("#result");
const closeButton = document.querySelector(".close");
const submitButton = document.querySelector(".submit");
const taxText = document.querySelector("#tax-text");

// Initial  income value and  limit
let overAllIncome = 0;
const incomeLimit = 800000;

// check input validity
const inputChecker = (input, errorIcon, errorText) => {
  if (input.value.length == 0) {
    errorIcon.style.display = "flex";
    errorText.innerText = "This input field is mandatory";
  } else if (isNaN(input.value) && input !== ageGroup) {
    errorIcon.style.display = "flex";
    errorText.innerText = "Please enter numbers only";
  } else if (Number(input.value) < 0) {
    errorIcon.style.display = "flex";
    errorText.innerText = "Please enter non-negative numbers only";
  } else {
    errorIcon.style.display = "none";
  }
};

// check form submission validity
const submitChecker = () => {
  let checkedInputs = Array.from(inputs).filter((inp) =>
    inp === ageGroup
      ? inp.value.length > 0
      : inp.value.length > 0 && !isNaN(inp.value) && inp.value >= 0
  );
  return checkedInputs.length === inputs.length;
};

// calculate taxed income
const taxedIncomeCalculator = (incomeAfterDeductions) => {
  let taxableIncome = incomeAfterDeductions - incomeLimit;
  let taxAmount =
    ageGroup.value === "lessthan40"
      ? 0.3 * taxableIncome
      : ageGroup.value === "between40and60"
      ? 0.4 * taxableIncome
      : 0.1 * taxableIncome;
  return incomeAfterDeductions - taxAmount;
};

// Event listeners

closeButton.addEventListener("click", () => {
  resultDiv.style.display = "none";
});

inputs.forEach((input, index) => {
  input.addEventListener("change", () => {
    inputChecker(input, errorIcons[index], errorTexts[index]);
  });
  input.addEventListener("focus", () => {
    inputChecker(input, errorIcons[index], errorTexts[index]);
  });
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  if (submitChecker()) {
    taxCalculator();
    resultDiv.style.display = "flex";
    inputs.forEach((input) => (input.value = ""));
  } else {
    inputs.forEach((input, index) => {
      inputChecker(input, errorIcons[index], errorTexts[index]);
    });
  }
});

// calculate overall income after tax deductions
const taxCalculator = () => {
  let incomeAfterDeductions =
    Number(inputs[0].value) + Number(inputs[1].value) - Number(inputs[3].value);

  overAllIncome =
    incomeAfterDeductions <= incomeLimit
      ? Number(inputs[0].value) + Number(inputs[1].value)
      : taxedIncomeCalculator(incomeAfterDeductions);
  overallIncome.innerText = "₹ " + overAllIncome;
  taxText.innerText =
    incomeAfterDeductions <= incomeLimit
      ? "No Tax Applicable"
      : "After Tax Deductions";
};
