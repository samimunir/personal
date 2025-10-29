package main

import "fmt"

func main() {
	/*
		Golang reference docs:
		https://go.dev/ref/spec#Struct_types
	*/

	fmt.Println("Structs in Golang")

	/*
		A struct is a sequence of named elements, called fields, each of which has a name and a type.
		- field names may be specified explictly or implicitly.
		- within a struct, non-blank field names must be unique.
	*/

	type engine struct {
		Cylinders uint8
		Displacement float32
		Horsepower uint16
	}

	/*
		Structs can be nested to create complex data structures & entities.
	*/

	type car struct {
		Make string
		Model string
		Year int
		Engine engine
	}

	/*
		Default value assignment to struct members.
		- use the . operatore to access struct fields.
	*/
	myCarEngine := engine{}
	myCarEngine.Cylinders = 4
	myCarEngine.Displacement = 1.5
	myCarEngine.Horsepower = 192
	
	myCar := car{}
	myCar.Make = "Honda"
	myCar.Model = "Accord EX"
	myCar.Year = 2023
	myCar.Engine = myCarEngine
	
	fmt.Println("\nmyCar<struct>:", myCar)

	/*
		Anonymous structs are like normal structs but they are defined without a name and therefore cannot be referenced elsewhere in the code.
	*/
	random_flight := struct {
		Airline string
		FlightNumber string
		DepartureTime string
	} {
		Airline: "American",
		FlightNumber: "AAL1297",
		DepartureTime: "01:45 UTC",
	}
	fmt.Println("\nrandom_flight<anonymous struct>:", random_flight)
}