package com.openclassrooms.etudiant.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TokenDTO {
    @NotBlank
    String token;

    public TokenDTO(String token) {
        this.token = token;
    }
}
