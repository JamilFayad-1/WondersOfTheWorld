package com.wondersOfTheWorld.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Locations")
public class Locations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "upvotes", nullable = false)
    private int upvotes;

    @Column(name = "country", nullable = false)
    private String country;

    public Locations() {

    }

    public Locations(String name, String image, int upvotes, String country) {
        this.name = name;
        this.image = image;
        this.upvotes = upvotes;
        this.country = country;
    }

    // Getters and setters
    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(int upvotes) {
        this.upvotes = upvotes;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "Locations{" +
                "locationId=" + locationId +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", upvotes=" + upvotes +
                ", country=" + country +
                '}';
    }
}
