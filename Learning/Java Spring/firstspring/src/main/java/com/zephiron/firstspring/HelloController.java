package com.zephiron.firstspring;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello/{name}")
    public HelloResponse hello(@PathVariable String name) {
        return new HelloResponse("Hello world, " + name + "!");
    }

    @PostMapping("/hello")
    public HelloResponse helloPost(@RequestBody String name) {
        String greeting = "Hello world, " + name + "!";
        return new HelloResponse(greeting);
    }
}