package main

import "fmt"

func main() {
	fmt.Println("Variables in Golang")

	/*
		There is also a set of predeclared integer types with implementation-specific sizes:
		
		uint -> either 32 or 64 bits
		int -> same size as uint
		uintptr -> an unsigned integer large 	enough to store the uninterpreted bits of a pointer value
	*/

	var unsigned_int8 uint8 = 24;
	fmt.Println("unsigned_int8 is of type: ", fmt.Sprintf("%T", unsigned_int8))
	fmt.Println("unsigned_int8 is of value: ", unsigned_int8)
	fmt.Println()
	
	var unsigned_int16 uint16 = 256;
	fmt.Println("unsigned_int16 is of type: ", fmt.Sprintf("%T", unsigned_int16))
	fmt.Println("unsigned_int16 is of value: ", unsigned_int16)
	fmt.Println()
	
	var unsigned_int32 uint32 = 65536;
	fmt.Println("unsigned_int32 is of type: ", fmt.Sprintf("%T", unsigned_int32))
	fmt.Println("unsigned_int32 is of value: ", unsigned_int32)
	fmt.Println()
	
	var unsigned_int64 uint64 = 4294967296;
	fmt.Println("unsigned_int64 is of type: ", fmt.Sprintf("%T", unsigned_int64))
	fmt.Println("unsigned_int64 is of value: ", unsigned_int64)
	fmt.Println()

	var int_8 int8 = -24;
	fmt.Println("int_8 is of type: ", fmt.Sprintf("%T", int_8))
	fmt.Println("int_8 is of value: ", int_8)
	fmt.Println()
	
	var int_16 int16 = -256;
	fmt.Println("int_16 is of type: ", fmt.Sprintf("%T", int_16))
	fmt.Println("int_16 is of value: ", int_16)
	fmt.Println()
	
	var int_32 int32 = -65536;
	fmt.Println("int_32 is of type: ", fmt.Sprintf("%T", int_32))
	fmt.Println("int_32 is of value: ", int_32)
	fmt.Println()

	var int_64 int64 = -4294967296;
	fmt.Println("int_64 is of type: ", fmt.Sprintf("%T", int_64))
	fmt.Println("int_64 is of value: ", int_64)
	fmt.Println()

	var float_32 float32 = 3.14;
	fmt.Println("float_32 is of type: ", fmt.Sprintf("%T", float_32))
	fmt.Println("float_32 is of value: ", float_32)
	fmt.Println()

	var float_64 float64 = 3.14159265359;
	fmt.Println("float_64 is of type: ", fmt.Sprintf("%T", float_64))
	fmt.Println("float_64 is of value: ", float_64)
	fmt.Println()

	var complex_64 complex64 = 1 + 2i;
	fmt.Println("complex_64 is of type: ", fmt.Sprintf("%T", complex_64))
	fmt.Println("complex_64 is of value: ", complex_64)
	fmt.Println()

	var complex_128 complex128 = 1 + 2i;
	fmt.Println("complex_128 is of type: ", fmt.Sprintf("%T", complex_128))
	fmt.Println("complex_128 is of value: ", complex_128)
	fmt.Println()

	/*
		A byte is an alias for uint8
	*/
	var my_byte byte = 255;
	fmt.Println("my_byte is of type: ", fmt.Sprintf("%T", my_byte))
	fmt.Println("my_byte is of value: ", my_byte)
	fmt.Println()

	/*
		A rune is an alias for int32
		It is used to represent a Unicode code point
	*/
	var my_rune rune = 'S';
	fmt.Println("my_rune is of type: ", fmt.Sprintf("%T", my_rune))
	fmt.Println("my_rune is of value: ", my_rune)
	fmt.Println()
}