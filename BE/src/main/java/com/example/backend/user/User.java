package com.example.backend.user;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="user_info")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private int id;
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private LocalDate date_of_birth;
    private Boolean is_publisher;

    public User(String email, String password, String first_name, String last_name, LocalDate date_of_birth, Boolean is_publisher) {
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.is_publisher = is_publisher;
    }

    public User() {
        this.id = 0;
        this.email = "";
        this.password = "";
        this.first_name = "";
        this.last_name = "";
        this.date_of_birth = LocalDate.now();
        this.is_publisher = false;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public LocalDate getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(LocalDate date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public Boolean getIs_publisher() {
        return is_publisher;
    }

    public void setIs_publisher(Boolean is_publisher) {
        this.is_publisher = is_publisher;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", date_of_birth=" + date_of_birth +
                ", is_publisher=" + is_publisher +
                '}';
    }
}
