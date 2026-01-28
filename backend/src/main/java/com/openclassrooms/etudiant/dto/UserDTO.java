package com.openclassrooms.etudiant.dto;

import lombok.Data;

@Data
public class UserDTO {
    String firstName;
    String lastName;
    String login;

    public UserDTO(String firstName, String lastName, String login) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.login = login;
    }
}
