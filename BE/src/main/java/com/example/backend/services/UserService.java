package com.example.backend.services;

import com.example.backend.dtos.UserCreationDTO;
import com.example.backend.dtos.UserPropValuePairDTO;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService
{
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }


    public User addNewUser(UserCreationDTO user)
    {
        User newUser = new User(user.email(), passwordEncoder.encode(user.password()), user.first_name(), user.last_name(), user.date_of_birth());
        try
        {
            return userRepository.save(newUser);
        } catch (Exception e)
        {
            return null;
        }

    }

    public User getUserById(int id)
    {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    public boolean updateUser(int id, UserPropValuePairDTO[] userPropValuePairDTOS)
    {
        User user = userRepository.findById(id).orElse(null);
        if (user == null)
        {
            return false;
        }

        for (UserPropValuePairDTO userPropValuePairDTO : userPropValuePairDTOS)
        {
            switch (userPropValuePairDTO.property())
            {
                case "email":
                    user.setEmail(userPropValuePairDTO.value());
                    break;
                case "password":
                    user.setPassword(userPropValuePairDTO.value());
                    break;
                case "first_name":
                    user.setFirst_name(userPropValuePairDTO.value());
                    break;
                case "last_name":
                    user.setLast_name(userPropValuePairDTO.value());
                    break;
                case "date_of_birth":
                    user.setDate_of_birth(LocalDate.parse(userPropValuePairDTO.value()));
                    break;
                case "is_publisher":
                    user.setIs_publisher(Boolean.parseBoolean(userPropValuePairDTO.value()));
                    break;
                default:
                    return false;
            }
        }

        userRepository.save(user);
        return true;
    }

    public void deleteUser(int id)
    {
        userRepository.deleteById(id);
    }
}
