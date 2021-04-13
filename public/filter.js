// ==========================================================
// Display items as per user's input 
// ==========================================================
// console.log('filter script')
var category = document.getElementsByClassName('categoryFilter').value
console.log(category)

var inputArray = [];

inputArray.push(document.getElementsByClassName('categoryFilter').value);
console.log(inputArray);
// $('#post-ticket').click(function () {
//     var inputArray = [];

//     // read input of users and store
//     var concert = $('#concert:checked').val();
//     var exhibition = $('#exhibition:checked').val();
//     var theatre = $('#theatre:checked').val();
//     var sports = $('#sports:checked').val();

//     //push user's choice into an array
//     if (concert === 'checked') {
//         inputArray.push('Concert');
//         console.log(inputArray);
//     }

//     if (exhibition === 'checked') {
//         inputArray.push('Exhibition');
//         console.log(inputArray);
//     }

//     if (theatre === 'checked') {
//         inputArray.push('Theatre');
//         console.log(inputArray);
//     }

//     if (sports === 'checked') {
//         inputArray.push('Sports');
//         console.log(inputArray);
//     }

//     //call the function to filter user's choice
//     // filteredCategory(inputArray);

// }); 

// ==========================================================
// Filter by category
// ==========================================================

// function filteredCategory(category) {
//     console.log(category);
//     var i, j;
//     $('#result').text(' ');
//     for (i = 0; i < cats.length; i++) {
//         for (j = 0; j < catBreed.length; j++) {
//             if (catBreed[j] === cats[i].breed) {
//                 displayCards(i);
//                 cardModal();
//             } //if
//         } //for j
//     } //for i
// } //filteredCats