package com.example.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService
{
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public User addNewUser(UserCreateRecord user)
    {
        User newUser = new User(user.email(), user.password(), user.first_name(), user.last_name(), user.date_of_birth(), user.is_publisher());
        try
        {
            User savedUser = userRepository.save(newUser);
            return savedUser;
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

    public boolean updateUser(int id, UserPropValuePairRecord[] userPropValuePairRecords)
    {
        User user = userRepository.findById(id).orElse(null);
        if (user == null)
        {
            return false;
        }

        for (UserPropValuePairRecord userPropValuePairRecord : userPropValuePairRecords)
        {
            switch (userPropValuePairRecord.property())
            {
                case "email":
                    user.setEmail(userPropValuePairRecord.value());
                    break;
                case "password":
                    user.setPassword(userPropValuePairRecord.value());
                    break;
                case "first_name":
                    user.setFirst_name(userPropValuePairRecord.value());
                    break;
                case "last_name":
                    user.setLast_name(userPropValuePairRecord.value());
                    break;
                case "date_of_birth":
                    user.setDate_of_birth(LocalDate.parse(userPropValuePairRecord.value()));
                    break;
                case "is_publisher":
                    user.setIs_publisher(Boolean.parseBoolean(userPropValuePairRecord.value()));
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
