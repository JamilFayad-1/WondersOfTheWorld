package com.wondersOfTheWorld.demo.repos;

import com.wondersOfTheWorld.demo.entities.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long> {

    public Members findByUsername(String username);

    public Members findByEmail(String email);

}
