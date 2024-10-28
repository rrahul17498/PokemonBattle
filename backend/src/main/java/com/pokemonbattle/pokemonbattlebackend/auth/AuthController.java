package com.pokemonbattle.pokemonbattlebackend.auth;

import com.pokemonbattle.pokemonbattlebackend.user.GuestUserDTO;
import com.pokemonbattle.pokemonbattlebackend.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;


    @PostMapping("/register/guest")
    ResponseEntity<?> createGuestSession(@RequestBody GuestRequestDTO guestRequest, HttpServletResponse response) {

//        String token = this.authService.generateJWT();

//        Cookie tokenCookie = new Cookie("token", token);
//        tokenCookie.setHttpOnly(true);
//        tokenCookie.setSecure(true);
//        tokenCookie.setPath("/");
//        tokenCookie.setMaxAge(30 * 60);
//        tokenCookie.setAttribute("SameSite", "Strict");
//
//        response.addCookie(tokenCookie);

        GuestUserDTO createdGuestUser = this.userService.createGuestUser(guestRequest);

//        Temporarily using user id as token
        String token  = createdGuestUser.id().toString();

        GuestResponseDTO createdGuestResponse = GuestResponseDTO.from(
                createdGuestUser,
                token
        );

        return ResponseEntity.ok().body(createdGuestResponse);
    }
}
