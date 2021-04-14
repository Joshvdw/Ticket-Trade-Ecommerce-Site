# JS Style guide


## Table of contents

1. [Statement](#1-statement)
2. [Variables](#2-variables)
3. [Comments](#3-comments)
4. [Operators](#4-operators)
5. [Conditional-structure-if](#5-conditional-structure-if)
6. [Arrays / Objects](#6-arrays--objects)
7. [Loops](#7-loops)
8. [Functions](#8-functions)
9. [Indentation / Spacing](#9-indentation--spacing)
10. [Strings](#10-strings)

### 1. Statement
*Use 1 space between operators and keywords*

#####  bad example
varx=y+2;

#####  good example
 var x = y + 2;
 <br/><br/>
### 2. Variables
*Use statement spacing, write simple and descriptive keywords with camelCasing or hyphens.*

#####  bad example
var allmovies=y+2;

#####  good example
 var allMovies = y + 2;
 <br/><br/>
### 3. Comments
*Write comments for code-block headings*

#####  example
// =========================================================================
// *Declaration of x variable*
// ============================================================================
 <br/><br/>

### 4. Operators
*Keep a space before and after any operator.*

#####  bad example
var x=y+2;

#####  good example
 var x = y + 2;
 <br/><br/>
### 5. Condition structure - if
*Use space after the keyword if.*
*Use space after the parenthesis*
*Use open curly braces at the end of first line.*
*use close curly braces in a new line.*
*keep the else keyword on the same line as the close curly braces of the previous set of brackets*
*indent the code as given in the good example*


#####  bad example
 if(age>17)
 {
 alert('hi');
 }
 else{alert('hello');}

#####  good example
if (age > 17) {                <br/>
..alert('hi');                 <br/>
} else {                       <br/>
..alert('hello');              <br/>
}
 <br/><br/>
### 6. Arrays / Objects
*Use spacing described in statement section. You can place objects inside of arrays too. When adding a lot of data, make it more readable by putting each variable on their own line, indented (2 spaces) and separated by commas*

#####  bad example
var movies = [{id : 101,title : 'Reservoir Dogs (1992)' photo : 'reservoir-dogs.png'description : "A group of thieves assemble to pull of the perfect diamond heist. "}];

#####  good example
var movies = [   
  {   
  ..id : 101,  
  ..title : 'Reservoir Dogs (1992)',   
  ..photo : 'reservoir-dogs.png',   
  ..description : "A group of thieves assemble to pull of the perfect diamond heist. "  
  }  
];
<br/><br/>

### 7. Loops
*Use spacing described in statement section, between operators especially. Add semicolons to en statements. Declare the loop variable beforehand*

#####  bad example
for (i=0;i<5i++) {         
x += i}

#####  good example
var i;   
for (i = 0; i < 5; i++) {          <br/>
..x += i;                          <br/>
}
<br/><br/>

### 8. Functions
*Use spaces after keywords and between operators, use camelCasing for naming
and use the return statement inside the curly brackets of the function*

#####  bad example
functiontocelsius(fahrenheit) {    }     <br/>
(5 / 9)*(fahrenheit - 32);               <br/>


#####  good example
function toCelsius(fahrenheit) {                    <br/>
..return (5 / 9) * (fahrenheit - 32);               <br/>
}
<br/><br/>

### 9. Indentation / Spacing
*Use soft tabs for indentation (2 spaces) and a single space after keywords*

#####  bad example
functiontest(){
console.log('test');
}

#####  good example
function test(){               <br/>
..console.log('test');         <br/>
}
<br/><br/>

### 10. Strings
*Use single quotes for strings as the default*

#####  bad example
 var x = "My name is" + name;

#####  good example
var x = 'My name is' + name;
<br/><br/>

*If there are apostrophes used inside of the string, you can use regular quotation marks*

#####  bad example
var x = 'Sally's shopping cart is' + cart;

#####  good example
var x = "Sally's shopping cart is" + cart;
