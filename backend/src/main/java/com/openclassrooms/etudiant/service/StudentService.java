package com.openclassrooms.etudiant.service;

import java.util.ArrayList;
import java.util.List;

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

    public boolean addStudent(Student student) {
        Student newStudent = studentRepository.save(student);

        if (newStudent != null) {
            return true;
        } else {
            return false;
        }
    }

    public void updateStudent(Long id, Student student) throws Exception {
        Student studentFound = studentRepository.findById(id).get();
        if (studentFound == null)
            throw new Exception("Student not found");

        if (student.getFirstName() != null && !student.getFirstName().isEmpty())
            studentFound.setFirstName(student.getFirstName());

        if (student.getLastName() != null && !student.getLastName().isEmpty())
            studentFound.setLastName(student.getLastName());

        studentRepository.save(studentFound);
    }

    public void deleteStudent(Long id) throws Exception {
        Student studentFound = studentRepository.findById(id).get();
        if (studentFound == null)
            throw new Exception("Student not found");

        studentRepository.delete(studentFound);
    }
}
