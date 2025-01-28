package com.wondersOfTheWorld.demo.repos;

import com.wondersOfTheWorld.demo.entities.Locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationsRepository extends JpaRepository<Locations, Long> {

    List<Locations> findAllByCountry(String country);

    List<Locations> findAllByName(String name);

}
