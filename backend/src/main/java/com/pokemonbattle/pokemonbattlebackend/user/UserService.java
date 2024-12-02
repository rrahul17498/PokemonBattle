package com.pokemonbattle.pokemonbattlebackend.user;

import com.pokemonbattle.pokemonbattlebackend.auth.GuestRequestDTO;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.PokemonRepository;
import com.pokemonbattle.pokemonbattlebackend.user.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PokemonRepository pokemonRepository;

    public UserService(
            UserRepository userRepository,
            PokemonRepository pokemonRepository
    ) {
        this.userRepository = userRepository;
        this.pokemonRepository = pokemonRepository;
    }

    List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    List<Pokemon> getAllUserPokemons(Long userId) {
        Optional<User> existingUser = this.userRepository.findById(userId);

        if (existingUser.isEmpty()) {
            throw new UserNotFoundException(userId);
        }

        return this.pokemonRepository.findAllById(existingUser.get().getOwnedPokemons());
    }

    public User getUser(Long userId) {
        Optional<User> existingUser = this.userRepository.findById(userId);

        if (existingUser.isEmpty()) {
            throw  new UserNotFoundException(userId);
        }

        return existingUser.get();
    }

    public UserWithPokemonsDTO getUserWithPokemons(Long userId) {
        Optional<User> existingUser = this.userRepository.findById(userId);

        if (existingUser.isEmpty()) {
            throw  new UserNotFoundException(userId);
        }

        User user = existingUser.get();

        return new UserWithPokemonsDTO(
                user.getId(),
                user.getName(),
                this.pokemonRepository.findAllById(user.getOwnedPokemons())
        );
    }


    public GuestUserDTO createGuestUser(GuestRequestDTO guestUserRequest) {
        User newUser = new User(guestUserRequest);

        User savedUser = this.userRepository.save(newUser);
        return GuestUserDTO.fromUser(savedUser);
    }

    GuestUserDTO getGuestUser(Long id) {
        Optional<User> existingGuestUser = this.userRepository.findById(id);

        if (existingGuestUser.isEmpty()) {
            throw  new UserNotFoundException(id);
        }

        return GuestUserDTO.fromUser(existingGuestUser.get());
    }

}
