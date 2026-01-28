package com.openclassrooms.etudiant.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.openclassrooms.etudiant.entities.Student;
import com.openclassrooms.etudiant.repository.StudentRepository;

@Disabled
@ExtendWith(SpringExtension.class)
public class StudentServiceTest {
    private static final String FIRST_NAME = "John";
    private static final String LAST_NAME = "Doe";

    @InjectMocks
    private StudentService studentService;

    @Mock
    private StudentRepository studentRepository;


    @Test
    public void testGetStudent() {
        when(studentRepository.findById(anyLong())).thenReturn(Optional.of(new Student()));
        assertNotNull(studentService.getStudent(1L));
    }

    @Test
    public void testGetStudents() {
        List<Student> studentList = new ArrayList<Student>();
        Student student = new Student();
        studentList.add(student);

        when(studentRepository.findAll()).thenReturn(studentList);

        assertFalse(studentService.getAllStudentsDTO().isEmpty());
    }

    @Test
    public void testAddStudent() throws Exception {
        Student student = new Student();

        when(studentRepository.save(any(Student.class))).thenReturn(student);
        
        assertTrue(studentService.addStudent(student));
    }

    @Test
    public void testAddStudentNotValid() throws Exception {
        Student student = new Student();

        when(studentRepository.save(any(Student.class))).thenReturn(null);
        
        assertThrows(Exception.class, () -> { 
            studentService.addStudent(student); 
        });
    }

    @Test
    public void testUpdateStudent() throws Exception {
        Student student = new Student();

        when(studentRepository.findById(anyLong())).thenReturn(Optional.of(student));

        student.setFirstName(FIRST_NAME);
        student.setLastName(LAST_NAME);
        
        studentService.updateStudent(1L, student);
        verify(studentRepository).save(student);

        student.setFirstName(null);
        studentService.updateStudent(1L, student);

        student.setFirstName("");
        studentService.updateStudent(1L, student);

        student.setFirstName(FIRST_NAME);
        student.setLastName(null);
        studentService.updateStudent(1L, student);

        student.setLastName("");
        studentService.updateStudent(1L, student);

    }

    @Test
    public void testUpdateStudentNonValid() throws Exception {
        Student student = new Student();

        when(studentRepository.findById(anyLong())).thenReturn(Optional.ofNullable(null));
        
        assertThrows(Exception.class, () -> { 
            studentService.updateStudent(1L, student);
        });
    }

    @Test
    public void testDeleteStudent() throws Exception {
        Student student = new Student();

        when(studentRepository.findById(anyLong())).thenReturn(Optional.of(student));
        
        studentService.deleteStudent(1L);
        verify(studentRepository).delete(student);
    }

    @Test
    public void testDeleteStudentNonValid() {
        when(studentRepository.findById(anyLong())).thenReturn(Optional.ofNullable(null));
        
        assertThrows(Exception.class, () -> { 
            studentService.deleteStudent(1L);
        });
    }
}
