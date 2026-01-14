package com.openclassrooms.etudiant.service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

@Service
public class JwtService {
    @Autowired
    JwtDecoder jwtDecoder;

    SecretKey jwtKey = new SecretKeySpec("qhb9ikUFGKPyUUMKBrrV7ByQjBWFy8xLPkKr36XSiTH".getBytes(), "HmacSHA256");

    public String generateToken(UserDetails userDetails) {
        System.out.println(jwtKey);
        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .signWith(jwtKey)
            .compact();
    }

}
