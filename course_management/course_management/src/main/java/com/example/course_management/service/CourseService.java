package com.example.course_management.service;

import java.util.List;
import com.example.course_management.model.Course;

public interface CourseService {

    Course saveCourse(Course course);
    List<Course> getAllCourses();
    Course getCourseById(Long id);
    Course updateCourse(Long id, Course course);
    void deleteCourse(Long id);
}
