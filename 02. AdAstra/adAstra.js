function solve(input) {
    let pattern = /([#|])(?<itemName>[a-zA-Z ]+)\1(?<date>\d{2}\/\d{2}\/\d{2})\1(?<calories>\d{1,5})\1/g;
    let match = pattern.exec(input);
    
    let daysLast = 0;
    let totalCalories = 0;
    let output = [];

    while (match !== null) {
        let itemName = match.groups.itemName;
        let date = match.groups.date;
        let calories = +match.groups.calories;
        totalCalories += calories;
        output.push(`Item: ${itemName}, Best before: ${date}, Nutrition: ${calories}`);
        match = pattern.exec(input);
    }
    daysLast = Math.floor(totalCalories / 2000);
    console.log(`You have food to last you for: ${daysLast} days!`);
    console.log(output.join('\n'));
}
