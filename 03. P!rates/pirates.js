function solve(input) {
    let targets = {};
    let command = input.shift();
    while (command !== 'Sail') {
        let tokens = command.split('||');
        let town = tokens[0];
        let population = +tokens[1];
        let gold = +tokens[2];

        if (!targets.hasOwnProperty(town)) {
            targets[town] = {
                population,
                gold
            }
        } else {
            targets[town].population += population;
            targets[town].gold += gold;
        }
        command = input.shift();
    }
    while (input[0] !== 'End') {
        let tokens = input.shift().split('=>');
        let action = tokens[0];
        let town = tokens[1];

        if (action === 'Plunder') {
            let peopleKilled = tokens[2];
            let gold = +tokens[3];
            console.log(`${town} plundered! ${gold} gold stolen, ${peopleKilled} citizens killed.`);
            targets[town].gold -= gold;
            targets[town].population -= peopleKilled;
            if (targets[town].gold <= 0 || targets[town].population <= 0) {
                console.log(`${town} has been wiped off the map!`);
                delete targets[town];
            }
        } if (action === 'Prosper') {
            let gold = +tokens[2];
            if (gold < 0) {
                console.log('Gold added cannot be a negative number!');
            } else {
                targets[town].gold += gold;
                console.log(`${gold} gold added to the city treasury. ${town} now has ${targets[town].gold} gold.`);
            }
        }
    }
    let townsLeft = Object.keys(targets).length;

    if (townsLeft > 0) {
        console.log(`Ahoy, Captain! There are ${townsLeft} wealthy settlements to go to:`);
        for ([town, object] of Object.entries(targets)) {
            console.log(`${town} -> Population: ${object.population} citizens, Gold: ${object.gold} kg`)
        }
    } else {
        console.log("Ahoy, Captain! All targets have been plundered and destroyed!");
    }
}

solve(['Tortuga||345000||1250',
    'Santo Domingo||240000||630',
    'Havana||410000||1100',
    'Sail',
    'Plunder=>Tortuga=>75000=>380',
    'Prosper=>Santo Domingo=>180',
    'End'])