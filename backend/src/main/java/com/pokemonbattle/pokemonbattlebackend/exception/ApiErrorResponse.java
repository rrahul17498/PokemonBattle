package com.pokemonbattle.pokemonbattlebackend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiErrorResponse {

    private Integer status;
    private String message;
}
