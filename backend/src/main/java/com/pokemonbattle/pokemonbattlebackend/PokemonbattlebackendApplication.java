package com.pokemonbattle.pokemonbattlebackend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class PokemonbattlebackendApplication {
	public static void main(String[] args) {


		ConfigurableApplicationContext context = SpringApplication.run(PokemonbattlebackendApplication.class, args);

		System.out.println("Welcome to Pokemon Battle backend");
	}

}
