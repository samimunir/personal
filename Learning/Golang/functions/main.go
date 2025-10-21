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

	main_v2()

	get_coords()
	get_coords_v2()
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

/*
	A function can return a value that the caller doesn't care about. We can explicitly ignore variables by using an underscore: _
*/
func get_points() (x int, y int) {
	return 3, 4
}

func main_v2() {
	x, _ := get_points()
	fmt.Println("\nX.points:", x)
}

/*
	A return statement without arguments returns the named return values. This is known as a "naked" return.
	Naked return statements should be used only in short functions. They can harm readability in longer functions.
*/
func get_coords() (x, y int) {
	// x and y are initialized with zero values.

	return // automatically returns x and y.
}
/*
	The functions above and below are equivalent.
*/
func get_coords_v2() (int, int) {
	var x int
	var y int

	return x, y
}