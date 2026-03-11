package com.example.Backend.model;

public class Country {

    private String name;
    private String capital;
    private String region;
    private Long population;
    private String flag;

    public Country() {
    }

    public Country(String name, String capital, String region, Long population, String flag) {
        this.name = name;
        this.capital = capital;
        this.region = region;
        this.population = population;
        this.flag = flag;
    }

    public String getName() {
        return name;
    }

    public String getCapital() {
        return capital;
    }

    public String getRegion() {
        return region;
    }

    public Long getPopulation() {
        return population;
    }

    public String getFlag() {
        return flag;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }
}
