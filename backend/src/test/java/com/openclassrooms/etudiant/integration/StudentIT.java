package com.openclassrooms.etudiant.integration;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.mysql.MySQLContainer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.etudiant.entities.Student;
import com.openclassrooms.etudiant.repository.StudentRepository;
import com.openclassrooms.etudiant.service.StudentService;

import jakarta.inject.Inject;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Testcontainers
public class StudentIT {
    private static final String FIRSTNAME = "John";
    private static final String LASTNAME = "Doe";
    private static final String TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.vHCxsXTaMAmuWbJHwLPT6c6jPoIOHcCqUcI9cZI-WDE";

    @Container
    static final MySQLContainer mySQLContainer = new MySQLContainer("mysql:latest");

    @Inject
    private StudentService studentService;

    @Inject
    private StudentRepository studentRepository;

    @Inject
    private ObjectMapper objectMapper;

    @Inject
    private MockMvc mockMvc;

    @DynamicPropertySource
    static void configureTestProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> mySQLContainer.getJdbcUrl());
        registry.add("spring.datasource.username", () -> mySQLContainer.getUsername());
        registry.add("spring.datasource.password", () -> mySQLContainer.getPassword());
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create");
    }

    @AfterEach
    public void afterEach() {
        studentRepository.deleteAll();
    }

    @Test
    public void testGetStudent() throws Exception {
        Student student = new Student();
        student.setFirstName(FIRSTNAME);
        student.setLastName(LASTNAME);
        studentService.addStudent(student);

        // Send request
        String response = mockMvc.perform(MockMvcRequestBuilders.get("/api/student/1")
            .header("Authorization", "Bearer " + TOKEN))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andReturn().getResponse().getContentAsString();
        
        assertTrue(response.contains("John"));
        assertTrue(response.contains("Doe"));
    }

    @Test
    public void testGetStudents() throws Exception {
        Student student = new Student();
        student.setFirstName(FIRSTNAME);
        student.setLastName(LASTNAME);
        studentService.addStudent(student);

        // Send request
        String response = mockMvc.perform(MockMvcRequestBuilders.get("/api/students")
            .header("Authorization", "Bearer " + TOKEN))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andReturn().getResponse().getContentAsString();
        
        assertTrue(response.contains("John"));
        assertTrue(response.contains("Doe"));
    }

    @Test
    public void testAddStudent() throws Exception {
        Student student = new Student();
        student.setFirstName(FIRSTNAME);
        student.setLastName(LASTNAME);

        // Send request
        mockMvc.perform(MockMvcRequestBuilders.post("/api/student")
            .header("Authorization", "Bearer " + TOKEN)
            .content(objectMapper.writeValueAsString(student))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isCreated());

        // Verify data
        List<Student> studentList = studentRepository.findAll();
        Student newStudent = studentList.get(studentList.size() - 1);

        assertEquals(newStudent.getFirstName(), "John");
        assertEquals(newStudent.getLastName(), "Doe");
    }

    @Test
    public void testUpdateStudent() throws Exception {
        Student student = new Student();
        student.setFirstName(FIRSTNAME);
        student.setLastName(LASTNAME);
        studentService.addStudent(student);

        List<Student> studentList = studentRepository.findAll();
        Long studentId = studentList.get(studentList.size() - 1).getId();

        assertEquals(LASTNAME, studentService.getStudent(studentId).getLastName());
        student.setLastName("NewLastName");

        // Send request
        mockMvc.perform(MockMvcRequestBuilders.put("/api/student/" + studentId)
            .header("Authorization", "Bearer " + TOKEN)
            .content(objectMapper.writeValueAsString(student))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk());

        // Verify data
        assertNotEquals(LASTNAME, studentService.getStudent(studentId).getLastName());
    }

    @Test
    public void testDeleteStudent() throws Exception {
        Student student = new Student();
        student.setFirstName(FIRSTNAME);
        student.setLastName(LASTNAME);
        studentService.addStudent(student);

        List<Student> studentList = studentRepository.findAll();
        Long studentId = studentList.get(studentList.size() - 1).getId();

        // Send request
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/student/" + studentId)
            .header("Authorization", "Bearer " + TOKEN))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
