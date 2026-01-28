package com.openclassrooms.etudiant.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.mysql.MySQLContainer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.etudiant.dto.StudentDTO;
import com.openclassrooms.etudiant.entities.Student;
import com.openclassrooms.etudiant.service.StudentService;

@Disabled
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Testcontainers
public class StudentControllerTest {
    private static final String FIRSTNAME = "John";
    private static final String LASTNAME = "Doe";
    private static final String TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.vHCxsXTaMAmuWbJHwLPT6c6jPoIOHcCqUcI9cZI-WDE";

    @Container
    static final MySQLContainer mySQLContainer = new MySQLContainer("mysql:latest");

    @MockitoBean
    private StudentService studentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @DynamicPropertySource
    static void configureTestProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> mySQLContainer.getJdbcUrl());
        registry.add("spring.datasource.username", () -> mySQLContainer.getUsername());
        registry.add("spring.datasource.password", () -> mySQLContainer.getPassword());
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create");
    }

    @Test
    public void testGetStudent() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/student/1")
            .header("Authorization", "Bearer " + TOKEN))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetStudentUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/student/1"))
        .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    public void testGetStudents() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/students")
            .header("Authorization", "Bearer " + TOKEN))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetStudentsUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/students"))
        .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    public void testAddStudent() throws Exception {
        StudentDTO studentDTO = new StudentDTO(0L, FIRSTNAME, LASTNAME);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/student")
            .header("Authorization", "Bearer " + TOKEN)
            .content(objectMapper.writeValueAsString(studentDTO))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void testAddStudentUnauthorized() throws Exception {
        StudentDTO studentDTO = new StudentDTO(0L, FIRSTNAME, LASTNAME);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/student")
            .content(objectMapper.writeValueAsString(studentDTO))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    public void testAddStudentWrongData() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/student")
            .header("Authorization", "Bearer " + TOKEN)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    public void testAddStudentOtherError() throws Exception {
        StudentDTO studentDTO = new StudentDTO(0L, FIRSTNAME, LASTNAME);

        when(studentService.addStudent(any(Student.class))).thenThrow(new Exception());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/student")
            .header("Authorization", "Bearer " + TOKEN)
            .content(objectMapper.writeValueAsString(studentDTO))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isInternalServerError());
    }

    @Test
    public void testUpdateStudent() throws Exception {
        StudentDTO studentDTO = new StudentDTO(0L, FIRSTNAME, LASTNAME);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/student/1")
            .header("Authorization", "Bearer " + TOKEN)
            .content(objectMapper.writeValueAsString(studentDTO))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testUpdateStudentUnauthorized() throws Exception {
        StudentDTO studentDTO = new StudentDTO(0L, FIRSTNAME, LASTNAME);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/student/1")
            .content(objectMapper.writeValueAsString(studentDTO))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    public void testUpdateStudentWrongData() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/student/1")
            .header("Authorization", "Bearer " + TOKEN)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    public void testUpdateStudentOtherError() throws Exception {
        StudentDTO studentDTO = new StudentDTO(0L, FIRSTNAME, LASTNAME);

        when(studentService.updateStudent(anyLong(), any(Student.class))).thenThrow(new Exception());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/student/1")
            .header("Authorization", "Bearer " + TOKEN)
            .content(objectMapper.writeValueAsString(studentDTO))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isInternalServerError());
    }

    @Test
    public void testDeleteStudent() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/student/1")
            .header("Authorization", "Bearer " + TOKEN))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testDeleteStudentUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/student/1"))
        .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    public void testDeleteStudentOtherError() throws Exception {
        when(studentService.deleteStudent(anyLong())).thenThrow(new Exception());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/student/1")
            .header("Authorization", "Bearer " + TOKEN))
        .andExpect(MockMvcResultMatchers.status().isInternalServerError());
    }
}
