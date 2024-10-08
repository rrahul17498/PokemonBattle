package com.pokemonbattle.pokemonbattlebackend.socket;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Message {

    private MessageSourceEnum source;

    private String room;

    @JsonProperty("battle_data")
    private String battleData;

    @JsonProperty("user_id")
    private Integer userId;

}
