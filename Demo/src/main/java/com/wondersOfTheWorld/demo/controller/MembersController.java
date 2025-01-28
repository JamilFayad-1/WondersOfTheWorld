package com.wondersOfTheWorld.demo.controller;

import com.wondersOfTheWorld.demo.entities.Members;
import com.wondersOfTheWorld.demo.services.MembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
public class MembersController {

    @Autowired
    private MembersService membersService;

    @PostMapping("/createAccount")
    @ResponseBody
    public Map<String, String> createAccount(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            Model model) {

        Map<String, String> response = new HashMap<>();

        if (firstName == null || firstName.isEmpty()) {
            response.put("firstNameError", "First name is required");
        }

        if (lastName == null || lastName.isEmpty()) {
            response.put("lastNameError", "Last name is required");
        }

        if (username == null || username.isEmpty()) {
            response.put("usernameError", "Username is required");
        } else if (membersService.usernameExists(username)) {
            response.put("usernameError", "Username already exists");
        }

        if (email == null || email.isEmpty()) {
            response.put("emailError", "Email is required");
        } else if (membersService.emailExists(email)) {
            response.put("emailError", "Email already exists, try logging in?");
        }

        if (password == null || password.isEmpty()) {
            response.put("passwordError", "Password is required");
        }

        if (response.isEmpty()) {
            Members member = new Members();
            member.setFirstName(firstName);
            member.setLastName(lastName);
            member.setUsername(username);
            member.setEmail(email);
            member.setPassword(password);
            membersService.saveMember(member);
            response.put("status", "success");
            response.put("message", "Account created successfully!");
        } else {
            response.put("status", "error");
            response.put("message", "Error creating account!");
        }

        return response;
    }

    @PostMapping("/login")
    @ResponseBody
    public Map<String, String> login(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            Model model) {

        Map<String, String> response = new HashMap<>();

        if (email == null || email.isEmpty()) {
            response.put("emailError", "Email is required");
        }

        if (password == null || password.isEmpty()) {
            response.put("passwordError", "Password is required");
        }

        Members potentialMember = new Members();

        if (response.isEmpty()) {
            if(membersService.getMemberByEmail(email).isPresent()){
                potentialMember = membersService.getMemberByEmail(email).get();
            }

            if (!potentialMember.getPassword().equals(password)) {
                response.put("status", "error");
                response.put("message", "Invalid password or email..");
            } else {
                response.put("status", "success");
                model.addAttribute("loggedInMember", potentialMember);
            }
        } else {
            response.put("status", "error");
            response.put("message", "Login failed, try again later...");
        }

        return response;
    }

}
