import React from 'react'

export default function TableHeader(props) {
  
    return (
        <tr>{<th>{"\\"}</th> }{
        headerGenerator(props.columns).map(col =><th key={col}>{col}</th>)}</tr>
    )
}

const headerGenerator = (columns) => {
    let myHeaders = []
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
        .toUpperCase()
        .split('');
    let alphabetIndex = -1;
    let loop = 1;
    for (let index = 0; index < columns; index++) {
        alphabetIndex++;
        let col = "";
        for (let j = 0; j < loop; j++) {
            col += (alphabet[alphabetIndex]);
        }
        if (alphabetIndex === 25) {
            loop++;
            alphabetIndex = -1;
        }

        myHeaders.push(col);
    }
    return myHeaders;
}
