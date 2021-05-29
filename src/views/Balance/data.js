const makeTransaction = (date, transactionDescription, credit, balance) => {
  return { date, transactionDescription, credit, balance };
};

const transactions = [
  makeTransaction("May 18, 2021", "PHARMACY #0257", "$26.96", "$937.00"),
  makeTransaction(
    "May 16, 2021",
    "UBR*PENDING.UBER.COM #0257",
    "$11.56",
    "$908.00"
  ),
  makeTransaction("May 16, 2021", "GROCERY STORE #179", "$89.43", "$818.57"),
  makeTransaction("May 12, 2021", "ABC CANADA", "$567.00", "$251.57"),
  makeTransaction("May 08, 2021", "GROCERY STORE #179", "$13.00", "$238.57"),
];

export default transactions;
