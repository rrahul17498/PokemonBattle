package com.pokemonbattle.pokemonbattlebackend.user.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super(String.format("User with id %s not found", id));
        log.error(this.getMessage());
    }
}
