function solve(input) {
    let message = input.shift();
    while (input[0] !== 'Decode') {
        let tokens = input.shift().split('|');
        let command = tokens[0];
        let p1 = tokens[1];
        let p2 = tokens[2];

        if (command === 'Move') {
            for (let i = 0; i < p1; i++) {
                let firstLetter = message[0];
                message = message.slice(1) + firstLetter;
            }
        } else if (command === 'Insert') {
            message = message.split('');
            message.splice(p1, 0, p2);
            message = message.join('');
        } else if (command === 'ChangeAll') {
            message = message.split(p1).join(p2);
        }
    }
    console.log(`The decrypted message is: ${message}`);
}
