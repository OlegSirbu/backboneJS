$(document).ready(function() { 
	// pract 1 


	// Функция-конструктор для создания объектов Human.

	var Human = new Object();


	// добавление свойства x 
        Human.age = new Array(12, 23, 45, 25);
        // добавление свойства y

        
        Human.Pol = new Array("men", "wom");

        console.log(Human.Pol.sort());
        console.log(Human.age.sort());

});
