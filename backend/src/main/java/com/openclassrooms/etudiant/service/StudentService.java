package com.openclassrooms.etudiant.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.etudiant.dto.StudentDTO;
import com.openclassrooms.etudiant.entities.Student;
import com.openclassrooms.etudiant.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public StudentDTO getStudent(Long id) {
        Student student = studentRepository.findById(id).get();
        return new StudentDTO(id, student.getFirstName(), student.getLastName());
    }

    private List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public List<StudentDTO> getAllStudentsDTO() {
        List<StudentDTO> studentList = new ArrayList<StudentDTO>();
        for(Student student : getAllStudents()) {
            studentList.add(new StudentDTO(student.getId(), student.getFirstName(), student.getLastName()));
        }
        return studentList;
    }

    public boolean addStudent(Student student) throws Exception {
        student.setId(null);
        Student newStudent = studentRepository.save(student);

        if (newStudent != null) {
            return true;
        } else {
            throw new Exception("Could not add Student.");
        }
    }

    public boolean updateStudent(Long id, Student student) throws Exception {
        Optional<Student>studentFound = studentRepository.findById(id);
        if (!studentFound.isPresent())
            throw new Exception("Student not found");

        Student updatedStudent = studentFound.get();

        if (student.getFirstName() != null && !student.getFirstName().isEmpty())
            updatedStudent.setFirstName(student.getFirstName());

        if (student.getLastName() != null && !student.getLastName().isEmpty())
            updatedStudent.setLastName(student.getLastName());

        studentRepository.save(updatedStudent);
        return true;
    }

    public boolean deleteStudent(Long id) throws Exception {
        Optional<Student> studentFound = studentRepository.findById(id);
        if (!studentFound.isPresent())
            throw new Exception("Student not found");

        studentRepository.delete(studentFound.get());
        return true;
    }
}
