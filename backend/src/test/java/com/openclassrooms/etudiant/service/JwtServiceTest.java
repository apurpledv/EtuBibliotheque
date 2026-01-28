package com.openclassrooms.etudiant.service;

import static org.junit.Assert.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@Disabled
@ExtendWith(SpringExtension.class)
public class JwtServiceTest {
    @InjectMocks
    JwtService jwtService;

    @Test
    public void testGenerateToken() {
        // Test: Is it deterministic? (same input = same output)
        UserDetails userDetails1 = org.springframework.security.core.userdetails.User.builder()
                .username("login")
                .password("password")
                .roles("USER")
                .build();


        UserDetails userDetails2 = org.springframework.security.core.userdetails.User.builder()
                .username("login25424353")
                .password("password34354373835")
                .roles("USER")
                .build();
        
        String token1 = jwtService.generateToken(userDetails1);
        String token1B = jwtService.generateToken(userDetails1);
        String token2 = jwtService.generateToken(userDetails2);

        assertFalse(token1.equals(token2));
        assertTrue(token1.equals(token1B));
    }
}
