package com.wondersOfTheWorld.demo.services;

import com.wondersOfTheWorld.demo.entities.Members;
import com.wondersOfTheWorld.demo.repos.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembersService {

    @Autowired
    private MembersRepository membersRepository;

    public List<Members> getAllMembers() {
        return membersRepository.findAll();
    }

    public Optional<Members> getMemberById(Long id) {
        return membersRepository.findById(id);
    }

    public Optional<Members> getMemberByEmail(String email) {
        return Optional.ofNullable(membersRepository.findByEmail(email));
    }

    public Members saveMember(Members member) {
        return membersRepository.save(member);
    }

    public void deleteMember(Long id) {
        membersRepository.deleteById(id);
    }

    public boolean usernameExists(String username) {

        Optional<Members> optionalMember = Optional.ofNullable(membersRepository.findByUsername(username));

        return optionalMember.isPresent();
    }

    public boolean emailExists(String email) {

        Optional<Members> optionalMember = Optional.ofNullable(membersRepository.findByEmail(email));

        return optionalMember.isPresent();
    }
}
