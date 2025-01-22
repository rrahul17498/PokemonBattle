package com.pokemonbattle.pokemonbattlebackend.restApi;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GlobalRestAPIErrorResponse {
    private String message;
}
