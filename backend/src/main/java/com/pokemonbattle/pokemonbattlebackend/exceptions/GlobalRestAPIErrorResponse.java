package com.pokemonbattle.pokemonbattlebackend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class GlobalRestAPIErrorResponse {
    private String message;
}
