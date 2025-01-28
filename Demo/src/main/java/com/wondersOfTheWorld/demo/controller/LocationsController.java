package com.wondersOfTheWorld.demo.controller;

import com.wondersOfTheWorld.demo.entities.Locations;
import com.wondersOfTheWorld.demo.services.LocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LocationsController {

    @Autowired
    private LocationsService locationsService;

    @GetMapping("/getAllLocations")
    @ResponseBody
    public List<Locations> getAllLocations() {
        return locationsService.getAllLocations();
    }
}
