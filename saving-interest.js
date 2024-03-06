const data = [
    { 
        name: "Bank A",
        rates: [
            { from: 0, to: 1000, interestPerYear: 10 },
            { from: 1000, to: 10000, interestPerYear: 1 },
        ]
    }
]

const easyData = [
    { name: "BankA", tier: 1, size: -1, interestPerYear: 10 },
    // { name: "BankA", tier: 2, size: 10000, interestPerYear: 1 },
    { name: "BankB", tier: 1, size: 10000, interestPerYear: 1 },
]
// assuming to and from will be connecting
// assume that items in the array will be able to store money. because we add it when the condition is met
// the order of the item in array are sorted by interestPerYear
// it will enable a new tier if we put money equal to the bucket size of the current bucket
// tier is the relationship

// first tier will be in the queue first. then first tier will unlock next tier of its bank.

const givenMoney = 99980;
const queue = [...easyData].sort((a, b) => b.interestPerYear - a.interestPerYear); // interestPerYear most to least

let remainingMoney = givenMoney;
let sumInterestPerYear = 0;
while(queue.length > 0 && remainingMoney > 0) {
    const item = queue.shift();
    const bucketSize = item.size;
    const moneyThatWeCanPutInTheBucket = calHowMuchMoneyThatWeCanPutInTheBucket(remainingMoney, bucketSize);
    const newRemainingMoney = remainingMoney - moneyThatWeCanPutInTheBucket;
    const interestFromThisBucket = moneyThatWeCanPutInTheBucket * item.interestPerYear / 100;
    sumInterestPerYear += interestFromThisBucket;
    console.log('remainingMoney', remainingMoney);
    console.log('bank info', JSON.stringify(item));
    console.log('moneyThatWeCanPutInTheBucket', moneyThatWeCanPutInTheBucket);
    console.log('interestFromThisBucket', interestFromThisBucket);
    console.log('newRemainingMoney', newRemainingMoney);
    remainingMoney = newRemainingMoney;
}

function calHowMuchMoneyThatWeCanPutInTheBucket (remainingMoney, bucketSize) {
    if (bucketSize === -1) {
        return remainingMoney;
    }
    return remainingMoney >= bucketSize ? bucketSize : remainingMoney;
}

console.log('sumInterestPerYear', sumInterestPerYear);

// const b1 = easyData[0].to - easyData[0].from;
// const moneyInBucket1 = givenMoney >= b1 ? b1 : givenMoney;
// const remainingMoneyFromB1 = givenMoney - moneyInBucket1;
// const interestFromB1 = moneyInBucket1 * easyData[0].interestPerYear / 100;

// console.log('b1', b1);
// console.log('moneyInBucket1', moneyInBucket1);
// console.log('remainingMoneyFromB1', remainingMoneyFromB1);
// console.log('interest', easyData[0].interestPerYear);
// console.log('interestFromB1', interestFromB1);

// const b2 = easyData[1].to - easyData[1].from;
// const moneyInBucket2 = remainingMoneyFromB1 >= b2 ? b2 : remainingMoneyFromB1;
// const remainingMoneyFromB2 = remainingMoneyFromB1 - moneyInBucket2;
// const interestFromB2 = moneyInBucket2 * easyData[1].interestPerYear / 100;

// console.log('b2', b2);
// console.log('moneyInBucket2', moneyInBucket2);
// console.log('remainingMoneyFromB2', remainingMoneyFromB2);
// console.log('interest', easyData[1].interestPerYear);
// console.log('interestFromB2', interestFromB2);