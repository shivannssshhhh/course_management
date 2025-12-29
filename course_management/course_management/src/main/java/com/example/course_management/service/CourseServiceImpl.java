package com.example.course_management.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.example.course_management.model.Course;
import com.example.course_management.repository.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public Course updateCourse(Long id, Course course) {
        Course existing = courseRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setCourseName(course.getCourseName());
            existing.setCourseDuration(course.getCourseDuration());
            existing.setCourseFee(course.getCourseFee());
            return courseRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
