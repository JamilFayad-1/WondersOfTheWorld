package com.wondersOfTheWorld.demo.services;

import com.wondersOfTheWorld.demo.entities.Locations;
import com.wondersOfTheWorld.demo.repos.LocationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationsService {

    @Autowired
    private LocationsRepository locationsRepository;

    public List<Locations> getAllLocations() {
        return locationsRepository.findAll();
    }

    public List<Locations> getAllLocationsByCountry(String country) {
        return locationsRepository.findAllByCountry(country);
    }

    public List<Locations> getLocationsByName(String locationName) {
        return locationsRepository.findAllByName(locationName);
    }

    public Locations saveLocation(Locations location) {
        return locationsRepository.save(location);
    }

    public Optional<Locations> getLocationById(long id) {
        return locationsRepository.findById(id);
    }

    public void deleteLocation(Long id) {
        locationsRepository.deleteById(id);
    }
}
