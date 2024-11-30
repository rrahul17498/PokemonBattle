package com.pokemonbattle.pokemonbattlebackend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestAPIErrorResponse {

    private Integer status;
    private String message;
}
