function calculateTax(amount: number): number {
    return amount * 0.18;
}



console.time("local");

for (let i = 0; i < 1000; i++) {
    calculateTax(i);
}
console.timeEnd("local");
