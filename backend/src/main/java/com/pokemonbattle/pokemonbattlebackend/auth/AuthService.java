package com.pokemonbattle.pokemonbattlebackend.auth;

import org.springframework.stereotype.Service;

@Service
public class AuthService {


    public String generateJWT() {
        return "MYTOKEN123";
    }
}
