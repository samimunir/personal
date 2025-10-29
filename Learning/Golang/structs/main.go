package main

import "fmt"

/*
	We can bind functions to a struct type by using receiver functions.
	- this allows us to create methods that operate on struct instances.
*/
type rectangle struct {
	Width float64
	Height float64
}

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
	myCarEngine := engine {}
	myCarEngine.Cylinders = 4
	myCarEngine.Displacement = 1.5
	myCarEngine.Horsepower = 192
	
	myCar := car {}
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

	/*
		Go is not an object-oriented language, however embedded structs provide a kind of data-only inheritance.
		- a way to elevate and share fields between struct definitions.
	*/
	type computer struct {
		Brand string
		Model string
		Processor string
		GPU string
	}

	type laptop struct {
		computer // embedded struct -> will have access to all fields of computer struct (directly).
		screenSize float32
	}
	myLaptop := laptop{}
	myLaptop.Brand = "Apple"
	myLaptop.Model = "MacBook Air"
	myLaptop.Processor = "M4"
	myLaptop.GPU = "Integrated"
	myLaptop.screenSize = 13.6
	fmt.Println("\nmyLaptop<embedded struct>:", myLaptop)

	newLaptop := laptop {
		computer: computer {
			Brand: "Lenovo",
			Model: "Yoga 7i Slim",
			Processor: "Snapdragon X Elite",
			GPU: "Integrated",
		},
		screenSize: 14.0,
	}
	fmt.Println("\nnewLaptop<embedded struct with composite literal>:", newLaptop)

	myRectangle := rectangle {
		Width: 5.0,
		Height: 3.0,
	}
	fmt.Println("\nmyRectangle<struct>:", myRectangle)
	fmt.Println("Area of myRectangle:", myRectangle.Area())
}

// Receiver function to calculate area of rectangle
func (r rectangle) Area() float64 {
	return r.Width * r.Height
}