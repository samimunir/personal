package main

import "fmt"

func main() {
	/*
		Golang reference docs:
		https://go.dev/ref/spec#Function_declarations
	*/

	fmt.Println("Functions in Golang")

	say_hello("Sami M.")

	fmt.Println("\nSum of 3 + 5 = ", add(3, 5))

	fmt.Println("\nSubtraction of 10 - 4 = ", subtract(10, 4))
}

func say_hello(name string) {
	fmt.Println("\nWelcome to Golang,", name)
}

/*
	To make Go code easier to read, the variable type comes after the variable name.
	- this function accepts to integers a and b.
	- it returns an integer which is the sum of a and b.
*/
func add(a int, b int) int {
	return a + b;
}

/*
	When multiple arguments are of the same type, the type only needs to be declared after the last one, assuming they are in order.
*/
func subtract(a, b int) int {
	return a - b;
}

/*
	Go allows for callback functions, which means you can pass a functiona as an argument to another function.

	Passing variables by value:
	- variables in Go are passed by value, which means that when a variable is passed into a function, that function receives a copy of the variable.
	- the function is unable to mutate the caller's data.
*/